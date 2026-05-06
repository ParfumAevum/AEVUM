// AdminClientesPage.tsx
// Página administrativa que exibe a base de clientes da loja.
import { useLocation } from "react-router-dom";
import { AdminSidebar, AdminContent, PrimaryButton } from "../components/UI";
import {
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
  clients,
} from "../styles/AdminClienteStyle";

//aqui serão as partes de funcionamentos conectados com o backend, como a listagem de clientes, filtros, etc.



export default function AdminClientesPage() {
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
            <SectionLabel>ADMIN / CLIENTES</SectionLabel>
            <SectionTitle>Base de Clientes</SectionTitle>
          </div>
          <PrimaryButton>Exportar lista</PrimaryButton>
        </PageHeader>

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
    </AdminPageContainer>
  );
}
