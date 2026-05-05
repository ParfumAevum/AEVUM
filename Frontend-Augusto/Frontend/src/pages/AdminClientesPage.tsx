// AdminClientesPage.tsx
// Página administrativa que exibe a base de clientes da loja.
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { PageContainer, AdminSidebar, AdminContent, LabelCaps, PrimaryButton } from '../components/UI';

// Cabeçalho lateral para painel de clientes administrativos.
const SidebarLogo = styled.div`
  padding: 0 32px 40px;
  border-bottom: 1px solid rgba(212,175,55,0.1);
  margin-bottom: 32px;

  h1 {
    font-family: 'Noto Serif', serif;
    font-size: 16px;
    letter-spacing: 0.3em;
    color: ${({ theme }) => theme.colors.primary};
    text-transform: uppercase;
  }

  p {
    font-family: 'Inter', sans-serif;
    font-size: 10px;
    color: ${({ theme }) => theme.colors.outline};
    margin-top: 4px;
  }
`;

const NavItem = styled(Link)<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 32px;
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ $active, theme }) => ($active ? theme.colors.primary : theme.colors.outline)};
  background: ${({ $active }) => ($active ? 'rgba(212,175,55,0.06)' : 'transparent')};
  border-right: 2px solid ${({ $active, theme }) => ($active ? theme.colors.primaryContainer : 'transparent')};
  transition: all 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    background: rgba(212,175,55,0.04);
  }
`;

const ClientList = styled.div`
  display: grid;
  gap: 16px;
`;

const ClientCard = styled.div`
  background: ${({ theme }) => theme.colors.surfaceContainerLow};
  border: 1px solid rgba(212,175,55,0.06);
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
    font-family: 'Noto Serif', serif;
    font-size: 20px;
    margin: 0;
    color: ${({ theme }) => theme.colors.onSurface};
  }

  p {
    font-family: 'Inter', sans-serif;
    font-size: 14px;
    color: ${({ theme }) => theme.colors.outline};
    margin: 0;
  }
`;

const navItems = [
  { to: '/admin/relatorios', label: 'Relatórios' },
  { to: '/admin/produtos', label: 'Produtos' },
  { to: '/admin/pedidos', label: 'Pedidos' },
  { to: '/admin/clientes', label: 'Clientes' },
  { to: '/home', label: 'Ver Loja' },
];

const clients = [
  { name: 'Ana Silva', email: 'ana@cliente.com', since: '2024', purchases: 14, lifetime: 'R$ 9.250,00' },
  { name: 'Bruno Costa', email: 'bruno@cliente.com', since: '2023', purchases: 8, lifetime: 'R$ 6.720,00' },
  { name: 'Carla Sousa', email: 'carla@cliente.com', since: '2025', purchases: 5, lifetime: 'R$ 3.450,00' },
];

export default function AdminClientesPage() {
  const location = useLocation();

  return (
    <PageContainer style={{ display: 'flex' }}>
      <AdminSidebar>
        <SidebarLogo>
          <h1>AEVUM ADMIN</h1>
          <p>Painel de Controle</p>
        </SidebarLogo>

        <nav style={{ flex: 1 }}>
          {navItems.map((item) => (
            <NavItem key={item.to} to={item.to} $active={location.pathname === item.to}>
              {item.label}
            </NavItem>
          ))}
        </nav>
      </AdminSidebar>

      <AdminContent>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40, flexWrap: 'wrap', gap: 24 }}>
          <div>
            <LabelCaps style={{ color: '#4d4635', display: 'block', marginBottom: 8, fontSize: 10 }}>
              ADMIN / CLIENTES
            </LabelCaps>
            <h2 style={{ fontFamily: 'Noto Serif', fontSize: 'clamp(28px, 3vw, 48px)', fontWeight: 400, color: '#e5e2e1' }}>
              Base de Clientes
            </h2>
          </div>
          <PrimaryButton>
            Exportar lista
          </PrimaryButton>
        </header>

        <ClientList>
          {clients.map((client) => (
            <ClientCard key={client.email}>
              <div className="row">
                <h3>{client.name}</h3>
                <p>{client.email}</p>
              </div>
              <div className="row">
                <p>Desde: {client.since}</p>
                <p>Compras: {client.purchases}</p>
                <p>Valor: {client.lifetime}</p>
              </div>
            </ClientCard>
          ))}
        </ClientList>
      </AdminContent>
    </PageContainer>
  );
}
