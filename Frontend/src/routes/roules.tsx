// ══════════════════════════════════════════════════════════════
// src/routes/roules.tsx
// Roteamento principal da aplicação AEVUM.
// - A rota "/" agora aponta para a HomePage (não mais o Login)
// - Rotas /admin/* são protegidas: apenas usuários com role ADMIN
//   têm acesso. Demais usuários são redirecionados para home.
// ══════════════════════════════════════════════════════════════

import { type ReactNode } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// ─── Páginas ─────────────────────────────────────────────────
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import CadastroPage from "../pages/CadastroPage";
import EditarPerfilPage from "../pages/EditarPerfilPage";
import FinalizarCompraPage from "../pages/FinalizarCompraPage";
import HistoricoPedidosPage from "../pages/HistoricoPedidosPage";
import AdminRelatoriosPage from "../pages/AdminRelatoriosPage";
import AdiminProdutosPage from "../pages/AdiminProdutosPage";
import AdminPedidosPage from "../pages/AdminPedidosPage";
import AdminClientesPage from "../pages/AdminClientesPage";
import CatalogoPage from "../pages/catalogoPage";

// ─── Guard: Rota protegida para autenticados ──────────────────
// Redireciona para /login se o usuário não estiver logado.
function RotaPrivada({ children }: { children: ReactNode }) {
  const { logado } = useAuth();
  return logado ? <>{children}</> : <Navigate to="/login" replace />;
}

// ─── Guard: Rota exclusiva para administradores ───────────────
// Redireciona para /home se o usuário não for ADMIN.
function RotaAdmin({ children }: { children: ReactNode }) {
  const { logado, isAdmin } = useAuth();
  if (!logado) return <Navigate to="/login" replace />;
  if (!isAdmin) return <Navigate to="/home" replace />;
  return <>{children}</>;
}

// ─── Componente de Rotas ─────────────────────────────────────
export default function Roules() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Página inicial: a loja começa na home, não no login */}
        <Route path="/" element={<Navigate to="/home" replace />} />

        {/* Autenticação */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cadastro" element={<CadastroPage />} />

        {/* Páginas públicas da loja */}
        <Route path="/home" element={<HomePage />} />
        <Route path="/catalogo" element={<CatalogoPage />} />

        {/* Páginas que exigem autenticação */}
        <Route
          path="/perfil"
          element={
            <RotaPrivada>
              <EditarPerfilPage />
            </RotaPrivada>
          }
        />
        <Route
          path="/finalizar-compra"
          element={
            <RotaPrivada>
              <FinalizarCompraPage />
            </RotaPrivada>
          }
        />
        <Route
          path="/pedidos"
          element={
            <RotaPrivada>
              <HistoricoPedidosPage />
            </RotaPrivada>
          }
        />

        {/* Painel administrativo (apenas ADMIN) */}
        <Route
          path="/admin"
          element={<Navigate to="/admin/relatorios" replace />}
        />
        <Route
          path="/admin/relatorios"
          element={
            <RotaAdmin>
              <AdminRelatoriosPage />
            </RotaAdmin>
          }
        />
        <Route
          path="/admin/produtos"
          element={
            <RotaAdmin>
              <AdiminProdutosPage />
            </RotaAdmin>
          }
        />
        <Route
          path="/admin/pedidos"
          element={
            <RotaAdmin>
              <AdminPedidosPage />
            </RotaAdmin>
          }
        />
        <Route
          path="/admin/clientes"
          element={
            <RotaAdmin>
              <AdminClientesPage />
            </RotaAdmin>
          }
        />

        {/* Rota curinga: redireciona para home */}
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </BrowserRouter>
  );
}