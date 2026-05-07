// ══════════════════════════════════════════════════════════════
// src/controllers/produtosController.ts
// CRUD completo de produtos. Listagem pública, criação/edição/
// exclusão restritas a administradores.
// ══════════════════════════════════════════════════════════════

import { Request, Response } from "express";
import prisma from "../lib/prisma";

// ─── GET /api/produtos ───────────────────────────────────────
// Lista todos os produtos. Suporta filtro por categoria e busca por nome.
export async function listarProdutos(req: Request, res: Response) {
  try {
    const { categoria, busca } = req.query;

    // Monta filtros dinâmicos baseados nos query params
    const where: any = {};

    if (categoria && categoria !== "Todos") {
      where.categoria = { nome: String(categoria) };
    }

    if (busca) {
      where.nome = { contains: String(busca), mode: "insensitive" };
    }

    const produtos = await prisma.produto.findMany({
      where,
      include: { categoria: true },
      orderBy: { criadoEm: "desc" },
    });

    return res.json(produtos);
  } catch (err) {
    console.error("[listarProdutos]", err);
    return res.status(500).json({ erro: "Erro ao listar produtos." });
  }
}

// ─── GET /api/produtos/:id ───────────────────────────────────
// Retorna um produto específico pelo ID.
export async function obterProduto(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const produto = await prisma.produto.findUnique({
      where: { id: Number(id) },
      include: { categoria: true },
    });

    if (!produto) {
      return res.status(404).json({ erro: "Produto não encontrado." });
    }

    return res.json(produto);
  } catch (err) {
    console.error("[obterProduto]", err);
    return res.status(500).json({ erro: "Erro ao obter produto." });
  }
}

// ─── POST /api/produtos ─────────────────────────────────────
// Cria um novo produto (apenas ADMIN).
export async function criarProduto(req: Request, res: Response) {
  try {
    const { nome, sku, descricao, notas, preco, estoque, imagem, categoriaId } = req.body;

    if (!nome || !sku || !preco) {
      return res.status(400).json({ erro: "Nome, SKU e preço são obrigatórios." });
    }

    const produto = await prisma.produto.create({
      data: {
        nome,
        sku,
        descricao,
        notas,
        preco: Number(preco),
        estoque: Number(estoque) || 0,
        imagem,
        categoriaId: categoriaId ? Number(categoriaId) : undefined,
      },
      include: { categoria: true },
    });

    return res.status(201).json(produto);
  } catch (err: any) {
    console.error("[criarProduto]", err);
    if (err.code === "P2002") {
      return res.status(409).json({ erro: "SKU já cadastrado." });
    }
    return res.status(500).json({ erro: "Erro ao criar produto." });
  }
}

// ─── PUT /api/produtos/:id ───────────────────────────────────
// Atualiza um produto existente (apenas ADMIN).
export async function atualizarProduto(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { nome, sku, descricao, notas, preco, estoque, imagem, categoriaId } = req.body;

    const produto = await prisma.produto.update({
      where: { id: Number(id) },
      data: {
        nome,
        sku,
        descricao,
        notas,
        preco: preco !== undefined ? Number(preco) : undefined,
        estoque: estoque !== undefined ? Number(estoque) : undefined,
        imagem,
        categoriaId: categoriaId ? Number(categoriaId) : undefined,
      },
      include: { categoria: true },
    });

    return res.json(produto);
  } catch (err: any) {
    console.error("[atualizarProduto]", err);
    if (err.code === "P2025") {
      return res.status(404).json({ erro: "Produto não encontrado." });
    }
    return res.status(500).json({ erro: "Erro ao atualizar produto." });
  }
}

// ─── DELETE /api/produtos/:id ────────────────────────────────
// Remove um produto (apenas ADMIN).
export async function deletarProduto(req: Request, res: Response) {
  try {
    const { id } = req.params;

    await prisma.produto.delete({ where: { id: Number(id) } });

    return res.json({ mensagem: "Produto removido com sucesso." });
  } catch (err: any) {
    console.error("[deletarProduto]", err);
    if (err.code === "P2025") {
      return res.status(404).json({ erro: "Produto não encontrado." });
    }
    return res.status(500).json({ erro: "Erro ao deletar produto." });
  }
}

// ─── GET /api/categorias ────────────────────────────────────
// Lista todas as categorias disponíveis.
export async function listarCategorias(req: Request, res: Response) {
  try {
    const categorias = await prisma.categoria.findMany({ orderBy: { nome: "asc" } });
    return res.json(categorias);
  } catch (err) {
    console.error("[listarCategorias]", err);
    return res.status(500).json({ erro: "Erro ao listar categorias." });
  }
}