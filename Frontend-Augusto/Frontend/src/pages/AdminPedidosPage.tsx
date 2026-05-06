// AdminPedidosPage.tsx
// Página administrativa para visualizar e gerenciar pedidos feitos pelos clientes.
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
  navItems,
  orders,
} from "../styles/AdminPedidoStyle";

export default function AdminPedidosPage() {
  const location = useLocation();

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
          <PrimaryButton>Atualizar status</PrimaryButton>
        </PageHeader>

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
    </AdminPageContainer>
  );
}
