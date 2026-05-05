// AdminRelatoriosPage.tsx
// Dashboard administrativo com relatórios, indicadores e painel lateral de navegação.
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { PageContainer, AdminSidebar, AdminContent, StatCard, LabelCaps } from '../components/UI';

// Cabeçalho do menu lateral com marca do painel administrativo.
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
    letter-spacing: 0.08em;
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
  color: ${({ $active, theme }) => $active ? theme.colors.primary : theme.colors.outline};
  background: ${({ $active }) => $active ? 'rgba(212,175,55,0.06)' : 'transparent'};
  border-right: 2px solid ${({ $active, theme }) => $active ? theme.colors.primaryContainer : 'transparent'};
  transition: all 0.2s ease;

  span.material-symbols-outlined {
    font-size: 18px;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    background: rgba(212,175,55,0.04);
  }
`;

// Grade de cartões com KPIs e métricas rápidas.
const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 64px;
`;

const ChartArea = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
  margin-bottom: 64px;

  @media (min-width: 1200px) {
    grid-template-columns: 2fr 1fr;
  }
`;

const Panel = styled.div`
  background: ${({ theme }) => theme.colors.surfaceContainerLow};
  border: 1px solid rgba(212,175,55,0.06);
  padding: 40px;

  h4 {
    font-family: 'Noto Serif', serif;
    font-size: 22px;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.onSurface};
    margin-bottom: 32px;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  thead th {
    font-family: 'Inter', sans-serif;
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.outline};
    padding: 0 0 20px;
    text-align: left;
    border-bottom: 1px solid rgba(255,255,255,0.04);
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

const GeoBar = styled.div<{ $pct: number }>`
  height: 4px;
  background: rgba(212,175,55,0.12);
  margin-top: 8px;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: ${({ $pct }) => $pct}%;
    background: ${({ theme }) => theme.colors.primaryContainer};
  }
`;

const navItems = [
  { to: '/admin/relatorios', icon: '', label: 'Relatórios' },
  { to: '/admin/produtos', icon: '', label: 'Produtos' },
  { to: '/admin/pedidos', icon: '', label: 'Pedidos' },
  { to: '/admin/clientes', icon: '', label: 'Clientes' },
  { to: '/home', icon: '', label: 'Ver Loja' },
];

export default function AdminRelatoriosPage() {
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
            <NavItem
              key={item.to}
              to={item.to}
              $active={location.pathname === item.to}
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              {item.label}
            </NavItem>
          ))}
        </nav>

        <div style={{ padding: '32px 32px 0', borderTop: '1px solid rgba(212,175,55,0.08)' }}>
          <p style={{ fontFamily: 'Inter', fontSize: 10, color: '#4d4635', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            © 2024 AEVUM
          </p>
        </div>
      </AdminSidebar>

      <AdminContent>
        <header style={{ marginBottom: 64, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 24 }}>
          <div>
            <LabelCaps style={{ color: '#4d4635', display: 'block', marginBottom: 8, fontSize: 10 }}>
              DEZEMBRO 2024
            </LabelCaps>
            <h2 style={{ fontFamily: 'Noto Serif', fontSize: 'clamp(28px, 3vw, 48px)', fontWeight: 400, color: '#e5e2e1' }}>
              Relatório de Vendas
            </h2>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            {['7D', '30D', '90D', '12M'].map((p, i) => (
              <button key={p} style={{
                fontFamily: 'Inter', fontSize: 11, fontWeight: 600, letterSpacing: '0.1em',
                padding: '8px 20px', border: '1px solid',
                borderColor: i === 1 ? '#d4af37' : '#1a1a1a',
                background: i === 1 ? 'rgba(212,175,55,0.08)' : 'transparent',
                color: i === 1 ? '#d4af37' : '#666', cursor: 'pointer'
              }}>{p}</button>
            ))}
          </div>
        </header>

        {/* KPIs */}
        <StatsGrid>
          <StatCard>
            <p className="stat-label">Receita Total</p>
            <p className="stat-value">R$ 142.800</p>
            <p className="stat-delta">↑ 18% vs mês anterior</p>
          </StatCard>
          <StatCard>
            <p className="stat-label">Pedidos</p>
            <p className="stat-value">1.248</p>
            <p className="stat-delta">↑ 12% vs mês anterior</p>
          </StatCard>
          <StatCard>
            <p className="stat-label">Ticket Médio</p>
            <p className="stat-value">R$ 328</p>
            <p className="stat-delta">↑ 5% vs mês anterior</p>
          </StatCard>
          <StatCard>
            <p className="stat-label">Em Aberto</p>
            <p className="stat-value" style={{ color: '#f2ca50' }}>42</p>
            <p className="stat-delta" style={{ color: '#f2ca50' }}>Requer atenção</p>
          </StatCard>
        </StatsGrid>

        {/* Main panels */}
        <ChartArea>
          <Panel>
            <h4>Transações Recentes</h4>
            <Table>
              <thead>
                <tr>
                  <th>Pedido</th>
                  <th>Cliente</th>
                  <th>Produto</th>
                  <th>Valor</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { id: '#0124', client: 'Isabelle Moreau', product: "L'Obsidienne", value: 'R$ 285,00', status: 'Pago' },
                  { id: '#0123', client: 'Carlos Mendes', product: 'Temple of Silence', value: 'R$ 310,00', status: 'Enviado' },
                  { id: '#0122', client: 'Ana Fonseca', product: 'Velvet Horizon', value: 'R$ 245,00', status: 'Processando' },
                  { id: '#0121', client: 'Jean-Paul B.', product: 'Golden Oud', value: 'R$ 320,00', status: 'Pago' },
                  { id: '#0120', client: 'Lina Svensson', product: 'Midnight Saffron', value: 'R$ 187,00', status: 'Cancelado' },
                ].map((row) => (
                  <tr key={row.id}>
                    <td style={{ color: '#d4af37', fontWeight: 600 }}>{row.id}</td>
                    <td>{row.client}</td>
                    <td>{row.product}</td>
                    <td>{row.value}</td>
                    <td>
                      <span style={{
                        fontSize: 10, fontFamily: 'Inter', fontWeight: 600, letterSpacing: '0.1em',
                        textTransform: 'uppercase', padding: '4px 10px', border: '1px solid',
                        borderColor: row.status === 'Cancelado' ? 'rgba(255,100,100,0.3)' : row.status === 'Processando' ? 'rgba(242,202,80,0.3)' : 'rgba(76,175,80,0.3)',
                        color: row.status === 'Cancelado' ? '#ffb4ab' : row.status === 'Processando' ? '#f2ca50' : '#4caf50'
                      }}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Panel>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <Panel>
              <h4 style={{ fontSize: 16, marginBottom: 24 }}>Produto em Destaque</h4>
              <div style={{ textAlign: 'center' }}>
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAUTbQlDdvXimti3apJvKLXdr7MUQ6fmrLQHVMXWsOR-VptoLtRsPfIJrRo9LQLuKW9UcQ035eUVOKJ3i7tM-5O2jvxCnDfRvMHX4Df-ygDxgSh0DUXBDNKO7YH8_6xD6DDijRNXXrppjBACsCg8ae60i6lcyWQ2hgSMEkhiURnILiGQMOL6smzJA_Riy4Phl0VjlMl9hv-CsINmvO8vhtt8ffeiEjEatLUoJpZxaZNNOZ9B3KDxofMy7dpyiOjIPuiPO4hqr7Fw6M"
                  alt="Top Product"
                  style={{ width: 100, height: 120, objectFit: 'cover', margin: '0 auto 16px' }}
                />
                <p style={{ fontFamily: 'Noto Serif', fontSize: 16, color: '#e5e2e1' }}>L'Obsidienne Noire</p>
                <p style={{ fontFamily: 'Inter', fontSize: 13, color: '#666', margin: '4px 0' }}>248 unidades</p>
                <p style={{ fontFamily: 'Inter', fontSize: 18, color: '#f2ca50' }}>R$ 70.680</p>
              </div>
            </Panel>

            <Panel>
              <h4 style={{ fontSize: 16, marginBottom: 24 }}>Distribuição Geográfica</h4>
              {[
                { city: 'São Paulo', pct: 42 },
                { city: 'Recife', pct: 28 },
                { city: 'Rio de Janeiro', pct: 18 },
                { city: 'Outros', pct: 12 },
              ].map((geo) => (
                <div key={geo.city} style={{ marginBottom: 20 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span style={{ fontFamily: 'Inter', fontSize: 13, color: '#e5e2e1' }}>{geo.city}</span>
                    <span style={{ fontFamily: 'Inter', fontSize: 13, color: '#d4af37' }}>{geo.pct}%</span>
                  </div>
                  <GeoBar $pct={geo.pct} />
                </div>
              ))}
            </Panel>
          </div>
        </ChartArea>
      </AdminContent>
    </PageContainer>
  );
}