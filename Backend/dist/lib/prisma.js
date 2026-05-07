"use strict";
// ══════════════════════════════════════════════════════════════
// src/lib/prisma.ts
// Instância singleton do PrismaClient para toda a aplicação.
// Evita múltiplas conexões desnecessárias ao banco de dados.
// ══════════════════════════════════════════════════════════════
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
// Exporta uma única instância global do Prisma
const prisma = new client_1.PrismaClient({
    log: ["error", "warn"], // Loga erros e avisos no console
});
exports.default = prisma;
