import styled from "styled-components";
import { Link } from "react-router-dom";
import { PageContainer, LabelCaps, StatCard } from "../components/UI";

const AdminPageContainer = styled(PageContainer)`
  display: flex;
`;

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

const SidebarNav = styled.nav`
  flex: 1;
`;

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

const PageHeader = styled.header`
  margin-bottom: 64px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  flex-wrap: wrap;
  gap: 24px;
`;

const SectionLabel = styled(LabelCaps)`
  color: #4d4635;
  display: block;
  margin-bottom: 8px;
  font-size: 10px;
`;

const SectionTitle = styled.h2`
  font-family: "Noto Serif", serif;
  font-size: clamp(28px, 3vw, 48px);
  font-weight: 400;
  color: #e5e2e1;
`;

const PeriodButtons = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

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

const HighlightStatValue = styled.p<{ $highlight?: boolean }>`
  font-family: "Inter", sans-serif;
  font-size: 24px;
  font-weight: 700;
  color: ${({ $highlight, theme }) =>
    $highlight ? theme.colors.primaryContainer : theme.colors.onSurface};
`;

const HighlightStatDelta = styled.p<{ $highlight?: boolean }>`
  font-family: "Inter", sans-serif;
  font-size: 12px;
  color: ${({ $highlight, theme }) =>
    $highlight ? theme.colors.primaryContainer : theme.colors.outline};
`;

const SmallPanelTitle = styled.h4`
  font-family: "Noto Serif", serif;
  font-size: 16px;
  margin-bottom: 24px;
`;

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

const ChartArea = styled.div`
  display: grid;
  grid-template-columns: 2.2fr 1fr;
  gap: 24px;
  align-items: start;

  @media (max-width: 1000px) {
    grid-template-columns: 1fr;
  }
`;

const Panel = styled.div`
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 24px;
  padding: 32px;
`;

const OrderIdCell = styled.td`
  color: #d4af37;
  font-weight: 600;
`;

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

const RightPanelGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

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

const GeoRow = styled.div`
  margin-bottom: 20px;
`;

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