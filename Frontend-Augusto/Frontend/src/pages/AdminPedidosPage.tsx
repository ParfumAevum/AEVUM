// AdminPedidosPage.tsx
// Página administrativa para visualizar e gerenciar pedidos feitos pelos clientes.
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { PageContainer, AdminSidebar, AdminContent, LabelCaps, PrimaryButton } from '../components/UI';

// Cabeçalho lateral para painel de pedidos com nome e status.
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

// Tabela que lista os pedidos com status, cliente e valores.
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  thead th {
    font-family: 'Inter', sans-serif;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.outline};
    padding-bottom: 18px;
    text-align: left;
    border-bottom: 1px solid rgba(255,255,255,0.08);
  }

  tbody td {
    font-family: 'Inter', sans-serif;
    font-size: 14px;
    color: ${({ theme }) => theme.colors.onSurface};
    padding: 18px 0;
    border-bottom: 1px solid rgba(255,255,255,0.03);
  }

  tbody tr:hover td {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const navItems = [
  { to: '/admin/relatorios', label: 'Relatórios' },
  { to: '/admin/produtos', label: 'Produtos' },
  { to: '/admin/pedidos', label: 'Pedidos' },
  { to: '/admin/clientes', label: 'Clientes' },
  { to: '/home', label: 'Ver Loja' },
];

const orders = [
  { order: 'PED-1028', customer: 'Ana Silva', status: 'Em entrega', total: 'R$ 1.250,00', date: '04/05/2026' },
  { order: 'PED-1031', customer: 'Bruno Costa', status: 'Processando', total: 'R$ 620,00', date: '03/05/2026' },
  { order: 'PED-1035', customer: 'Carla Sousa', status: 'Concluído', total: 'R$ 980,00', date: '02/05/2026' },
  { order: 'PED-1040', customer: 'Daniel Freitas', status: 'Cancelado', total: 'R$ 0,00', date: '01/05/2026' },
];

export default function AdminPedidosPage() {
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
              ADMIN / PEDIDOS
            </LabelCaps>
            <h2 style={{ fontFamily: 'Noto Serif', fontSize: 'clamp(28px, 3vw, 48px)', fontWeight: 400, color: '#e5e2e1' }}>
              Controle de Pedidos
            </h2>
          </div>
          <PrimaryButton>
            Atualizar status
          </PrimaryButton>
        </header>

        <Table>
          <thead>
            <tr>
              <th>Pedido</th>
              <th>Cliente</th>
              <th>Status</th>
              <th>Total</th>
              <th>Data</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.order}>
                <td>{order.order}</td>
                <td>{order.customer}</td>
                <td>{order.status}</td>
                <td>{order.total}</td>
                <td>{order.date}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </AdminContent>
    </PageContainer>
  );
}
