// AdminRelatoriosPage.tsx
// Dashboard administrativo com relatórios, indicadores e painel lateral de navegação.
import { useState, useEffect } from "react";
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
import { api } from "../services/api";

interface Relatorio {
  receitaTotal: number;
  totalPedidos: number;
  totalClientes: number;
  ticketMedio: number;
  pedidosEmAberto: number;
  transacoes: any[];
  produtoDestaque: any;
}

export default function AdminRelatoriosPage() {
  const location = useLocation();
  const [relatorio, setRelatorio] = useState<Relatorio | null>(null);
  const [loading, setLoading] = useState(true);

  const navItems = [
    { to: "/admin/relatorios", icon: "", label: "Relatórios" },
    { to: "/admin/produtos", icon: "", label: "Produtos" },
    { to: "/admin/pedidos", icon: "", label: "Pedidos" },
    { to: "/admin/clientes", icon: "", label: "Clientes" },
    { to: "/home", icon: "", label: "Ver Loja" },
  ];

  useEffect(() => {
    carregarRelatorio();
  }, []);

  async function carregarRelatorio() {
    try {
      const response = await api.get("/admin/relatorios");
      setRelatorio(response.data);
    } catch (err) {
      console.error("Erro ao carregar relatório:", err);
      alert("Erro ao carregar relatório.");
    } finally {
      setLoading(false);
    }
  }

  if (loading || !relatorio) return <div>Carregando...</div>;

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
            <p className="stat-value">R$ {relatorio.receitaTotal.toFixed(2)}</p>
            <p className="stat-delta">↑ 18% vs mês anterior</p>
          </StatCard>
          <StatCard>
            <p className="stat-label">Pedidos</p>
            <p className="stat-value">{relatorio.totalPedidos}</p>
            <p className="stat-delta">↑ 12% vs mês anterior</p>
          </StatCard>
          <StatCard>
            <p className="stat-label">Ticket Médio</p>
            <p className="stat-value">R$ {relatorio.ticketMedio}</p>
            <p className="stat-delta">↑ 5% vs mês anterior</p>
          </StatCard>
          <StatCard>
            <p className="stat-label">Em Aberto</p>
            <HighlightStatValue $highlight>{relatorio.pedidosEmAberto}</HighlightStatValue>
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
                {relatorio.transacoes.map((transacao) => (
                  <tr key={transacao.id}>
                    <OrderIdCell>#{transacao.id}</OrderIdCell>
                    <td>{transacao.usuario.nome}</td>
                    <td>{transacao.itens[0]?.produto.nome || "N/A"}</td>
                    <td>R$ {transacao.total.toFixed(2)}</td>
                    <td>
                      <StatusBadge status={transacao.status}>{transacao.status}</StatusBadge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Panel>

          <RightPanelGroup>
            <FeaturedPanel>
              <SmallPanelTitle>Produto em Destaque</SmallPanelTitle>
              {relatorio.produtoDestaque ? (
                <>
                  <img
                    src={relatorio.produtoDestaque.imagem || "placeholder.jpg"}
                    alt={relatorio.produtoDestaque.nome}
                  />
                  <p className="product-name">{relatorio.produtoDestaque.nome}</p>
                  <p className="product-meta">{relatorio.produtoDestaque._count.itens} unidades</p>
                  <p className="product-price">R$ {(relatorio.produtoDestaque.preco * relatorio.produtoDestaque._count.itens).toFixed(2)}</p>
                </>
              ) : (
                <p>Nenhum produto em destaque</p>
              )}
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
