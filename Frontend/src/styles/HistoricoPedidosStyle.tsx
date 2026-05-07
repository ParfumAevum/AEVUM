// ═══════════════════════════════════════════════════════════════════════════════════════════════════
// HistoricoPedidosStyle.tsx - Estilos da Página de Histórico de Pedidos
// ═══════════════════════════════════════════════════════════════════════════════════════════════════
// Este arquivo contém todos os componentes estilizados para a página de histórico de pedidos do usuário.
// Inclui layout com hero section, tabela/lista de pedidos e detalhes de cada compra realizada.
// ═══════════════════════════════════════════════════════════════════════════════════════════════════
import styled from "styled-components";

// ─── Wrapper da Página ──────────────────────────────────────────────────────────────────────────────
// Container principal que envolve toda a página com padding responsivo (topo, inferior, laterais).
export const PageWrapper = styled.div`
  padding-top: 128px;
  padding-bottom: 96px;
  padding-left: clamp(24px, 4vw, 48px);
  padding-right: clamp(24px, 4vw, 48px);

  @media (max-width: 768px) {
    padding-top: 96px;
    padding-bottom: 48px;
    padding-left: 24px;
    padding-right: 24px;
  }
`;

// ─── Seção Hero (Destaque) da Página ────────────────────────────────────────────────────────────────
// Seção de introdução que contém título grande e descrição sobre o histórico de pedidos.
export const PageHero = styled.section`
  margin-bottom: 80px;

  h1 {
    font-family: 'Noto Serif', serif;
    font-size: clamp(40px, 6vw, 84px);
    font-weight: 300;
    line-height: 1.1;
    letter-spacing: -0.02em;
    color: ${({ theme }) => theme.colors.onSurface};
    margin-bottom: 16px;
  }

  p {
    font-family: 'Inter', sans-serif;
    font-size: 16px;
    color: ${({ theme }) => theme.colors.outline};
  }
`;

// Linha de filtros que permite alternar entre diferentes estados de pedidos.
export const FilterRow = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 64px;
`;

export const FilterChip = styled.button<{ $active?: boolean }>`
  font-family: 'Inter', sans-serif;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  padding: 10px 24px;
  border: 1px solid ${({ $active, theme }) => $active ? theme.colors.primaryContainer : theme.colors.outlineVariant};
  background: ${({ $active, theme }) => $active ? theme.colors.primaryContainer : 'transparent'};
  color: ${({ $active, theme }) => $active ? theme.colors.onPrimary : theme.colors.outline};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primaryContainer};
    color: ${({ theme }) => theme.colors.primaryContainer};
  }
`;

// Lista de pedidos renderizada como cartões de histórico.
export const OrderList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const OrderCard = styled.article`
  background: ${({ theme }) => theme.colors.surfaceContainerLow};
  border: 1px solid rgba(212, 175, 55, 0.06);
  overflow: hidden;
  transition: border-color 0.2s ease;

  &:hover {
    border-color: rgba(212, 175, 55, 0.2);
  }
`;

export const OrderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 28px 32px;
  border-bottom: 1px solid rgba(255,255,255,0.04);
  flex-wrap: wrap;
  gap: 16px;
`;

export const OrderMeta = styled.div`
  display: flex;
  gap: 48px;
  flex-wrap: wrap;
`;

export const MetaItem = styled.div`
  label {
    font-family: 'Inter', sans-serif;
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.outline};
    display: block;
    margin-bottom: 4px;
  }

  span {
    font-family: 'Inter', sans-serif;
    font-size: 15px;
    color: ${({ theme }) => theme.colors.onSurface};
  }
`;

export const StatusBadge = styled.span<{ $status: 'entregue' | 'processando' | 'cancelado' }>`
  font-family: 'Inter', sans-serif;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  padding: 6px 16px;
  border: 1px solid;
  border-color: ${({ $status }) =>
    $status === 'entregue' ? 'rgba(76, 175, 80, 0.4)' :
    $status === 'processando' ? 'rgba(242, 202, 80, 0.4)' :
    'rgba(255, 180, 171, 0.4)'};
  color: ${({ $status }) =>
    $status === 'entregue' ? '#4caf50' :
    $status === 'processando' ? '#f2ca50' :
    '#ffb4ab'};
`;

export const OrderItems = styled.div`
  padding: 28px 32px;
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
`;

export const ProductMini = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;

  .thumb {
    width: 72px;
    height: 72px;
    background: ${({ theme }) => theme.colors.surfaceContainerHigh};
    border: 1px solid rgba(212, 175, 55, 0.1);
    overflow: hidden;
    flex-shrink: 0;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .info {
    h4 {
      font-family: 'Noto Serif', serif;
      font-size: 16px;
      color: ${({ theme }) => theme.colors.onSurface};
      margin-bottom: 4px;
    }
    p {
      font-family: 'Inter', sans-serif;
      font-size: 13px;
      color: ${({ theme }) => theme.colors.outline};
    }
  }
`;