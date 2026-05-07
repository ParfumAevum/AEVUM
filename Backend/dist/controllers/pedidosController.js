"use strict";
// ══════════════════════════════════════════════════════════════
// src/controllers/pedidosController.ts
// Criação e consulta de pedidos. Clientes veem apenas seus
// próprios pedidos; admins veem todos.
// ══════════════════════════════════════════════════════════════
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.criarPedido = criarPedido;
exports.listarPedidos = listarPedidos;
exports.obterPedido = obterPedido;
exports.atualizarStatus = atualizarStatus;
const prisma_1 = __importDefault(require("../lib/prisma"));
// ─── POST /api/pedidos ──────────────────────────────────────
// Cria um novo pedido com os itens do carrinho.
// Valida estoque de cada item antes de confirmar.
async function criarPedido(req, res) {
    try {
        const usuarioId = req.usuario.id;
        // itens: [{ produtoId, quantidade }]
        const { itens, enderecoEntrega } = req.body;
        if (!itens || !Array.isArray(itens) || itens.length === 0) {
            return res.status(400).json({ erro: "O pedido deve ter pelo menos um item." });
        }
        // Busca produtos e valida estoque
        let total = 0;
        const itensValidados = [];
        for (const item of itens) {
            const produto = await prisma_1.default.produto.findUnique({
                where: { id: Number(item.produtoId) },
            });
            if (!produto) {
                return res.status(404).json({ erro: `Produto ${item.produtoId} não encontrado.` });
            }
            if (produto.estoque < item.quantidade) {
                return res.status(409).json({
                    erro: `Estoque insuficiente para "${produto.nome}". Disponível: ${produto.estoque}.`,
                });
            }
            total += produto.preco * item.quantidade;
            itensValidados.push({
                produtoId: produto.id,
                quantidade: item.quantidade,
                precoUnit: produto.preco,
            });
        }
        // Cria o pedido e os itens em transação
        const pedido = await prisma_1.default.$transaction(async (tx) => {
            // Cria o pedido
            const novoPedido = await tx.pedido.create({
                data: {
                    usuarioId,
                    total,
                    enderecoEntrega,
                    itens: {
                        create: itensValidados,
                    },
                },
                include: { itens: { include: { produto: true } }, usuario: true },
            });
            // Decrementa o estoque de cada produto
            for (const item of itensValidados) {
                await tx.produto.update({
                    where: { id: item.produtoId },
                    data: { estoque: { decrement: item.quantidade } },
                });
            }
            return novoPedido;
        });
        return res.status(201).json(pedido);
    }
    catch (err) {
        console.error("[criarPedido]", err);
        return res.status(500).json({ erro: "Erro ao criar pedido." });
    }
}
// ─── GET /api/pedidos ───────────────────────────────────────
// Clientes obtêm apenas seus pedidos.
// Admins obtêm todos os pedidos do sistema.
async function listarPedidos(req, res) {
    try {
        const { id: usuarioId, role } = req.usuario;
        const where = role === "ADMIN" ? {} : { usuarioId };
        const pedidos = await prisma_1.default.pedido.findMany({
            where,
            include: {
                itens: { include: { produto: true } },
                usuario: { select: { id: true, nome: true, email: true } },
            },
            orderBy: { criadoEm: "desc" },
        });
        return res.json(pedidos);
    }
    catch (err) {
        console.error("[listarPedidos]", err);
        return res.status(500).json({ erro: "Erro ao listar pedidos." });
    }
}
// ─── GET /api/pedidos/:id ───────────────────────────────────
// Retorna um pedido pelo ID. Clientes só podem ver os próprios.
async function obterPedido(req, res) {
    try {
        const { id } = req.params;
        const { id: usuarioId, role } = req.usuario;
        const pedido = await prisma_1.default.pedido.findUnique({
            where: { id: Number(id) },
            include: {
                itens: { include: { produto: true } },
                usuario: { select: { id: true, nome: true, email: true } },
            },
        });
        if (!pedido) {
            return res.status(404).json({ erro: "Pedido não encontrado." });
        }
        // Impede clientes de verem pedidos de outros
        if (role !== "ADMIN" && pedido.usuarioId !== usuarioId) {
            return res.status(403).json({ erro: "Acesso negado." });
        }
        return res.json(pedido);
    }
    catch (err) {
        console.error("[obterPedido]", err);
        return res.status(500).json({ erro: "Erro ao obter pedido." });
    }
}
// ─── PATCH /api/pedidos/:id/status ─────────────────────────
// Atualiza o status de um pedido (apenas ADMIN).
async function atualizarStatus(req, res) {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const pedido = await prisma_1.default.pedido.update({
            where: { id: Number(id) },
            data: { status },
        });
        return res.json(pedido);
    }
    catch (err) {
        console.error("[atualizarStatus]", err);
        if (err.code === "P2025") {
            return res.status(404).json({ erro: "Pedido não encontrado." });
        }
        return res.status(500).json({ erro: "Erro ao atualizar status." });
    }
}
