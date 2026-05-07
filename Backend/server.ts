// ══════════════════════════════════════════════════════════════
// src/index.ts
// Ponto de entrada do servidor Express.
// Configura CORS, parsers e monta as rotas da API.
// ══════════════════════════════════════════════════════════════

import "dotenv/config";
import express from "express";
import cors from "cors";
import routes from "./routes/roules";

const app = express();
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

app.use(
  cors({
    origin: frontendOrigins,
    credentials: true,
  })
);

// Parser de JSON para o body das requisições
app.use(express.json());

// ─── Rota de Saúde ──────────────────────────────────────────
// Usada para verificar se o servidor está online.
app.get("/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// ─── Rotas da API ────────────────────────────────────────────
// Todas as rotas são prefixadas com /api
app.use("/api", routes);

// ─── Inicializa o Servidor ───────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🚀 AEVUM Backend rodando em http://localhost:${PORT}`);
  console.log(`📦 Banco de dados: NeonPostgreSQL via Prisma`);
  console.log(`🔑 JWT configurado: ${process.env.JWT_SECRET ? "✅" : "⚠️  JWT_SECRET não definido"}\n`);
});

export default app;