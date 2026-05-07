// ══════════════════════════════════════════════════════════════
// src/context/AuthContext.tsx
// Contexto global de autenticação.
// Armazena o usuário logado, token JWT e funções de login/logout.
// Persiste o token no localStorage para manter a sessão.
// ══════════════════════════════════════════════════════════════

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { api } from "../services/api";

// ─── Tipos ──────────────────────────────────────────────────
export interface Usuario {
  id: number;
  nome: string;
  email: string;
  telefone?: string;
  cpf?: string;
  role: "CLIENTE" | "ADMIN";
}

interface AuthContextData {
  usuario: Usuario | null;         // Dados do usuário logado (null se não autenticado)
  token: string | null;            // Token JWT
  logado: boolean;                 // Atalho para verificar se está autenticado
  isAdmin: boolean;                // True se o usuário for administrador
  login: (email: string, senha: string) => Promise<void>;
  logout: () => void;
  atualizarUsuario: (dados: Partial<Usuario>) => void;
}

// ─── Criação do Contexto ────────────────────────────────────
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

// ─── Provider de Autenticação ────────────────────────────────
export function AuthProvider({ children }: { children: ReactNode }) {
  // Inicializa o estado com dados do localStorage (para persistir sessão)
  const [usuario, setUsuario] = useState<Usuario | null>(() => {
    const salvo = localStorage.getItem("@aevum:usuario");
    return salvo ? JSON.parse(salvo) : null;
  });

  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem("@aevum:token");
  });

  // Sincroniza o header de autorização da API toda vez que o token muda
  useEffect(() => {
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete api.defaults.headers.common["Authorization"];
    }
  }, [token]);

  // ─── Função de Login ──────────────────────────────────────
  // Chama a API, salva token e usuário no estado e localStorage.
  async function login(email: string, senha: string) {
    const response = await api.post("/auth/login", { email, senha });
    const { usuario: u, token: t } = response.data;

    // Persiste no localStorage
    localStorage.setItem("@aevum:token", t);
    localStorage.setItem("@aevum:usuario", JSON.stringify(u));

    // Atualiza o estado
    setToken(t);
    setUsuario(u);
  }

  // ─── Função de Logout ────────────────────────────────────
  // Remove dados do localStorage e reseta o estado.
  function logout() {
    localStorage.removeItem("@aevum:token");
    localStorage.removeItem("@aevum:usuario");
    setToken(null);
    setUsuario(null);
  }

  // ─── Atualizar Dados do Usuário ──────────────────────────
  // Usado após edição do perfil para sincronizar o contexto.
  function atualizarUsuario(dados: Partial<Usuario>) {
    setUsuario((prev) => {
      if (!prev) return prev;
      const atualizado = { ...prev, ...dados };
      localStorage.setItem("@aevum:usuario", JSON.stringify(atualizado));
      return atualizado;
    });
  }

  return (
    <AuthContext.Provider
      value={{
        usuario,
        token,
        logado: !!token && !!usuario,
        isAdmin: usuario?.role === "ADMIN",
        login,
        logout,
        atualizarUsuario,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// ─── Hook de Autenticação ────────────────────────────────────
// Use este hook em qualquer componente para acessar o contexto.
export function useAuth() {
  return useContext(AuthContext);
}