// ═══════════════════════════════════════════════════════════════════════════════════════════════════
// AdminPedidoStyle.tsx - Estilos do Painel de Pedidos
// ═══════════════════════════════════════════════════════════════════════════════════════════════════
// Este arquivo contém todos os componentes estilizados para a página de administração de pedidos.
// Inclui layout com sidebar, cabeçalho da página, navegação e tabela de pedidos.
// ═══════════════════════════════════════════════════════════════════════════════════════════════════
import styled from "styled-components";
import { Link } from "react-router-dom";
import { PageContainer, LabelCaps } from "../components/UI";

// ─── Container Principal da Página Admin ───────────────────────────────────────────────────────────
// Container que envolve toda a página de pedidos. Define o layout flexível para sidebar + conteúdo.
const AdminPageContainer = styled(PageContainer)`
  display: flex;
`;

// ─── Sidebar de Navegação ───────────────────────────────────────────────────────────────────────────
// Barra lateral esquerda que contém a navegação do painel administrativo. Responsiva e flexível.
const SidebarNav = styled.nav`
  flex: 1;
`;

// ─── Cabeçalho da Página ────────────────────────────────────────────────────────────────────────────
// Header que aparece no topo da página. Contém título e controles. Flexível para diferentes tamanhos.
const PageHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 40px;
  flex-wrap: wrap;
  gap: 24px;
`;

// ─── Label de Seção ─────────────────────────────────────────────────────────────────────────────────
// Pequeno label/rótulo que precede títulos de seção. Formato maiúsculo estilizado.
const SectionLabel = styled(LabelCaps)`
  color: #4d4635;
  display: block;
  margin-bottom: 8px;
  font-size: 10px;
`;

// ─── Título de Seção ────────────────────────────────────────────────────────────────────────────────
// Título principal de cada seção. Fonte serifada grande e clara.
const SectionTitle = styled.h2`
  font-family: "Noto Serif", serif;
  font-size: clamp(28px, 3vw, 48px);
  font-weight: 400;
  color: #e5e2e1;
`;

// ─── Logo e Informações da Sidebar ──────────────────────────────────────────────────────────────────
// Container que exibe o logo/marca e descrição na parte superior da sidebar.
const SidebarLogo = styled.div`
  padding: 0 32px 40px;
  border-bottom: 1px solid rgba(212, 175, 55, 0.1);
  margin-bottom: 32px;

  h1 {
    font-family: "Noto Serif", serif;
    font-size: 16px;
    letter-spacing: 0.3em;
    color: ${({ theme }) => theme.colors.primary};
    text-transform: uppercase;
  }

  p {
    font-family: "Inter", sans-serif;
    font-size: 10px;
    color: ${({ theme }) => theme.colors.outline};
    margin-top: 4px;
  }
`;

// ─── Item de Navegação da Sidebar ───────────────────────────────────────────────────────────────────
// Link de navegação na sidebar. Muda de cor e fundo quando ativo, com transição suave.
const NavItem = styled(Link)<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 32px;
  font-family: "Inter", sans-serif;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ $active, theme }) =>
    $active ? theme.colors.primary : theme.colors.outline};
  background: ${({ $active }) =>
    $active ? "rgba(212,175,55,0.06)" : "transparent"};
  border-right: 2px solid
    ${({ $active, theme }) =>
      $active ? theme.colors.primaryContainer : "transparent"};
  transition: all 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    background: rgba(212, 175, 55, 0.04);
  }
`;

// ─── Tabela de Pedidos ───────────────────────────────────────────────────────────────────────────────
// Tabela que lista todos os pedidos com suas informações. Headers em maiúsculo, linhas com hover.
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  thead th {
    font-family: "Inter", sans-serif;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.outline};
    padding-bottom: 18px;
    text-align: left;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  }

  tbody td {
    font-family: "Inter", sans-serif;
    font-size: 14px;
    color: ${({ theme }) => theme.colors.onSurface};
    padding: 18px 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.03);
  }

  tbody tr:hover td {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export {
  AdminPageContainer, 
  SidebarLogo, 
  SidebarNav, 
  NavItem, 
  PageHeader, 
  SectionLabel, 
  SectionTitle, 
  Table
};
