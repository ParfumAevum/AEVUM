// AdiminProdutosPage.tsx
// Página administrativa para gerenciar o catálogo de produtos e estoque.
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  AdminSidebar,
  AdminContent,
  PrimaryButton,
  GhostButton,
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
  ModalOverlay,
  ModalContainer,
  ModalActions,
} from "../styles/AdminProdutoStyle";
import { api } from "../services/api";

interface Produto {
  id: number;
  nome: string;
  sku: string;
  preco: number;
  estoque: number;
  categoria?: { nome: string };
  imagem?: string;
}

const navItems = [
  { to: "/admin/relatorios", icon: "", label: "Relatórios" },
  { to: "/admin/produtos", icon: "", label: "Produtos" },
  { to: "/admin/pedidos", icon: "", label: "Pedidos" },
  { to: "/admin/clientes", icon: "", label: "Clientes" },
  { to: "/home", icon: "", label: "Ver Loja" },
];

export default function AdminProdutosPage() {
  const location = useLocation();
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("Todos");
  const [busca, setBusca] = useState("");
  const [editingProduct, setEditingProduct] = useState<Produto | null>(null);
  const [editForm, setEditForm] = useState({
    nome: "",
    sku: "",
    preco: "",
    estoque: "",
    categoriaId: "",
  });
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createForm, setCreateForm] = useState({
    nome: "",
    sku: "",
    preco: "",
    estoque: "",
    imagem: "",
    descricao: "",
    notas: "",
  });

  useEffect(() => {
    carregarProdutos();
  }, [activeFilter, busca]);

  async function carregarProdutos() {
    try {
      const params = new URLSearchParams();
      if (activeFilter !== "Todos") params.append("categoria", activeFilter);
      if (busca) params.append("busca", busca);
      const response = await api.get(`/produtos?${params}`);
      setProdutos(response.data);
    } catch (err) {
      console.error("Erro ao carregar produtos:", err);
      alert("Erro ao carregar produtos.");
    } finally {
      setLoading(false);
    }
  }

  async function excluirProduto(id: number) {
    if (!confirm("Tem certeza que deseja excluir este produto?")) return;
    try {
      await api.delete(`/produtos/${id}`);
      setProdutos(produtos.filter(p => p.id !== id));
      alert("Produto excluído com sucesso.");
    } catch (err: any) {
      alert(err.message || "Erro ao excluir produto.");
    }
  }

  function abrirEdicao(produto: Produto) {
    setEditingProduct(produto);
    setEditForm({
      nome: produto.nome,
      sku: produto.sku,
      preco: produto.preco.toString(),
      estoque: produto.estoque.toString(),
      categoriaId: produto.categoria?.nome || "",
    });
  }

  async function salvarEdicao() {
    if (!editingProduct) return;
    try {
      const data = {
        nome: editForm.nome,
        sku: editForm.sku,
        preco: parseFloat(editForm.preco),
        estoque: parseInt(editForm.estoque),
      };
      const response = await api.put(`/produtos/${editingProduct.id}`, data);
      setProdutos(produtos.map(p => p.id === editingProduct.id ? response.data : p));
      setEditingProduct(null);
      alert("Produto atualizado com sucesso.");
    } catch (err: any) {
      alert(err.message || "Erro ao atualizar produto.");
    }
  }

  function abrirNovoProduto() {
    setCreateForm({ nome: "", sku: "", preco: "", estoque: "", imagem: "", descricao: "", notas: "" });
    setShowCreateModal(true);
  }

  function fecharNovoProduto() {
    setShowCreateModal(false);
  }

  async function criarProduto() {
    if (!createForm.nome || !createForm.sku || !createForm.preco) {
      alert("Nome, SKU e preço são obrigatórios.");
      return;
    }

    try {
      const data = {
        nome: createForm.nome,
        sku: createForm.sku,
        preco: parseFloat(createForm.preco),
        estoque: parseInt(createForm.estoque) || 0,
        imagem: createForm.imagem || undefined,
        descricao: createForm.descricao || undefined,
        notas: createForm.notas || undefined,
      };

      const response = await api.post("/produtos", data);
      setProdutos([response.data, ...produtos]);
      setShowCreateModal(false);
      alert("Produto criado com sucesso.");
    } catch (err: any) {
      alert(err.message || "Erro ao criar produto.");
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
          <PrimaryButton onClick={abrirNovoProduto}>
            <ButtonIcon className="material-symbols-outlined">NOVO PRODUTO</ButtonIcon>
          </PrimaryButton>
        </PageHeader>

        <SearchBar>
          <span className="icon material-symbols-outlined"></span>
          <input
            placeholder="Pesquisar por nome, SKU ou essência..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
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
          {produtos.map((p) => (
            <ProductAdminCard key={p.id}>
              <div className="img-wrapper">
                <img src={p.imagem || "placeholder.jpg"} alt={p.nome} />
                <span className="badge">{p.categoria?.nome || "Sem categoria"}</span>
              </div>
              <div className="card-body">
                <h3>{p.nome}</h3>
                <p className="sku">SKU: {p.sku}</p>
                <div className="price-row">
                  <span className="price">R$ {p.preco.toFixed(2)}</span>
                  <StockText $low={p.estoque < 15}>{p.estoque} unid.</StockText>
                </div>
                <div className="actions">
                  <button className="edit-btn" onClick={() => abrirEdicao(p)}>
                    <span className="material-symbols-outlined">Editar</span>
                  </button>
                  <button className="delete-btn" onClick={() => excluirProduto(p.id)}>
                    <span className="material-symbols-outlined">delete</span>
                  </button>
                </div>
              </div>
            </ProductAdminCard>
          ))}
        </ProductGrid>

        {editingProduct && (
          <ModalOverlay>
            <ModalContainer>
              <h3>Editar Produto</h3>
              <label>
                Nome:
                <input type="text" value={editForm.nome} onChange={(e) => setEditForm({ ...editForm, nome: e.target.value })} />
              </label>
              <label>
                SKU:
                <input type="text" value={editForm.sku} onChange={(e) => setEditForm({ ...editForm, sku: e.target.value })} />
              </label>
              <label>
                Preço:
                <input type="number" value={editForm.preco} onChange={(e) => setEditForm({ ...editForm, preco: e.target.value })} />
              </label>
              <label>
                Estoque:
                <input type="number" value={editForm.estoque} onChange={(e) => setEditForm({ ...editForm, estoque: e.target.value })} />
              </label>
              <ModalActions>
                <PrimaryButton onClick={salvarEdicao}>Salvar</PrimaryButton>
                <GhostButton onClick={() => setEditingProduct(null)}>Cancelar</GhostButton>
              </ModalActions>
            </ModalContainer>
          </ModalOverlay>
        )}
        {showCreateModal && (
          <ModalOverlay>
            <ModalContainer>
              <h3>Novo Produto</h3>
              <label>
                Nome:
                <input type="text" value={createForm.nome} onChange={(e) => setCreateForm({ ...createForm, nome: e.target.value })} />
              </label>
              <label>
                SKU:
                <input type="text" value={createForm.sku} onChange={(e) => setCreateForm({ ...createForm, sku: e.target.value })} />
              </label>
              <label>
                Preço:
                <input type="number" value={createForm.preco} onChange={(e) => setCreateForm({ ...createForm, preco: e.target.value })} />
              </label>
              <label>
                Estoque:
                <input type="number" value={createForm.estoque} onChange={(e) => setCreateForm({ ...createForm, estoque: e.target.value })} />
              </label>
              <label>
                Imagem URL:
                <input type="text" value={createForm.imagem} onChange={(e) => setCreateForm({ ...createForm, imagem: e.target.value })} />
              </label>
              <label>
                Descrição:
                <input type="text" value={createForm.descricao} onChange={(e) => setCreateForm({ ...createForm, descricao: e.target.value })} />
              </label>
              <label>
                Notas:
                <input type="text" value={createForm.notas} onChange={(e) => setCreateForm({ ...createForm, notas: e.target.value })} />
              </label>
              <ModalActions>
                <PrimaryButton onClick={criarProduto}>Criar</PrimaryButton>
                <GhostButton onClick={fecharNovoProduto}>Cancelar</GhostButton>
              </ModalActions>
            </ModalContainer>
          </ModalOverlay>
        )}
      </AdminContent>
    </AdminPageContainer>
  );
}