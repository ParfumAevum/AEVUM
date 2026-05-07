// ═══════════════════════════════════════════════════════════════════════════════════════════════════
// AdminRelatorioStyle.tsx - Estilos do Painel de Relatórios (Dashboard)
// ═══════════════════════════════════════════════════════════════════════════════════════════════════
// Este arquivo contém todos os componentes estilizados para a página de relatórios e estatísticas.
// Inclui cards de estatísticas, gráficos, tabelas, badges e painéis de análise de vendas.
// ═══════════════════════════════════════════════════════════════════════════════════════════════════
import styled from "styled-components";
import { Link } from "react-router-dom";
import { PageContainer, LabelCaps, StatCard } from "../components/UI";

// ─── Container Principal da Página Admin ───────────────────────────────────────────────────────────
// Container que envolve toda a página de relatórios. Define o layout flexível para sidebar + conteúdo.
const AdminPageContainer = styled(PageContainer)`
  display: flex;
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
    letter-spacing: 0.08em;
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

// ─── Sidebar de Navegação ───────────────────────────────────────────────────────────────────────────
// Barra lateral esquerda que contém a navegação do painel administrativo.
const SidebarNav = styled.nav`
  flex: 1;
`;

// ─── Rodapé da Sidebar ──────────────────────────────────────────────────────────────────────────────
// Seção inferior da sidebar. Contém informações adicionais ou créditos.
const SidebarFooter = styled.div`
  padding: 32px 32px 0;
  border-top: 1px solid rgba(212,175,55,0.08);

  p {
    font-family: "Inter", sans-serif;
    font-size: 10px;
    color: #4d4635;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }
`;

// ─── Cabeçalho da Página ────────────────────────────────────────────────────────────────────────────
// Header que aparece no topo da página. Contém título e botões de período/ação.
const PageHeader = styled.header`
  margin-bottom: 64px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
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

// ─── Botões de Período ──────────────────────────────────────────────────────────────────────────────
// Container para os botões que filtram dados por período (Hoje, Semana, Mês, etc).
const PeriodButtons = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

// ─── Botão de Período Individual ─────────────────────────────────────────────────────────────────────
// Botão que filtra os dados por período. Muda de cor e border quando ativo.
const PeriodButton = styled.button<{ $active?: boolean }>`
  font-family: "Inter", sans-serif;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.1em;
  padding: 8px 20px;
  border: 1px solid;
  border-color: ${({ $active, theme }) =>
    $active ? theme.colors.primaryContainer : "#1a1a1a"};
  background: ${({ $active }) =>
    $active ? "rgba(212,175,55,0.08)" : "transparent"};
  color: ${({ $active, theme }) =>
    $active ? theme.colors.primaryContainer : "#666"};
  cursor: pointer;
`;

// ─── Valor de Estatística em Destaque ────────────────────────────────────────────────────────────────
// Texto grande que mostra um valor de estatística (vendas, receita, etc).
const HighlightStatValue = styled.p<{ $highlight?: boolean }>`
  font-family: "Inter", sans-serif;
  font-size: 24px;
  font-weight: 700;
  color: ${({ $highlight, theme }) =>
    $highlight ? theme.colors.primaryContainer : theme.colors.onSurface};
`;

// ─── Variação de Estatística ────────────────────────────────────────────────────────────────────────
// Texto pequeno mostrando a variação ou delta (aumento/diminuição) de um valor.
const HighlightStatDelta = styled.p<{ $highlight?: boolean }>`
  font-family: "Inter", sans-serif;
  font-size: 12px;
  color: ${({ $highlight, theme }) =>
    $highlight ? theme.colors.primaryContainer : theme.colors.outline};
`;

// ─── Título de Painel Pequeno ───────────────────────────────────────────────────────────────────────
// Título para painéis e seções menores dentro da página.
const SmallPanelTitle = styled.h4`
  font-family: "Noto Serif", serif;
  font-size: 16px;
  margin-bottom: 24px;
`;

// ─── Tabela de Dados ─────────────────────────────────────────────────────────────────────────────────
// Tabela responsiva para exibir dados (pedidos, clientes, etc) com headers e linhas com hover.
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  thead th {
    font-family: "Inter", sans-serif;
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.outline};
    padding: 0 0 20px;
    text-align: left;
    border-bottom: 1px solid rgba(255, 255, 255, 0.04);
  }

  tbody td {
    font-family: "Inter", sans-serif;
    font-size: 14px;
    color: ${({ theme }) => theme.colors.onSurface};
    padding: 18px 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.03);
  }
`;

// ─── Grid de Estatísticas ───────────────────────────────────────────────────────────────────────────
// Layout em grid responsivo que organiza os cards de estatísticas em 4 colunas.
const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;
  margin-bottom: 32px;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 620px) {
    grid-template-columns: 1fr;
  }
`;

// ─── Área de Gráficos ───────────────────────────────────────────────────────────────────────────────
// Container que organiza os gráficos em layout de 2 colunas (gráfico principal + painéis laterais).
const ChartArea = styled.div`
  display: grid;
  grid-template-columns: 2.2fr 1fr;
  gap: 24px;
  align-items: start;

  @media (max-width: 1000px) {
    grid-template-columns: 1fr;
  }
`;

// ─── Painel de Conteúdo ──────────────────────────────────────────────────────────────────────────────
// Container estilizado para painéis com fundo, borda e padding. Usado em vários contextos.
const Panel = styled.div`
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 24px;
  padding: 32px;
`;

// ─── Célula de ID de Pedido ─────────────────────────────────────────────────────────────────────────
// Estilo especial para células que mostram IDs de pedidos. Destaque em dourado.
const OrderIdCell = styled.td`
  color: #d4af37;
  font-weight: 600;
`;

// ─── Badge de Status ─────────────────────────────────────────────────────────────────────────────────
// Badge que mostra o status de um pedido. Muda de cor baseado no tipo de status.
const StatusBadge = styled.span<{ status: string }>`
  font-family: "Inter", sans-serif;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 4px 10px;
  border: 1px solid;
  border-color: ${({ status }) =>
    status === "Cancelado"
      ? "rgba(255,100,100,0.3)"
      : status === "Processando"
      ? "rgba(242,202,80,0.3)"
      : "rgba(76,175,80,0.3)"};
  color: ${({ status }) =>
    status === "Cancelado"
      ? "#ffb4ab"
      : status === "Processando"
      ? "#f2ca50"
      : "#4caf50"};
`;

// ─── Grupo de Painéis Direito ───────────────────────────────────────────────────────────────────────
// Container que organiza os painéis do lado direito (produtos em destaque, geolocalização, etc).
const RightPanelGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

// ─── Painel de Produto em Destaque ──────────────────────────────────────────────────────────────────
// Card que exibe um produto em destaque (mais vendido) com imagem, nome, preço.
const FeaturedPanel = styled.div`
  text-align: center;

  img {
    width: 100px;
    height: 120px;
    object-fit: cover;
    margin: 0 auto 16px;
  }

  p {
    margin: 4px 0;
  }

  .product-name {
    font-family: "Noto Serif", serif;
    font-size: 16px;
    color: ${({ theme }) => theme.colors.onSurface};
  }

  .product-meta {
    font-family: "Inter", sans-serif;
    font-size: 13px;
    color: #666;
  }

  .product-price {
    font-family: "Inter", sans-serif;
    font-size: 18px;
    color: #f2ca50;
  }
`;

// ─── Linha de Geolocalização ────────────────────────────────────────────────────────────────────────
// Linha que mostra dados geográficos (cidade e percentual de vendas).
const GeoRow = styled.div`
  margin-bottom: 20px;
`;

// ─── Header de Linha Geo ────────────────────────────────────────────────────────────────────────────
// Header da linha de geo, mostrando cidade e percentual.
const GeoRowHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;

  span {
    font-family: "Inter", sans-serif;
    font-size: 13px;
  }

  .city {
    color: #e5e2e1;
  }

  .percent {
    color: #d4af37;
  }
`;

// ─── Barra de Progresso Geo ─────────────────────────────────────────────────────────────────────────
// Barra visual que mostra o percentual de vendas por região.
const GeoBar = styled.div<{ $pct: number }>`
  height: 4px;
  background: rgba(212, 175, 55, 0.12);
  margin-top: 8px;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: ${({ $pct }) => $pct}%;
    background: ${({ theme }) => theme.colors.primaryContainer};
  }
`;

export {
  AdminPageContainer,
  SidebarLogo,
  NavItem,
  SidebarNav,
  SidebarFooter,
  PageHeader,
  SectionLabel,
  SectionTitle,
  PeriodButtons,
  PeriodButton,
  HighlightStatValue,
  HighlightStatDelta,
  StatCard,
  StatsGrid,
  ChartArea,
  Panel,
  Table,
  OrderIdCell,
  StatusBadge,
  RightPanelGroup,
  FeaturedPanel,
  SmallPanelTitle,
  GeoRow,
  GeoRowHeader,
  GeoBar,
};