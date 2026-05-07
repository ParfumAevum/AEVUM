// ══════════════════════════════════════════════════════════════
// src/lib/prisma.ts
// Instância singleton do PrismaClient para toda a aplicação.
// Evita múltiplas conexões desnecessárias ao banco de dados.
// ══════════════════════════════════════════════════════════════

import { PrismaClient } from "@prisma/client";

// Exporta uma única instância global do Prisma
const prisma = new PrismaClient({
  log: ["error", "warn"], // Loga erros e avisos no console
});

export default prisma;