// ══════════════════════════════════════════════════════════════
// src/controllers/authController.ts
// Controlador de autenticação: registro e login de usuários.
// Gera tokens JWT com dados do usuário e seu papel (role).
// ══════════════════════════════════════════════════════════════

import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma";

// ─── POST /api/auth/cadastro ─────────────────────────────────
// Cria um novo usuário. Valida campos obrigatórios, verifica
// duplicidade de email/CPF e armazena senha com hash bcrypt.
export async function cadastrar(req: Request, res: Response) {
  try {
    const { nome, email, senha, telefone, cpf } = req.body;

    // Validação dos campos obrigatórios
    if (!nome || !email || !senha) {
      return res.status(400).json({ erro: "Nome, e-mail e senha são obrigatórios." });
    }

    // Verifica se e-mail já está cadastrado
    const emailExistente = await prisma.usuario.findUnique({ where: { email } });
    if (emailExistente) {
      return res.status(409).json({ erro: "E-mail já cadastrado." });
    }

    // Verifica se CPF já está cadastrado (se fornecido)
    if (cpf) {
      const cpfExistente = await prisma.usuario.findUnique({ where: { cpf } });
      if (cpfExistente) {
        return res.status(409).json({ erro: "CPF já cadastrado." });
      }
    }

    // Gera o hash da senha com bcrypt (custo 10)
    const senhaHash = await bcrypt.hash(senha, 10);

    // Cria o usuário no banco
    const usuario = await prisma.usuario.create({
      data: { nome, email, senha: senhaHash, telefone, cpf },
      select: { id: true, nome: true, email: true, role: true, criadoEm: true },
    });

    // Gera o token JWT válido por 7 dias
    const token = jwt.sign(
      { id: usuario.id, email: usuario.email, role: usuario.role },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    return res.status(201).json({ usuario, token });
  } catch (err) {
    console.error("[cadastrar]", err);
    return res.status(500).json({ erro: "Erro interno ao cadastrar usuário." });
  }
}

// ─── POST /api/auth/login ────────────────────────────────────
// Autentica um usuário existente com email e senha.
// Retorna os dados do usuário e um token JWT.
export async function login(req: Request, res: Response) {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({ erro: "E-mail e senha são obrigatórios." });
    }

    // Busca o usuário pelo e-mail
    const usuario = await prisma.usuario.findUnique({ where: { email } });
    if (!usuario) {
      return res.status(401).json({ erro: "Credenciais inválidas." });
    }

    // Compara a senha fornecida com o hash armazenado
    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
    if (!senhaCorreta) {
      return res.status(401).json({ erro: "Credenciais inválidas." });
    }

    // Gera o token JWT
    const token = jwt.sign(
      { id: usuario.id, email: usuario.email, role: usuario.role },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    // Retorna dados do usuário (sem a senha) e o token
    const { senha: _, ...dadosUsuario } = usuario;
    return res.json({ usuario: dadosUsuario, token });
  } catch (err) {
    console.error("[login]", err);
    return res.status(500).json({ erro: "Erro interno ao fazer login." });
  }
}

// ─── GET /api/auth/me ────────────────────────────────────────
// Retorna os dados do usuário autenticado pelo token JWT.
export async function me(req: Request & { usuario?: any }, res: Response) {
  try {
    const usuario = await prisma.usuario.findUnique({
      where: { id: req.usuario.id },
      select: { id: true, nome: true, email: true, telefone: true, cpf: true, role: true, criadoEm: true },
    });

    if (!usuario) {
      return res.status(404).json({ erro: "Usuário não encontrado." });
    }

    return res.json(usuario);
  } catch (err) {
    console.error("[me]", err);
    return res.status(500).json({ erro: "Erro interno." });
  }
}