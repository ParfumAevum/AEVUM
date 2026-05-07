// ═══════════════════════════════════════════════════════════════════════════════════════════════════
// AdminProdutoStyle.tsx - Estilos do Painel de Produtos
// ═══════════════════════════════════════════════════════════════════════════════════════════════════
// Este arquivo contém todos os componentes estilizados para a página de administração de produtos.
// Inclui layout com sidebar, buscador, filtros, grid de produtos e cards com ações de editar/deletar.
// ═══════════════════════════════════════════════════════════════════════════════════════════════════
import styled from 'styled-components';
import { Link } from "react-router-dom";
import { PageContainer } from "../components/UI";

// ─── Container Principal da Página Admin ───────────────────────────────────────────────────────────
// Container que envolve toda a página de produtos. Define o layout flexível para sidebar + conteúdo.
const AdminPageContainer = styled(PageContainer)`
  display: flex;
`;

// ─── Sidebar de Navegação ───────────────────────────────────────────────────────────────────────────
// Barra lateral esquerda que contém a navegação do painel administrativo.
const SidebarNav = styled.nav`
  flex: 1;
`;

// ─── Cabeçalho da Página ────────────────────────────────────────────────────────────────────────────
// Header que aparece no topo da página. Contém breadcrumb, título e botões de ação.
const PageHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 64px;
  flex-wrap: wrap;
  gap: 24px;
`;

// ─── Navegação de Breadcrumb ────────────────────────────────────────────────────────────────────────
// Trilha de navegação que mostra o caminho atual no painel (ex: Admin > Produtos > Categoria).
const BreadcrumbNav = styled.nav`
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
  font-size: 10px;
  font-family: "Inter", sans-serif;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #4d4635;

  span:last-child {
    color: #d4af37;
  }
`;

// ─── Título da Página ───────────────────────────────────────────────────────────────────────────────
// Título principal da página. Fonte serifada grande e clara.
const PageTitle = styled.h2`
  font-family: "Noto Serif", serif;
  font-size: clamp(28px, 3vw, 48px);
  font-weight: 400;
  color: #e5e2e1;
`;

// ─── Ícone de Botão ─────────────────────────────────────────────────────────────────────────────────
// Estilo para ícones de Material Symbols usados em botões.
const ButtonIcon = styled.span`
  font-size: 18px;
`;

// ─── Texto de Estoque ───────────────────────────────────────────────────────────────────────────────
// Componente de texto que mostra o estoque do produto. Muda de cor se estoque está baixo.
const StockText = styled.span<{ $low?: boolean }>`
  font-family: "Inter", sans-serif;
  font-size: 12px;
  color: ${({ $low }) => ($low ? "#ffb4ab" : "#4d4635")};
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

  span.material-symbols-outlined {
    font-size: 18px;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    background: rgba(212, 175, 55, 0.04);
  }
`;

// ─── Barra de Busca ─────────────────────────────────────────────────────────────────────────────────
// Campo de entrada para buscar produtos por nome, SKU ou características. Inclui ícone de busca.
const SearchBar = styled.div`
  position: relative;
  margin-bottom: 40px;

  span.icon {
    position: absolute;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
    color: ${({ theme }) => theme.colors.outline};
    font-size: 20px;
  }

  input {
    width: 100%;
    background: ${({ theme }) => theme.colors.surfaceContainerLow};
    border: none;
    border-bottom: 1px solid #1a1a1a;
    outline: none;
    padding: 18px 16px 18px 48px;
    color: ${({ theme }) => theme.colors.onSurface};
    font-family: "Inter", sans-serif;
    font-size: 15px;
    transition: border-color 0.3s;

    &::placeholder {
      color: #333;
    }

    &:focus {
      border-bottom-color: ${({ theme }) => theme.colors.primaryContainer};
    }
  }
`;

// ─── Abas de Filtro ─────────────────────────────────────────────────────────────────────────────────
// Container para os botões de filtro. Permite alternar entre categorias e mostrar/ocultar itens.
const FilterTabs = styled.div`
  display: flex;
  gap: 4px;
  margin-bottom: 40px;
  flex-wrap: wrap;
`;

// ─── Botão de Aba (Tab) ──────────────────────────────────────────────────────────────────────────────
// Botão individual de filtro. Muda de cor e fundo quando ativo, com transição suave.
const Tab = styled.button<{ $active?: boolean }>`
  font-family: "Inter", sans-serif;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 10px 20px;
  border: none;
  background: ${({ $active, theme }) =>
    $active ? theme.colors.primaryContainer : theme.colors.surfaceContainerLow};
  color: ${({ $active, theme }) =>
    $active ? theme.colors.onPrimary : theme.colors.outline};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.surfaceContainerHigh};
    color: ${({ theme }) => theme.colors.primary};
  }
`;

// ─── Grid de Produtos ───────────────────────────────────────────────────────────────────────────────
// Layout em grid responsivo que organiza os cards de produtos em linhas.
const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
`;

// ─── Card de Produto no Admin ────────────────────────────────────────────────────────────────────────
// Card que exibe um produto com imagem, nome, preço, estoque e botões para editar/deletar.
const ProductAdminCard = styled.div`
  background: ${({ theme }) => theme.colors.surfaceContainerLow};
  border: 1px solid rgba(212, 175, 55, 0.06);
  overflow: hidden;
  transition: border-color 0.2s;

  &:hover {
    border-color: rgba(212, 175, 55, 0.2);
  }

  .img-wrapper {
    aspect-ratio: 1;
    overflow: hidden;
    background: ${({ theme }) => theme.colors.surfaceContainerHigh};
    position: relative;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.5s ease;
    }

    .badge {
      position: absolute;
      top: 12px;
      left: 12px;
      font-family: "Inter", sans-serif;
      font-size: 9px;
      font-weight: 600;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      padding: 4px 10px;
      background: ${({ theme }) => theme.colors.primaryContainer};
      color: ${({ theme }) => theme.colors.onPrimary};
    }
  }

  &:hover .img-wrapper img {
    transform: scale(1.04);
  }

  .card-body {
    padding: 24px;
  }

  h3 {
    font-family: "Noto Serif", serif;
    font-size: 18px;
    color: ${({ theme }) => theme.colors.onSurface};
    margin-bottom: 4px;
  }

  .sku {
    font-family: "Inter", sans-serif;
    font-size: 10px;
    color: ${({ theme }) => theme.colors.outline};
    letter-spacing: 0.1em;
    margin-bottom: 16px;
  }

  .price-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;

    .price {
      font-family: "Inter", sans-serif;
      font-size: 18px;
      color: ${({ theme }) => theme.colors.primary};
    }

    .stock {
      font-family: "Inter", sans-serif;
      font-size: 12px;
      color: ${({ theme }) => theme.colors.outline};
    }
  }

  .actions {
    display: flex;
    gap: 8px;

    button {
      flex: 1;
      font-family: "Inter", sans-serif;
      font-size: 10px;
      font-weight: 600;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      padding: 10px;
      cursor: pointer;
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;

      span.material-symbols-outlined {
        font-size: 15px;
      }
    }

    .edit-btn {
      border: 1px solid rgba(212, 175, 55, 0.3);
      background: transparent;
      color: ${({ theme }) => theme.colors.primaryContainer};

      &:hover {
        background: rgba(212, 175, 55, 0.08);
      }
    }

    .delete-btn {
      border: 1px solid rgba(255, 100, 100, 0.2);
      background: transparent;
      color: #ffb4ab;

      &:hover {
        background: rgba(255, 100, 100, 0.08);
      }
    }
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
`;

const ModalContainer = styled.div`
  width: min(440px, calc(100% - 32px));
  background: ${({ theme }) => theme.colors.surface};
  padding: 28px;
  border-radius: 16px;
  box-shadow: 0 36px 120px rgba(0, 0, 0, 0.24);
  display: flex;
  flex-direction: column;
  gap: 18px;

  h3 {
    margin: 0;
    font-family: "Noto Serif", serif;
    font-size: 24px;
    color: ${({ theme }) => theme.colors.onSurface};
  }

  label {
    display: flex;
    flex-direction: column;
    gap: 8px;
    font-family: "Inter", sans-serif;
    font-size: 13px;
    color: ${({ theme }) => theme.colors.onSurface};
  }

  input {
    width: 100%;
    padding: 12px 14px;
    border-radius: 8px;
    border: 1px solid rgba(212, 175, 55, 0.18);
    background: ${({ theme }) => theme.colors.surfaceContainerLow};
    color: ${({ theme }) => theme.colors.onSurface};
    font-family: "Inter", sans-serif;
    font-size: 14px;
    outline: none;
  }
`;

const ModalActions = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`;

export {
  AdminPageContainer,
  SidebarLogo,
  SidebarNav,
  NavItem,
  PageHeader,
  BreadcrumbNav,
  PageTitle,
  ButtonIcon,
  SearchBar,
  FilterTabs,
  Tab,
  ProductGrid,
  ProductAdminCard,
  StockText,
  ModalOverlay,
  ModalContainer,
  ModalActions,
};