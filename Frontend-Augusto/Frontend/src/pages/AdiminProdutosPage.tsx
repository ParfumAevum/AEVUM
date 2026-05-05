// AdiminProdutosPage.tsx
// Página administrativa para gerenciar o catálogo de produtos e estoque.
import { useState } from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { PageContainer, AdminSidebar, AdminContent, PrimaryButton } from '../components/UI';

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
  color: ${({ $active, theme }) => $active ? theme.colors.primary : theme.colors.outline};
  background: ${({ $active }) => $active ? 'rgba(212,175,55,0.06)' : 'transparent'};
  border-right: 2px solid ${({ $active, theme }) => $active ? theme.colors.primaryContainer : 'transparent'};
  transition: all 0.2s ease;

  span.material-symbols-outlined { font-size: 18px; }

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    background: rgba(212,175,55,0.04);
  }
`;

// Barra de busca para localizar produtos por nome, SKU ou característica.
const SearchBar = styled.div`
  position: relative;
  margin-bottom: 40px;

  span.icon {
    position: absolute;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
    color: ${({ theme }) => theme.colors.outline};
    font-size: 20px;
  }

  input {
    width: 100%;
    background: ${({ theme }) => theme.colors.surfaceContainerLow};
    border: none;
    border-bottom: 1px solid #1a1a1a;
    outline: none;
    padding: 18px 16px 18px 48px;
    color: ${({ theme }) => theme.colors.onSurface};
    font-family: 'Inter', sans-serif;
    font-size: 15px;
    transition: border-color 0.3s;

    &::placeholder {
      color: #333;
    }

    &:focus {
      border-bottom-color: ${({ theme }) => theme.colors.primaryContainer};
    }
  }
`;

// Filtros rápidos para alternar entre categorias e exibir estoque baixo.
const FilterTabs = styled.div`
  display: flex;
  gap: 4px;
  margin-bottom: 40px;
  flex-wrap: wrap;
`;

const Tab = styled.button<{ $active?: boolean }>`
  font-family: 'Inter', sans-serif;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 10px 20px;
  border: none;
  background: ${({ $active, theme }) => $active ? theme.colors.primaryContainer : theme.colors.surfaceContainerLow};
  color: ${({ $active, theme }) => $active ? theme.colors.onPrimary : theme.colors.outline};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.surfaceContainerHigh};
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
`;

// Cartões de produto no painel administrativo com ações de editar e deletar.
const ProductAdminCard = styled.div`
  background: ${({ theme }) => theme.colors.surfaceContainerLow};
  border: 1px solid rgba(212,175,55,0.06);
  overflow: hidden;
  transition: border-color 0.2s;

  &:hover {
    border-color: rgba(212,175,55,0.2);
  }

  .img-wrapper {
    aspect-ratio: 1;
    overflow: hidden;
    background: ${({ theme }) => theme.colors.surfaceContainerHigh};
    position: relative;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.5s ease;
    }

    .badge {
      position: absolute;
      top: 12px;
      left: 12px;
      font-family: 'Inter', sans-serif;
      font-size: 9px;
      font-weight: 600;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      padding: 4px 10px;
      background: ${({ theme }) => theme.colors.primaryContainer};
      color: ${({ theme }) => theme.colors.onPrimary};
    }
  }

  &:hover .img-wrapper img {
    transform: scale(1.04);
  }

  .card-body {
    padding: 24px;
  }

  h3 {
    font-family: 'Noto Serif', serif;
    font-size: 18px;
    color: ${({ theme }) => theme.colors.onSurface};
    margin-bottom: 4px;
  }

  .sku {
    font-family: 'Inter', sans-serif;
    font-size: 10px;
    color: ${({ theme }) => theme.colors.outline};
    letter-spacing: 0.1em;
    margin-bottom: 16px;
  }

  .price-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;

    .price {
      font-family: 'Inter', sans-serif;
      font-size: 18px;
      color: ${({ theme }) => theme.colors.primary};
    }

    .stock {
      font-family: 'Inter', sans-serif;
      font-size: 12px;
      color: ${({ theme }) => theme.colors.outline};
    }
  }

  .actions {
    display: flex;
    gap: 8px;

    button {
      flex: 1;
      font-family: 'Inter', sans-serif;
      font-size: 10px;
      font-weight: 600;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      padding: 10px;
      cursor: pointer;
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;

      span.material-symbols-outlined {
        font-size: 15px;
      }
    }

    .edit-btn {
      border: 1px solid rgba(212,175,55,0.3);
      background: transparent;
      color: ${({ theme }) => theme.colors.primaryContainer};

      &:hover {
        background: rgba(212,175,55,0.08);
      }
    }

    .delete-btn {
      border: 1px solid rgba(255,100,100,0.2);
      background: transparent;
      color: #ffb4ab;

      &:hover {
        background: rgba(255,100,100,0.08);
      }
    }
  }
`;

const navItems = [
  { to: '/admin/relatorios', icon: '', label: 'Relatórios' },
  { to: '/admin/produtos', icon: '', label: 'Produtos' },
  { to: '/admin/pedidos', icon: '', label: 'Pedidos' },
  { to: '/admin/clientes', icon: '', label: 'Clientes' },
  { to: '/home', icon: '', label: 'Ver Loja' },
];

const products = [
  { id: 1, name: "L'Obsidienne Noire", sku: 'AEV-OBN-100', price: 'R$ 285,00', stock: 48, category: 'Parfum', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAUTbQlDdvXimti3apJvKLXdr7MUQ6fmrLQHVMXWsOR-VptoLtRsPfIJrRo9LQLuKW9UcQ035eUVOKJ3i7tM-5O2jvxCnDfRvMHX4Df-ygDxgSh0DUXBDNKO7YH8_6xD6DDijRNXXrppjBACsCg8ae60i6lcyWQ2hgSMEkhiURnILiGQMOL6smzJA_Riy4Phl0VjlMl9hv-CsINmvO8vhtt8ffeiEjEatLUoJpZxaZNNOZ9B3KDxofMy7dpyiOjIPuiPO4hqr7Fw6M' },
  { id: 2, name: 'Temple of Silence', sku: 'AEV-TOS-050', price: 'R$ 310,00', stock: 32, category: 'Eau de Parfum', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC1mF4xlnT9Q_x0eXHorIJzihJlJuAV-ieOC7g9VBI5UkSC5vnWxMdnjCd5JiY1yq5E9kYsdiNb2EpTJo4xawiVeu0rvwFeTy7l_5bNv1_ABYWV35xlKYMPeuQ1dy5PClmFCkc2ZY_d34edVnD-V-64tHlbpSt7BftP5yZdtIJjlDMq45kzRnO_kb1RHZcimVnz7ijcDkd8_NaYSKv2J2DsUX86o1a-ztRfXO3JbjKjKu1zt-OMxdROdrkehmaaqUCIukGbOqXQevw' },
  { id: 3, name: 'Velvet Horizon', sku: 'AEV-VEH-100', price: 'R$ 245,00', stock: 61, category: 'Eau de Parfum', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBSxLDapIK7DMLpCJrcycO2Z6pPq9OFFkRb4JK62Ukdr8va1A6bIgRMhNKdI2oy8pSJTPc1hVicMZtRtRT6N6LDZRa6GVDh-RZzr9QBL86NF_powVE3k2eGIyev8DBo_5ZQhh-xknqOZySOJQ7jIrjL_BRV-QpjLN4HcywxAoVEGm7UIDAsQuyXEmoGx1VWo1gCA6PqxpuQyzOTFnks5f7QOwgPJcMFXusWcnAQXGb885HI0qlzbCczwAUxkRpjAl6CFHr7sBGpaDA' },
  { id: 4, name: 'Midnight Saffron', sku: 'AEV-MIS-050', price: 'R$ 187,00', stock: 14, category: 'Parfum', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCCEWabo0fzLAVT6mwzIHJ3KEEe07iBnxHmkehbVPhh9aAK-QkGcvYQ_ijA-Nye2HqXG2txREJ-gYAGnQLSL6acwcIg590yQFT-9YBWPlmfTmMXR292_YKbr9VnkeaLfkJ9gHTmc4jQ1lcCIJHwbjwoRoAGQ5OBdfZML58jf1Yh7WmnZbHNovNz_kz6T1QSd82rHoDVzHd1kFNdUx8aT7JQYa4qDr9usDUttSaDbHqcJMsqhzTFqKtMRPPVVHe79_vUWBv91jTJSUo' },
  { id: 5, name: 'Imperial Musk', sku: 'AEV-IMP-100', price: 'R$ 232,00', stock: 27, category: 'Eau de Parfum', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDziOaLM9wwnB_W_eeIMOFTEgp_N91XB3pcr36b7OFD9vDL8pbKUH3iGkjTTpfkNTS53o1xY04e1SmUKXdfj0aX4S7Xokd8mesTRrpWDsJ28nsLYuo5ELmTZKybaerbVqqHemMDe_c4ux530dmI2mRZCogVfbUJg6jHdVKkRjGQTOHjOy_aRT0srYiUOryA-xVoWi1S1l_R9jtctXb01rjgit1n35FbwLVId-lcEoUc139eqboi4u47PRVJWEXTGWOX1rTiiXF0jco' },
  { id: 6, name: 'Oceanic Amber', sku: 'AEV-OCA-050', price: 'R$ 202,00', stock: 8, category: 'Parfum', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAA2KICocmhqMHMKr_W2b7JmoagLACD4OvjMG7w7P9QPpgcGj7B6-riOgvXi57SniLS9rm6amuyq3TNrGx8E9nDaIO96GOZ8kHCllF7Inm_FocTv7F9LUpfSxRj8UT7UC3TwbcdSKJp_NqB1FqUoY5PkYbj5eFz7iLH8hH2DdXjckCaLHrR1pHixhbAzpz0CrUGOOTBHW6XNsmwdGYHD0eT7_ulvjpx7XKpK8F2LCIXQHNetdVpynDNsCEy3_QDgi3S2sPu52oQKB8' },
];

export default function AdminProdutosPage() {
  const location = useLocation();
  const [activeFilter, setActiveFilter] = useState('Todos');

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
              <span className="material-symbols-outlined">{item.icon}</span>
              {item.label}
            </NavItem>
          ))}
        </nav>
      </AdminSidebar>

      <AdminContent>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 64, flexWrap: 'wrap', gap: 24 }}>
          <div>
            <nav style={{ display: 'flex', gap: 8, marginBottom: 16, fontSize: 10, fontFamily: 'Inter', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#4d4635' }}>
              <span>Admin</span>
              <span>/</span>
              <span style={{ color: '#d4af37' }}>Produtos</span>
            </nav>
            <h2 style={{ fontFamily: 'Noto Serif', fontSize: 'clamp(28px,3vw,48px)', fontWeight: 400, color: '#e5e2e1' }}>
              Gestão de Produtos
            </h2>
          </div>
          <PrimaryButton>
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>add</span>
            NOVO PRODUTO
          </PrimaryButton>
        </header>

        <SearchBar>
          <span className="icon material-symbols-outlined">search</span>
          <input placeholder="Pesquisar por nome, SKU ou essência..." />
        </SearchBar>

        <FilterTabs>
          {['Todos', 'Parfum', 'Eau de Parfum', 'Conjuntos', 'Estoque Baixo'].map((f) => (
            <Tab key={f} $active={activeFilter === f} onClick={() => setActiveFilter(f)}>{f}</Tab>
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
                  <span className="stock" style={{ color: p.stock < 15 ? '#ffb4ab' : '#4d4635' }}>
                    {p.stock} unid.
                  </span>
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
    </PageContainer>
  );
}