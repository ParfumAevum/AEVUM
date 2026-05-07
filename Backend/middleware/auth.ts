// ══════════════════════════════════════════════════════════════
// src/middleware/auth.ts
// Middleware de autenticação JWT.
// Verifica o token Bearer no header Authorization e injeta
// os dados do usuário (id, email, role) no objeto req.
// ══════════════════════════════════════════════════════════════

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Extensão do tipo Request do Express para incluir dados do usuário
export interface AuthRequest extends Request {
  usuario?: {
    id: number;
    email: string;
    role: string;
  };
}

// ─── Middleware: autenticar ──────────────────────────────────
// Rejeita requests sem token válido com 401.
export function autenticar(req: AuthRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  // Verifica se o header Authorization existe e tem formato "Bearer <token>"
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ erro: "Token não fornecido." });
  }

  const token = authHeader.split(" ")[1];

  try {
    // Valida o token com a chave secreta
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: number;
      email: string;
      role: string;
    };

    // Injeta os dados do usuário no objeto da requisição
    req.usuario = payload;
    next();
  } catch {
    return res.status(401).json({ erro: "Token inválido ou expirado." });
  }
}

// ─── Middleware: apenasAdmin ─────────────────────────────────
// Bloqueia acesso de usuários que não sejam ADMIN.
export function apenasAdmin(req: AuthRequest, res: Response, next: NextFunction) {
  if (req.usuario?.role !== "ADMIN") {
    return res.status(403).json({ erro: "Acesso restrito a administradores." });
  }
  next();
}