// ══════════════════════════════════════════════════════════════
// src/context/CartContext.tsx
// Contexto global do carrinho de compras.
// Persiste os itens no localStorage e expõe funções de
// adicionar, remover e limpar o carrinho.
// ══════════════════════════════════════════════════════════════

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

// ─── Tipos ──────────────────────────────────────────────────
export interface ItemCarrinho {
  id: number;
  nome: string;
  preco: number;
  imagem?: string;
  notas?: string;
  quantidade: number;
}

interface CartContextData {
  itens: ItemCarrinho[];
  totalItens: number;           // Quantidade total de produtos
  totalValor: number;           // Valor total do carrinho
  adicionarItem: (produto: Omit<ItemCarrinho, "quantidade">) => void;
  removerItem: (id: number) => void;
  alterarQuantidade: (id: number, quantidade: number) => void;
  limparCarrinho: () => void;
}

// ─── Criação do Contexto ────────────────────────────────────
const CartContext = createContext<CartContextData>({} as CartContextData);

// ─── Provider do Carrinho ────────────────────────────────────
export function CartProvider({ children }: { children: ReactNode }) {
  // Carrega os itens persistidos no localStorage
  const [itens, setItens] = useState<ItemCarrinho[]>(() => {
    const salvo = localStorage.getItem("@aevum:carrinho");
    return salvo ? JSON.parse(salvo) : [];
  });

  // Persiste no localStorage sempre que o carrinho mudar
  useEffect(() => {
    localStorage.setItem("@aevum:carrinho", JSON.stringify(itens));
  }, [itens]);

  // ─── Adicionar Item ───────────────────────────────────────
  // Se o produto já está no carrinho, incrementa a quantidade.
  function adicionarItem(produto: Omit<ItemCarrinho, "quantidade">) {
    setItens((prev) => {
      const existente = prev.find((i) => i.id === produto.id);
      if (existente) {
        return prev.map((i) =>
          i.id === produto.id ? { ...i, quantidade: i.quantidade + 1 } : i
        );
      }
      return [...prev, { ...produto, quantidade: 1 }];
    });
  }

  // ─── Remover Item ─────────────────────────────────────────
  // Remove o produto do carrinho pelo ID.
  function removerItem(id: number) {
    setItens((prev) => prev.filter((i) => i.id !== id));
  }

  // ─── Alterar Quantidade ───────────────────────────────────
  // Se a quantidade for 0, remove o item do carrinho.
  function alterarQuantidade(id: number, quantidade: number) {
    if (quantidade <= 0) {
      removerItem(id);
      return;
    }
    setItens((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantidade } : i))
    );
  }

  // ─── Limpar Carrinho ─────────────────────────────────────
  // Remove todos os itens do carrinho.
  function limparCarrinho() {
    setItens([]);
  }

  // Calculos derivados do carrinho
  const totalItens = itens.reduce((acc, i) => acc + i.quantidade, 0);
  const totalValor = itens.reduce((acc, i) => acc + i.preco * i.quantidade, 0);

  return (
    <CartContext.Provider
      value={{
        itens,
        totalItens,
        totalValor,
        adicionarItem,
        removerItem,
        alterarQuantidade,
        limparCarrinho,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// ─── Hook do Carrinho ────────────────────────────────────────
export function useCart() {
  return useContext(CartContext);
}