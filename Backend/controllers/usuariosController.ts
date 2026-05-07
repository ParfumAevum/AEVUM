// ══════════════════════════════════════════════════════════════
// src/controllers/usuariosController.ts
// Gerenciamento de usuários: perfil, listagem (admin) e
// atualização de dados pessoais.
// ══════════════════════════════════════════════════════════════

import { Response } from "express";
import prisma from "../lib/prisma";
import { AuthRequest } from "../middleware/auth";
import bcrypt from "bcryptjs";

// ─── GET /api/usuarios ──────────────────────────────────────
// Lista todos os usuários (apenas ADMIN).
export async function listarUsuarios(req: AuthRequest, res: Response) {
  try {
    const usuarios = await prisma.usuario.findMany({
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
  } catch (err) {
    console.error("[listarUsuarios]", err);
    return res.status(500).json({ erro: "Erro ao listar usuários." });
  }
}

// ─── GET /api/usuarios/perfil ───────────────────────────────
// Retorna os dados do perfil do usuário autenticado.
export async function obterPerfil(req: AuthRequest, res: Response) {
  try {
    const usuario = await prisma.usuario.findUnique({
      where: { id: req.usuario!.id },
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
  } catch (err) {
    console.error("[obterPerfil]", err);
    return res.status(500).json({ erro: "Erro ao obter perfil." });
  }
}

// ─── PUT /api/usuarios/perfil ───────────────────────────────
// Atualiza os dados pessoais do usuário autenticado.
// Se uma nova senha for fornecida, aplica hash bcrypt.
export async function atualizarPerfil(req: AuthRequest, res: Response) {
  try {
    const { nome, telefone, senhaAtual, novaSenha } = req.body;

    // Se for alterar a senha, valida a senha atual
    if (novaSenha) {
      if (!senhaAtual) {
        return res.status(400).json({ erro: "Informe a senha atual para alterá-la." });
      }

      const usuario = await prisma.usuario.findUnique({
        where: { id: req.usuario!.id },
      });

      const senhaCorreta = await bcrypt.compare(senhaAtual, usuario!.senha);
      if (!senhaCorreta) {
        return res.status(401).json({ erro: "Senha atual incorreta." });
      }
    }

    const data: any = { nome, telefone };

    if (novaSenha) {
      data.senha = await bcrypt.hash(novaSenha, 10);
    }

    const usuario = await prisma.usuario.update({
      where: { id: req.usuario!.id },
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
  } catch (err) {
    console.error("[atualizarPerfil]", err);
    return res.status(500).json({ erro: "Erro ao atualizar perfil." });
  }
}

// ─── PUT /api/usuarios/:id ────────────────────────────────
// Atualiza dados de um usuário específico (apenas ADMIN).
export async function atualizarUsuario(req: AuthRequest, res: Response) {
  try {
    const { id } = req.params;
    const { nome, email, telefone, cpf, role } = req.body;

    const usuario = await prisma.usuario.update({
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
  } catch (err: any) {
    console.error("[atualizarUsuario]", err);
    if (err.code === "P2025") {
      return res.status(404).json({ erro: "Usuário não encontrado." });
    }
    return res.status(500).json({ erro: "Erro ao atualizar usuário." });
  }
}

// ─── DELETE /api/usuarios/:id ───────────────────────────────
// Remove um usuário (apenas ADMIN).
export async function deletarUsuario(req: AuthRequest, res: Response) {
  try {
    const { id } = req.params;

    await prisma.usuario.delete({ where: { id: Number(id) } });

    return res.json({ mensagem: "Usuário removido com sucesso." });
  } catch (err: any) {
    console.error("[deletarUsuario]", err);
    if (err.code === "P2025") {
      return res.status(404).json({ erro: "Usuário não encontrado." });
    }
    return res.status(500).json({ erro: "Erro ao deletar usuário." });
  }
}

// ─── GET /api/admin/relatorios ──────────────────────────────
// Retorna dados consolidados para o painel de relatórios (apenas ADMIN).
export async function relatorios(req: AuthRequest, res: Response) {
  try {
    // Totais gerais
    const totalPedidos = await prisma.pedido.count();
    const totalClientes = await prisma.usuario.count({ where: { role: "CLIENTE" } });

    // Soma de receita (apenas pedidos não cancelados)
    const receitaData = await prisma.pedido.aggregate({
      _sum: { total: true },
      where: { status: { not: "CANCELADO" } },
    });

    const receitaTotal = receitaData._sum?.total ?? 0;

    // Ticket médio
    const ticketMedio = totalPedidos > 0 ? receitaTotal / totalPedidos : 0;

    // Pedidos em aberto
    const pedidosEmAberto = await prisma.pedido.count({
      where: { status: { in: ["PENDENTE", "PROCESSANDO"] } },
    });

    // Últimas 5 transações
    const transacoes = await prisma.pedido.findMany({
      take: 5,
      orderBy: { criadoEm: "desc" },
      include: {
        usuario: { select: { nome: true } },
        itens: { include: { produto: { select: { nome: true } } }, take: 1 },
      },
    });

    // Produto mais vendido
    const topProduto = await prisma.itemPedido.groupBy({
      by: ["produtoId"],
      _sum: { quantidade: true },
      orderBy: { _sum: { quantidade: "desc" } },
      take: 1,
    });

    let produtoDestaque = null;
    if (topProduto.length > 0) {
      produtoDestaque = await prisma.produto.findUnique({
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
  } catch (err) {
    console.error("[relatorios]", err);
    return res.status(500).json({ erro: "Erro ao gerar relatório." });
  }
}