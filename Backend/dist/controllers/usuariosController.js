"use strict";
// ══════════════════════════════════════════════════════════════
// src/controllers/usuariosController.ts
// Gerenciamento de usuários: perfil, listagem (admin) e
// atualização de dados pessoais.
// ══════════════════════════════════════════════════════════════
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listarUsuarios = listarUsuarios;
exports.obterPerfil = obterPerfil;
exports.atualizarPerfil = atualizarPerfil;
exports.atualizarUsuario = atualizarUsuario;
exports.deletarUsuario = deletarUsuario;
exports.relatorios = relatorios;
const prisma_1 = __importDefault(require("../lib/prisma"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
// ─── GET /api/usuarios ──────────────────────────────────────
// Lista todos os usuários (apenas ADMIN).
async function listarUsuarios(req, res) {
    try {
        const usuarios = await prisma_1.default.usuario.findMany({
            select: {
                id: true,
                nome: true,
                email: true,
                telefone: true,
                cpf: true,
                role: true,
                criadoEm: true,
                _count: { select: { pedidos: true } },
            },
            orderBy: { criadoEm: "desc" },
        });
        return res.json(usuarios);
    }
    catch (err) {
        console.error("[listarUsuarios]", err);
        return res.status(500).json({ erro: "Erro ao listar usuários." });
    }
}
// ─── GET /api/usuarios/perfil ───────────────────────────────
// Retorna os dados do perfil do usuário autenticado.
async function obterPerfil(req, res) {
    try {
        const usuario = await prisma_1.default.usuario.findUnique({
            where: { id: req.usuario.id },
            select: {
                id: true,
                nome: true,
                email: true,
                telefone: true,
                cpf: true,
                role: true,
                criadoEm: true,
                enderecos: true,
            },
        });
        if (!usuario) {
            return res.status(404).json({ erro: "Usuário não encontrado." });
        }
        return res.json(usuario);
    }
    catch (err) {
        console.error("[obterPerfil]", err);
        return res.status(500).json({ erro: "Erro ao obter perfil." });
    }
}
// ─── PUT /api/usuarios/perfil ───────────────────────────────
// Atualiza os dados pessoais do usuário autenticado.
// Se uma nova senha for fornecida, aplica hash bcrypt.
async function atualizarPerfil(req, res) {
    try {
        const { nome, telefone, senhaAtual, novaSenha } = req.body;
        // Se for alterar a senha, valida a senha atual
        if (novaSenha) {
            if (!senhaAtual) {
                return res.status(400).json({ erro: "Informe a senha atual para alterá-la." });
            }
            const usuario = await prisma_1.default.usuario.findUnique({
                where: { id: req.usuario.id },
            });
            const senhaCorreta = await bcryptjs_1.default.compare(senhaAtual, usuario.senha);
            if (!senhaCorreta) {
                return res.status(401).json({ erro: "Senha atual incorreta." });
            }
        }
        const data = { nome, telefone };
        if (novaSenha) {
            data.senha = await bcryptjs_1.default.hash(novaSenha, 10);
        }
        const usuario = await prisma_1.default.usuario.update({
            where: { id: req.usuario.id },
            data,
            select: {
                id: true,
                nome: true,
                email: true,
                telefone: true,
                cpf: true,
                role: true,
            },
        });
        return res.json(usuario);
    }
    catch (err) {
        console.error("[atualizarPerfil]", err);
        return res.status(500).json({ erro: "Erro ao atualizar perfil." });
    }
}
// ─── PUT /api/usuarios/:id ────────────────────────────────
// Atualiza dados de um usuário específico (apenas ADMIN).
async function atualizarUsuario(req, res) {
    try {
        const { id } = req.params;
        const { nome, email, telefone, cpf, role } = req.body;
        const usuario = await prisma_1.default.usuario.update({
            where: { id: Number(id) },
            data: { nome, email, telefone, cpf, role },
            select: {
                id: true,
                nome: true,
                email: true,
                telefone: true,
                cpf: true,
                role: true,
                criadoEm: true,
                _count: { select: { pedidos: true } },
            },
        });
        return res.json(usuario);
    }
    catch (err) {
        console.error("[atualizarUsuario]", err);
        if (err.code === "P2025") {
            return res.status(404).json({ erro: "Usuário não encontrado." });
        }
        return res.status(500).json({ erro: "Erro ao atualizar usuário." });
    }
}
// ─── DELETE /api/usuarios/:id ───────────────────────────────
// Remove um usuário (apenas ADMIN).
async function deletarUsuario(req, res) {
    try {
        const { id } = req.params;
        await prisma_1.default.usuario.delete({ where: { id: Number(id) } });
        return res.json({ mensagem: "Usuário removido com sucesso." });
    }
    catch (err) {
        console.error("[deletarUsuario]", err);
        if (err.code === "P2025") {
            return res.status(404).json({ erro: "Usuário não encontrado." });
        }
        return res.status(500).json({ erro: "Erro ao deletar usuário." });
    }
}
// ─── GET /api/admin/relatorios ──────────────────────────────
// Retorna dados consolidados para o painel de relatórios (apenas ADMIN).
async function relatorios(req, res) {
    try {
        // Totais gerais
        const totalPedidos = await prisma_1.default.pedido.count();
        const totalClientes = await prisma_1.default.usuario.count({ where: { role: "CLIENTE" } });
        // Soma de receita (apenas pedidos não cancelados)
        const receitaData = await prisma_1.default.pedido.aggregate({
            _sum: { total: true },
            where: { status: { not: "CANCELADO" } },
        });
        const receitaTotal = receitaData._sum?.total ?? 0;
        // Ticket médio
        const ticketMedio = totalPedidos > 0 ? receitaTotal / totalPedidos : 0;
        // Pedidos em aberto
        const pedidosEmAberto = await prisma_1.default.pedido.count({
            where: { status: { in: ["PENDENTE", "PROCESSANDO"] } },
        });
        // Últimas 5 transações
        const transacoes = await prisma_1.default.pedido.findMany({
            take: 5,
            orderBy: { criadoEm: "desc" },
            include: {
                usuario: { select: { nome: true } },
                itens: { include: { produto: { select: { nome: true } } }, take: 1 },
            },
        });
        // Produto mais vendido
        const topProduto = await prisma_1.default.itemPedido.groupBy({
            by: ["produtoId"],
            _sum: { quantidade: true },
            orderBy: { _sum: { quantidade: "desc" } },
            take: 1,
        });
        let produtoDestaque = null;
        if (topProduto.length > 0) {
            produtoDestaque = await prisma_1.default.produto.findUnique({
                where: { id: topProduto[0].produtoId },
                include: { _count: { select: { itens: true } } },
            });
        }
        return res.json({
            receitaTotal,
            totalPedidos,
            totalClientes,
            ticketMedio: Math.round(ticketMedio),
            pedidosEmAberto,
            transacoes,
            produtoDestaque,
        });
    }
    catch (err) {
        console.error("[relatorios]", err);
        return res.status(500).json({ erro: "Erro ao gerar relatório." });
    }
}
