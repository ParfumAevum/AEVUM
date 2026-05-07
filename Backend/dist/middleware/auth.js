"use strict";
// ══════════════════════════════════════════════════════════════
// src/middleware/auth.ts
// Middleware de autenticação JWT.
// Verifica o token Bearer no header Authorization e injeta
// os dados do usuário (id, email, role) no objeto req.
// ══════════════════════════════════════════════════════════════
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.autenticar = autenticar;
exports.apenasAdmin = apenasAdmin;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// ─── Middleware: autenticar ──────────────────────────────────
// Rejeita requests sem token válido com 401.
function autenticar(req, res, next) {
    const authHeader = req.headers.authorization;
    // Verifica se o header Authorization existe e tem formato "Bearer <token>"
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ erro: "Token não fornecido." });
    }
    const token = authHeader.split(" ")[1];
    try {
        // Valida o token com a chave secreta
        const payload = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        // Injeta os dados do usuário no objeto da requisição
        req.usuario = payload;
        next();
    }
    catch {
        return res.status(401).json({ erro: "Token inválido ou expirado." });
    }
}
// ─── Middleware: apenasAdmin ─────────────────────────────────
// Bloqueia acesso de usuários que não sejam ADMIN.
function apenasAdmin(req, res, next) {
    if (req.usuario?.role !== "ADMIN") {
        return res.status(403).json({ erro: "Acesso restrito a administradores." });
    }
    next();
}
