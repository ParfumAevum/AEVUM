// Estilos do painel administrativo de clientes.
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

// Lista de clientes em grid para exibição administrativa.
const ClientList = styled.div`
  display: grid;
  gap: 16px;
`;

// Cartão para exibir informações de um cliente na lista administrativa.
const ClientCard = styled.div`
  background: ${({ theme }) => theme.colors.surfaceContainerLow};
  border: 1px solid rgba(212, 175, 55, 0.06);
  padding: 24px;
  display: grid;
  gap: 16px;

  .row {
    display: flex;
    justify-content: space-between;
    gap: 16px;
    flex-wrap: wrap;
  }

  h3 {
    font-family: "Noto Serif", serif;
    font-size: 20px;
    margin: 0;
    color: ${({ theme }) => theme.colors.onSurface};
  }

  p {
    font-family: "Inter", sans-serif;
    font-size: 14px;
    color: ${({ theme }) => theme.colors.outline};
    margin: 0;
  }
`;

const navItems = [
  { to: "/admin/relatorios", label: "Relatórios" },
  { to: "/admin/produtos", label: "Produtos" },
  { to: "/admin/pedidos", label: "Pedidos" },
  { to: "/admin/clientes", label: "Clientes" },
  { to: "/home", label: "Ver Loja" },
];

const clients = [
  {
    name: "Ana Silva",
    email: "ana@cliente.com",
    since: "2024",
    purchases: 14,
    lifetime: "R$ 9.250,00",
  },
  {
    name: "Bruno Costa",
    email: "bruno@cliente.com",
    since: "2023",
    purchases: 8,
    lifetime: "R$ 6.720,00",
  },
  {
    name: "Carla Sousa",
    email: "carla@cliente.com",
    since: "2025",
    purchases: 5,
    lifetime: "R$ 3.450,00",
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
  ClientList, 
  ClientCard, 
  navItems, 
  clients 
};