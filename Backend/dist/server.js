"use strict";
// ══════════════════════════════════════════════════════════════
// src/index.ts
// Ponto de entrada do servidor Express.
// Configura CORS, parsers e monta as rotas da API.
// ══════════════════════════════════════════════════════════════
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const roules_1 = __importDefault(require("./routes/roules"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3333;
// ─── Middlewares Globais ─────────────────────────────────────
// CORS: permite requisições do frontend (configurar FRONTEND_URL no .env)
const frontendOrigins = process.env.FRONTEND_URL
    ? process.env.FRONTEND_URL.split(",")
    : [
        "http://localhost:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:5174",
    ];
app.use((0, cors_1.default)({
    origin: frontendOrigins,
    credentials: true,
}));
// Parser de JSON para o body das requisições
app.use(express_1.default.json());
// ─── Rota de Saúde ──────────────────────────────────────────
// Usada para verificar se o servidor está online.
app.get("/health", (_req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
});
// ─── Rotas da API ────────────────────────────────────────────
// Todas as rotas são prefixadas com /api
app.use("/api", roules_1.default);
// ─── Inicializa o Servidor ───────────────────────────────────
app.listen(PORT, () => {
    console.log(`\n🚀 AEVUM Backend rodando em http://localhost:${PORT}`);
    console.log(`📦 Banco de dados: NeonPostgreSQL via Prisma`);
    console.log(`🔑 JWT configurado: ${process.env.JWT_SECRET ? "✅" : "⚠️  JWT_SECRET não definido"}\n`);
});
exports.default = app;
