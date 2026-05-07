// AdminPedidosPage.tsx
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  AdminSidebar,
  AdminContent,
  PrimaryButton,
} from "../components/UI";
import {
  AdminPageContainer,
  SidebarLogo,
  SidebarNav,
  NavItem,
  PageHeader,
  SectionLabel,
  SectionTitle,
  Table,
} from "../styles/AdminPedidoStyle";
import { api } from "../services/api";

interface Pedido {
  id: number;
  usuario: { nome: string };
  total: number;
  status: string;
  criadoEm: string;
}

const navItems = [
  { to: "/admin/relatorios", label: "Relatórios" },
  { to: "/admin/produtos", label: "Produtos" },
  { to: "/admin/pedidos", label: "Pedidos" },
  { to: "/admin/clientes", label: "Clientes" },
  { to: "/home", label: "Ver Loja" },
];

export default function AdminPedidosPage() {
  const location = useLocation();
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarPedidos();
  }, []);

  async function carregarPedidos() {
    try {
      const response = await api.get("/pedidos");
      setPedidos(response.data);
    } catch (err) {
      console.error("Erro ao carregar pedidos:", err);
      alert("Erro ao carregar pedidos.");
    } finally {
      setLoading(false);
    }
  }

  async function alterarStatus(id: number, novoStatus: string) {
    try {
      await api.patch(`/pedidos/${id}/status`, { status: novoStatus });
      setPedidos(pedidos.map((p) => (p.id === id ? { ...p, status: novoStatus } : p)));
      alert("Status atualizado com sucesso.");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Erro ao atualizar status.";
      alert(message);
    }
  }

  if (loading) return <div>Carregando...</div>;

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
              {item.label}
            </NavItem>
          ))}
        </SidebarNav>
      </AdminSidebar>

      <AdminContent>
        <PageHeader>
          <div>
            <SectionLabel>ADMIN / PEDIDOS</SectionLabel>
            <SectionTitle>Controle de Pedidos</SectionTitle>
          </div>
          <PrimaryButton onClick={carregarPedidos}>Atualizar</PrimaryButton>
        </PageHeader>

        <Table>
          <thead>
            <tr>
              <th>Pedido</th>
              <th>Cliente</th>
              <th>Status</th>
              <th>Total</th>
              <th>Data</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {pedidos.map((pedido) => (
              <tr key={pedido.id}>
                <td>#{pedido.id}</td>
                <td>{pedido.usuario.nome}</td>
                <td>
                  <select
                    aria-label={`Status do pedido #${pedido.id}`}
                    value={pedido.status}
                    onChange={(e) => alterarStatus(pedido.id, e.target.value)}
                  >
                    <option value="PENDENTE">Pendente</option>
                    <option value="PROCESSANDO">Processando</option>
                    <option value="ENVIADO">Enviado</option>
                    <option value="CONCLUIDO">Concluído</option>
                    <option value="CANCELADO">Cancelado</option>
                  </select>
                </td>
                <td>R$ {pedido.total.toFixed(2)}</td>
                <td>{new Date(pedido.criadoEm).toLocaleDateString()}</td>
                <td>
                  <button onClick={() => alert(`Detalhes do pedido #${pedido.id}`)}>
                    Ver Detalhes
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </AdminContent>
    </AdminPageContainer>
  );
}