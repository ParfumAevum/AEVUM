// ══════════════════════════════════════════════════════════════
// src/controllers/pedidosController.ts
// Criação e consulta de pedidos. Clientes veem apenas seus
// próprios pedidos; admins veem todos.
// ══════════════════════════════════════════════════════════════

import { Response } from "express";
import prisma from "../lib/prisma";
import { AuthRequest } from "../middleware/auth";

// ─── POST /api/pedidos ──────────────────────────────────────
// Cria um novo pedido com os itens do carrinho.
// Valida estoque de cada item antes de confirmar.
export async function criarPedido(req: AuthRequest, res: Response) {
  try {
    const usuarioId = req.usuario!.id;

    // itens: [{ produtoId, quantidade }]
    const { itens, enderecoEntrega } = req.body;

    if (!itens || !Array.isArray(itens) || itens.length === 0) {
      return res.status(400).json({ erro: "O pedido deve ter pelo menos um item." });
    }

    // Busca produtos e valida estoque
    let total = 0;
    const itensValidados: { produtoId: number; quantidade: number; precoUnit: number }[] = [];

    for (const item of itens) {
      const produto = await prisma.produto.findUnique({
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
    const pedido = await prisma.$transaction(async (tx: any) => {
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
  } catch (err) {
    console.error("[criarPedido]", err);
    return res.status(500).json({ erro: "Erro ao criar pedido." });
  }
}

// ─── GET /api/pedidos ───────────────────────────────────────
// Clientes obtêm apenas seus pedidos.
// Admins obtêm todos os pedidos do sistema.
export async function listarPedidos(req: AuthRequest, res: Response) {
  try {
    const { id: usuarioId, role } = req.usuario!;

    const where = role === "ADMIN" ? {} : { usuarioId };

    const pedidos = await prisma.pedido.findMany({
      where,
      include: {
        itens: { include: { produto: true } },
        usuario: { select: { id: true, nome: true, email: true } },
      },
      orderBy: { criadoEm: "desc" },
    });

    return res.json(pedidos);
  } catch (err) {
    console.error("[listarPedidos]", err);
    return res.status(500).json({ erro: "Erro ao listar pedidos." });
  }
}

// ─── GET /api/pedidos/:id ───────────────────────────────────
// Retorna um pedido pelo ID. Clientes só podem ver os próprios.
export async function obterPedido(req: AuthRequest, res: Response) {
  try {
    const { id } = req.params;
    const { id: usuarioId, role } = req.usuario!;

    const pedido = await prisma.pedido.findUnique({
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
  } catch (err) {
    console.error("[obterPedido]", err);
    return res.status(500).json({ erro: "Erro ao obter pedido." });
  }
}

// ─── PATCH /api/pedidos/:id/status ─────────────────────────
// Atualiza o status de um pedido (apenas ADMIN).
export async function atualizarStatus(req: AuthRequest, res: Response) {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const pedido = await prisma.pedido.update({
      where: { id: Number(id) },
      data: { status },
    });

    return res.json(pedido);
  } catch (err: any) {
    console.error("[atualizarStatus]", err);
    if (err.code === "P2025") {
      return res.status(404).json({ erro: "Pedido não encontrado." });
    }
    return res.status(500).json({ erro: "Erro ao atualizar status." });
  }
}