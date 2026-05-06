// Estilos do painel de pedidos: navegação lateral, cabeçalho e tabela.
import styled from "styled-components";
import { Link } from "react-router-dom";
import { PageContainer, LabelCaps } from "../components/UI";

const AdminPageContainer = styled(PageContainer)`
  display: flex;
`;

const SidebarNav = styled.nav`
  flex: 1;
`;

const PageHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 40px;
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

// Item de navegação lateral para links do painel administrativo.
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

// Tabela que lista os pedidos com status, cliente e valores.
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

const navItems = [
  { to: "/admin/relatorios", label: "Relatórios" },
  { to: "/admin/produtos", label: "Produtos" },
  { to: "/admin/pedidos", label: "Pedidos" },
  { to: "/admin/clientes", label: "Clientes" },
  { to: "/home", label: "Ver Loja" },
];

const orders = [
  {
    order: "PED-1028",
    customer: "Ana Silva",
    status: "Em entrega",
    total: "R$ 1.250,00",
    date: "04/05/2026",
  },
  {
    order: "PED-1031",
    customer: "Bruno Costa",
    status: "Processando",
    total: "R$ 620,00",
    date: "03/05/2026",
  },
  {
    order: "PED-1035",
    customer: "Carla Sousa",
    status: "Concluído",
    total: "R$ 980,00",
    date: "02/05/2026",
  },
  {
    order: "PED-1040",
    customer: "Daniel Freitas",
    status: "Cancelado",
    total: "R$ 0,00",
    date: "01/05/2026",
  },
];

export {
  AdminPageContainer, 
  SidebarLogo, 
  SidebarNav, 
  NavItem, 
  PageHeader, 
  SectionLabel, 
  SectionTitle, 
  Table, 
  navItems, 
  orders 
};
