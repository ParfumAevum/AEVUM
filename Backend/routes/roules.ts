// ══════════════════════════════════════════════════════════════
// src/routes/index.ts
// Monta todas as rotas da API e aplica os middlewares corretos.
// ══════════════════════════════════════════════════════════════

import { Router } from "express";
import { cadastrar, login, me } from "../controllers/authController";
import {
  listarProdutos,
  obterProduto,
  criarProduto,
  atualizarProduto,
  deletarProduto,
  listarCategorias,
} from "../controllers/produtosController";
import {
  criarPedido,
  listarPedidos,
  obterPedido,
  atualizarStatus,
} from "../controllers/pedidosController";
import {
  listarUsuarios,
  obterPerfil,
  atualizarPerfil,
  atualizarUsuario,
  deletarUsuario,
  relatorios,
} from "../controllers/usuariosController";
import { autenticar, apenasAdmin } from "../middleware/auth";

const router = Router();

// ─── Rotas de Autenticação ──────────────────────────────────
router.post("/auth/cadastro", cadastrar);
router.post("/auth/login", login);
router.get("/auth/me", autenticar, me);

// ─── Rotas de Produtos (leitura pública, escrita admin) ─────
router.get("/produtos", listarProdutos);
router.get("/produtos/:id", obterProduto);
router.post("/produtos", autenticar, apenasAdmin, criarProduto);
router.put("/produtos/:id", autenticar, apenasAdmin, atualizarProduto);
router.delete("/produtos/:id", autenticar, apenasAdmin, deletarProduto);

// ─── Rotas de Categorias ────────────────────────────────────
router.get("/categorias", listarCategorias);

// ─── Rotas de Pedidos ───────────────────────────────────────
router.post("/pedidos", autenticar, criarPedido);
router.get("/pedidos", autenticar, listarPedidos);
router.get("/pedidos/:id", autenticar, obterPedido);
router.patch("/pedidos/:id/status", autenticar, apenasAdmin, atualizarStatus);

// ─── Rotas de Usuários ──────────────────────────────────────
router.get("/usuarios", autenticar, apenasAdmin, listarUsuarios);
router.get("/usuarios/perfil", autenticar, obterPerfil);
router.put("/usuarios/perfil", autenticar, atualizarPerfil);
router.put("/usuarios/:id", autenticar, apenasAdmin, atualizarUsuario);
router.delete("/usuarios/:id", autenticar, apenasAdmin, deletarUsuario);

// ─── Rotas Admin ─────────────────────────────────────────────
router.get("/admin/relatorios", autenticar, apenasAdmin, relatorios);

export default router;