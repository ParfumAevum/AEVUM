import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import Navbar from "./Navbar";
import {
  CatalogoLayout,
  FilterSidebar,
  CatalogoHero,
  SearchInput,
  FilterGroup,
  FilterFields,
  FilterItem,
  CollectionTags,
  CollectionTag,
  ResultsArea,
  ResultsBar,
  ProductGrid,
  ProductCard,
  CardActions,
  EmptyState,
  SkeletonCard,
} from "../styles/CatalogoStyle";

interface Produto {
  id: number;
  nome: string;
  descricao?: string;
  notas?: string;
  preco: number;
  estoque: number;
  imagem?: string;
  categoria?: {
    nome: string;
  };
}

const colecoes = ["Todos", "Nocturna", "Orbis", "Essentia"];
const perfis = [
  { label: "Amadeirado", termo: "Sândalo" },
  { label: "Oriental", termo: "Âmbar" },
  { label: "Cítrico Noir", termo: "Cítrico" },
];
const intensidades = ["Discreta", "Marcante", "Absoluta"];
const placeholderImage =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='640' height='640' viewBox='0 0 640 640'%3E%3Crect width='640' height='640' fill='%230b0b0b'/%3E%3Ctext x='50%25' y='50%25' fill='%23d4af37' font-family='Inter,Arial,sans-serif' font-size='28' text-anchor='middle' dominant-baseline='middle'%3EAEVUM%3C/text%3E%3C/svg%3E";

export default function CatalogoPage() {
  const { adicionarItem } = useCart();
  const { logado } = useAuth();
  const navigate = useNavigate();

  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [categorias, setCategorias] = useState<string[]>([]);
  const [busca, setBusca] = useState("");
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("Todos");
  const [colecaoSelecionada, setColecaoSelecionada] = useState("Todos");
  const [perfilSelecionado, setPerfilSelecionado] = useState<string[]>([]);
  const [intensidadeSelecionada, setIntensidadeSelecionada] = useState<string[]>([]);
  const [ordenacao, setOrdenacao] = useState("precoDesc");
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    async function carregarCategorias() {
      try {
        const categoriasResp = await api.get<{ nome: string }[]>("/categorias");
        setCategorias(["Todos", ...(categoriasResp.data.map((c) => c.nome) ?? [])]);
      } catch (err) {
        console.error(err);
      }
    }

    carregarCategorias();
  }, []);

  useEffect(() => {
    async function carregarProdutos() {
      try {
        setCarregando(true);
        setErro(null);

        const params: Record<string, string | undefined> = {
          busca: busca.trim() || undefined,
          categoria: categoriaSelecionada !== "Todos" ? categoriaSelecionada : undefined,
        };

        const produtosResp = await api.get<Produto[]>("/produtos", { params });
        setProdutos(produtosResp.data);
      } catch (err) {
        setErro((err as Error).message || "Não foi possível carregar o catálogo.");
      } finally {
        setCarregando(false);
      }
    }

    carregarProdutos();
  }, [busca, categoriaSelecionada]);

  const produtosFiltrados = useMemo(() => {
    return produtos
      .filter((produto) => {
        if (categoriaSelecionada !== "Todos" && produto.categoria?.nome !== categoriaSelecionada) {
          return false;
        }

        if (busca.trim()) {
          const termo = busca.toLowerCase();
          const nomeMatch = produto.nome.toLowerCase().includes(termo);
          const notasMatch = produto.notas?.toLowerCase().includes(termo);
          const descricaoMatch = produto.descricao?.toLowerCase().includes(termo);
          if (!nomeMatch && !notasMatch && !descricaoMatch) return false;
        }

        if (colecaoSelecionada !== "Todos") {
          const tag = produto.nome.toLowerCase();
          if (!tag.includes(colecaoSelecionada.toLowerCase())) return false;
        }

        if (perfilSelecionado.length > 0) {
          const score = perfilSelecionado.some((perfil) =>
            produto.notas?.toLowerCase().includes(perfis.find((p) => p.label === perfil)?.termo.toLowerCase() ?? "")
          );
          if (!score) return false;
        }

        if (intensidadeSelecionada.length > 0) {
          const texto = `${produto.nome} ${produto.descricao ?? ""} ${produto.notas ?? ""}`.toLowerCase();
          const match = intensidadeSelecionada.some((item) => texto.includes(item.toLowerCase()));
          if (!match) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (ordenacao === "precoAsc") return a.preco - b.preco;
        if (ordenacao === "precoDesc") return b.preco - a.preco;
        return a.nome.localeCompare(b.nome);
      });
  }, [produtos, busca, categoriaSelecionada, colecaoSelecionada, perfilSelecionado, intensidadeSelecionada, ordenacao]);

  function alternarFiltroPerfil(label: string) {
    setPerfilSelecionado((prev) =>
      prev.includes(label) ? prev.filter((item) => item !== label) : [...prev, label]
    );
  }

  function alternarFiltroIntensidade(label: string) {
    setIntensidadeSelecionada((prev) =>
      prev.includes(label) ? prev.filter((item) => item !== label) : [...prev, label]
    );
  }

  function handleAddCarrinho(produto: Produto) {
    adicionarItem({ id: produto.id, nome: produto.nome, preco: produto.preco, imagem: produto.imagem, notas: produto.notas });
    alert("Adicionado ao carrinho de compras!");
  }

  function handleComprarAgora(produto: Produto) {
    handleAddCarrinho(produto);
    if (!logado) {
      navigate("/login");
    } else {
      navigate("/finalizar-compra");
    }
  }

  return (
    <>
      <Navbar />
      <CatalogoLayout>
      <FilterSidebar>
        <CatalogoHero>
          <span className="label">Alquimia & Obsidiana</span>
          <h1>Fragrâncias de Prestígio</h1>
          <SearchInput>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C8.01 14 6 11.99 6 9.5S8.01 5 10.5 5 15 7.01 15 9.5 12.99 14 10.5 14z" />
            </svg>
            <input
              aria-label="Buscar por nome, notas ou aroma"
              value={busca}
              onChange={(event) => setBusca(event.target.value)}
              placeholder="Buscar por nome, notas ou aroma"
            />
          </SearchInput>
        </CatalogoHero>

        <FilterGroup>
          <h4>Filtros</h4>
          <FilterFields>
            <label htmlFor="categoria-seletor">Categoria</label>
            <select
              id="categoria-seletor"
              className="filter-select"
              aria-label="Categoria"
              title="Categoria"
              value={categoriaSelecionada}
              onChange={(event) => setCategoriaSelecionada(event.target.value)}
            >
              {categorias.map((categoria) => (
                <option key={categoria} value={categoria}>
                  {categoria}
                </option>
              ))}
            </select>
          </FilterFields>
        </FilterGroup>

        <FilterGroup>
          <h4>Perfil Olfativo</h4>
          {perfis.map((filtro) => (
            <FilterItem key={filtro.label} $active={perfilSelecionado.includes(filtro.label)}>
              <input
                title={filtro.label}
                type="checkbox"
                checked={perfilSelecionado.includes(filtro.label)}
                onChange={() => alternarFiltroPerfil(filtro.label)}
              />
              {filtro.label}
            </FilterItem>
          ))}
        </FilterGroup>

        <FilterGroup>
          <h4>Intensidade</h4>
          {intensidades.map((label) => (
            <FilterItem key={label} $active={intensidadeSelecionada.includes(label)}>
              <input
                title={label}
                type="checkbox"
                checked={intensidadeSelecionada.includes(label)}
                onChange={() => alternarFiltroIntensidade(label)}
              />
              {label}
            </FilterItem>
          ))}
        </FilterGroup>

        <FilterGroup>
          <h4>Coleção</h4>
          <CollectionTags>
            {colecoes.map((colecao) => (
              <CollectionTag
                key={colecao}
                type="button"
                $active={colecaoSelecionada === colecao}
                onClick={() => setColecaoSelecionada(colecao)}
              >
                {colecao}
              </CollectionTag>
            ))}
          </CollectionTags>
        </FilterGroup>
      </FilterSidebar>

      <ResultsArea>
        <ResultsBar>
          <p>{produtosFiltrados.length} fragrâncias encontradas</p>
          <select
            className="sort-select"
            title="Ordenar produtos"
            aria-label="Ordenar produtos"
            value={ordenacao}
            onChange={(event) => setOrdenacao(event.target.value)}
          >
            <option value="precoDesc">Mais caro primeiro</option>
            <option value="precoAsc">Mais barato primeiro</option>
            <option value="nome">Ordenar por nome</option>
          </select>
        </ResultsBar>

        {erro ? (
          <EmptyState>
            <p>Erro ao carregar os produtos.</p>
            <span>{erro}</span>
          </EmptyState>
        ) : carregando ? (
          <ProductGrid>
            {Array.from({ length: 6 }).map((_, index) => (
              <SkeletonCard key={index}>
                <div className="skeleton-img" />
                <div className="skeleton-body">
                  <div className="skeleton-line short" />
                  <div className="skeleton-line medium" />
                  <div className="skeleton-line tall" />
                </div>
              </SkeletonCard>
            ))}
          </ProductGrid>
        ) : produtosFiltrados.length === 0 ? (
          <EmptyState>
            <p>Nenhum perfume encontrado.</p>
            <span>Experimente outro filtro ou palavra-chave.</span>
          </EmptyState>
        ) : (
          <ProductGrid>
            {produtosFiltrados.map((produto) => (
              <ProductCard key={produto.id}>
                <div className="img-wrapper">
                  <img
                    src={produto.imagem || placeholderImage}
                    alt={produto.nome}
                    onError={(event) => {
                      (event.currentTarget as HTMLImageElement).src = placeholderImage;
                    }}
                  />
                  {produto.categoria?.nome && <span className="badge">{produto.categoria.nome}</span>}
                  {produto.estoque <= 10 && <span className="badge-low">Estoque baixo</span>}
                </div>
                <div className="card-body">
                  <p className="price">R$ {produto.preco.toFixed(2)}</p>
                  <h3>{produto.nome}</h3>
                  <p className="notes">{produto.notas ?? "Notas não informadas"}</p>
                  <CardActions>
                    <button className="btn-carrinho" type="button" onClick={() => handleAddCarrinho(produto)}>
                      Adicionar ao carrinho
                    </button>
                    <button className="btn-comprar" type="button" onClick={() => handleComprarAgora(produto)}>
                      Comprar agora
                    </button>
                  </CardActions>
                </div>
              </ProductCard>
            ))}
          </ProductGrid>
        )}
      </ResultsArea>
    </CatalogoLayout>
    </>
  );
}
