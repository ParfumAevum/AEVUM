"use strict";
// ══════════════════════════════════════════════════════════════
// src/routes/index.ts
// Monta todas as rotas da API e aplica os middlewares corretos.
// ══════════════════════════════════════════════════════════════
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const produtosController_1 = require("../controllers/produtosController");
const pedidosController_1 = require("../controllers/pedidosController");
const usuariosController_1 = require("../controllers/usuariosController");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
// ─── Rotas de Autenticação ──────────────────────────────────
router.post("/auth/cadastro", authController_1.cadastrar);
router.post("/auth/login", authController_1.login);
router.get("/auth/me", auth_1.autenticar, authController_1.me);
// ─── Rotas de Produtos (leitura pública, escrita admin) ─────
router.get("/produtos", produtosController_1.listarProdutos);
router.get("/produtos/:id", produtosController_1.obterProduto);
router.post("/produtos", auth_1.autenticar, auth_1.apenasAdmin, produtosController_1.criarProduto);
router.put("/produtos/:id", auth_1.autenticar, auth_1.apenasAdmin, produtosController_1.atualizarProduto);
router.delete("/produtos/:id", auth_1.autenticar, auth_1.apenasAdmin, produtosController_1.deletarProduto);
// ─── Rotas de Categorias ────────────────────────────────────
router.get("/categorias", produtosController_1.listarCategorias);
// ─── Rotas de Pedidos ───────────────────────────────────────
router.post("/pedidos", auth_1.autenticar, pedidosController_1.criarPedido);
router.get("/pedidos", auth_1.autenticar, pedidosController_1.listarPedidos);
router.get("/pedidos/:id", auth_1.autenticar, pedidosController_1.obterPedido);
router.patch("/pedidos/:id/status", auth_1.autenticar, auth_1.apenasAdmin, pedidosController_1.atualizarStatus);
// ─── Rotas de Usuários ──────────────────────────────────────
router.get("/usuarios", auth_1.autenticar, auth_1.apenasAdmin, usuariosController_1.listarUsuarios);
router.get("/usuarios/perfil", auth_1.autenticar, usuariosController_1.obterPerfil);
router.put("/usuarios/perfil", auth_1.autenticar, usuariosController_1.atualizarPerfil);
router.put("/usuarios/:id", auth_1.autenticar, auth_1.apenasAdmin, usuariosController_1.atualizarUsuario);
router.delete("/usuarios/:id", auth_1.autenticar, auth_1.apenasAdmin, usuariosController_1.deletarUsuario);
// ─── Rotas Admin ─────────────────────────────────────────────
router.get("/admin/relatorios", auth_1.autenticar, auth_1.apenasAdmin, usuariosController_1.relatorios);
exports.default = router;
