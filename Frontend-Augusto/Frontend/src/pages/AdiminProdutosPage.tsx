// AdiminProdutosPage.tsx
// Página administrativa para gerenciar o catálogo de produtos e estoque.
import { useState } from "react";
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
  BreadcrumbNav,
  PageTitle,
  ButtonIcon,
  SearchBar,
  FilterTabs,
  Tab,
  ProductGrid,
  ProductAdminCard,
  StockText,
  navItems,
  products,
} from "../styles/AdminProdutoStyle";

export default function AdminProdutosPage() {
  const location = useLocation();
  const [activeFilter, setActiveFilter] = useState("Todos");

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
      </AdminSidebar>

      <AdminContent>
        <PageHeader>
          <div>
            <BreadcrumbNav>
              <span>Admin</span>
              <span>/</span>
              <span>Produtos</span>
            </BreadcrumbNav>
            <PageTitle>Gestão de Produtos</PageTitle>
          </div>
          <PrimaryButton>
            <ButtonIcon className="material-symbols-outlined">add</ButtonIcon>
            NOVO PRODUTO
          </PrimaryButton>
        </PageHeader>

        <SearchBar>
          <span className="icon material-symbols-outlined">search</span>
          <input placeholder="Pesquisar por nome, SKU ou essência..." />
        </SearchBar>

        <FilterTabs>
          {[
            "Todos",
            "Parfum",
            "Eau de Parfum",
            "Conjuntos",
            "Estoque Baixo",
          ].map((f) => (
            <Tab
              key={f}
              $active={activeFilter === f}
              onClick={() => setActiveFilter(f)}
            >
              {f}
            </Tab>
          ))}
        </FilterTabs>

        <ProductGrid>
          {products.map((p) => (
            <ProductAdminCard key={p.id}>
              <div className="img-wrapper">
                <img src={p.img} alt={p.name} />
                <span className="badge">{p.category}</span>
              </div>
              <div className="card-body">
                <h3>{p.name}</h3>
                <p className="sku">SKU: {p.sku}</p>
                <div className="price-row">
                  <span className="price">{p.price}</span>
                  <StockText $low={p.stock < 15}>{p.stock} unid.</StockText>
                </div>
                <div className="actions">
                  <button className="edit-btn">
                    <span className="material-symbols-outlined">edit</span>
                    Editar
                  </button>
                  <button className="delete-btn">
                    <span className="material-symbols-outlined">delete</span>
                  </button>
                </div>
              </div>
            </ProductAdminCard>
          ))}
        </ProductGrid>
      </AdminContent>
    </AdminPageContainer>
  );
}
