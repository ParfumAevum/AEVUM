// AdminRelatoriosPage.tsx
// Dashboard administrativo com relatórios, indicadores e painel lateral de navegação.
import { useLocation } from "react-router-dom";
import {
  AdminSidebar,
  AdminContent,
} from "../components/UI";
import {
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
} from "../styles/AdminRelatorioStyle";

export default function AdminRelatoriosPage() {
  const location = useLocation();

  const navItems = [
    { to: "/admin/relatorios", icon: "", label: "Relatórios" },
    { to: "/admin/produtos", icon: "", label: "Produtos" },
    { to: "/admin/pedidos", icon: "", label: "Pedidos" },
    { to: "/admin/clientes", icon: "", label: "Clientes" },
    { to: "/home", icon: "", label: "Ver Loja" },
  ];

  return (
    <AdminPageContainer>
      <AdminSidebar>
        <SidebarLogo>
          <h1>AEVUM ADMIN</h1>
          <p>Painel de Controle</p>
        </SidebarLogo>

        <SidebarNav>
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
        </SidebarNav>

        <SidebarFooter>
          <p>© 2024 AEVUM</p>
        </SidebarFooter>
      </AdminSidebar>

      <AdminContent>
        <PageHeader>
          <div>
            <SectionLabel>DEZEMBRO 2024</SectionLabel>
            <SectionTitle>Relatório de Vendas</SectionTitle>
          </div>
          <PeriodButtons>
            {["7D", "30D", "90D", "12M"].map((p, i) => (
              <PeriodButton key={p} $active={i === 1}>
                {p}
              </PeriodButton>
            ))}
          </PeriodButtons>
        </PageHeader>

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
            <HighlightStatValue $highlight>42</HighlightStatValue>
            <HighlightStatDelta $highlight>Requer atenção</HighlightStatDelta>
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
                  {
                    id: "#0124",
                    client: "Isabelle Moreau",
                    product: "L'Obsidienne",
                    value: "R$ 285,00",
                    status: "Pago",
                  },
                  {
                    id: "#0123",
                    client: "Carlos Mendes",
                    product: "Temple of Silence",
                    value: "R$ 310,00",
                    status: "Enviado",
                  },
                  {
                    id: "#0122",
                    client: "Ana Fonseca",
                    product: "Velvet Horizon",
                    value: "R$ 245,00",
                    status: "Processando",
                  },
                  {
                    id: "#0121",
                    client: "Jean-Paul B.",
                    product: "Golden Oud",
                    value: "R$ 320,00",
                    status: "Pago",
                  },
                  {
                    id: "#0120",
                    client: "Lina Svensson",
                    product: "Midnight Saffron",
                    value: "R$ 187,00",
                    status: "Cancelado",
                  },
                ].map((row) => (
                  <tr key={row.id}>
                    <OrderIdCell>{row.id}</OrderIdCell>
                    <td>{row.client}</td>
                    <td>{row.product}</td>
                    <td>{row.value}</td>
                    <td>
                      <StatusBadge status={row.status}>{row.status}</StatusBadge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Panel>

          <RightPanelGroup>
            <FeaturedPanel>
              <SmallPanelTitle>Produto em Destaque</SmallPanelTitle>
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAUTbQlDdvXimti3apJvKLXdr7MUQ6fmrLQHVMXWsOR-VptoLtRsPfIJrRo9LQLuKW9UcQ035eUVOKJ3i7tM-5O2jvxCnDfRvMHX4Df-ygDxgSh0DUXBDNKO7YH8_6xD6DDijRNXXrppjBACsCg8ae60i6lcyWQ2hgSMEkhiURnILiGQMOL6smzJA_Riy4Phl0VjlMl9hv-CsINmvO8vhtt8ffeiEjEatLUoJpZxaZNNOZ9B3KDxofMy7dpyiOjIPuiPO4hqr7Fw6M"
                alt="Top Product"
              />
              <p className="product-name">L'Obsidienne Noire</p>
              <p className="product-meta">248 unidades</p>
              <p className="product-price">R$ 70.680</p>
            </FeaturedPanel>

            <Panel>
              <SmallPanelTitle>Distribuição Geográfica</SmallPanelTitle>
              {[
                { city: "São Paulo", pct: 42 },
                { city: "Recife", pct: 28 },
                { city: "Rio de Janeiro", pct: 18 },
                { city: "Outros", pct: 12 },
              ].map((geo) => (
                <GeoRow key={geo.city}>
                  <GeoRowHeader>
                    <span className="city">{geo.city}</span>
                    <span className="percent">{geo.pct}%</span>
                  </GeoRowHeader>
                  <GeoBar $pct={geo.pct} />
                </GeoRow>
              ))}
            </Panel>
          </RightPanelGroup>
        </ChartArea>
      </AdminContent>
    </AdminPageContainer>
  );
}
