// ══════════════════════════════════════════════════════════════
// src/styles/CatalogoStyle.tsx
// Estilos da Página de Catálogo de Perfumes.
// Layout de duas colunas: sidebar de filtros + grid de produtos.
// Design seguindo o sistema visual AEVUM (dark luxury editorial).
// ══════════════════════════════════════════════════════════════

import styled from "styled-components";

// ─── Layout Principal do Catálogo ─────────────────────────────
// Grid de duas colunas: sidebar (filtros) + área de produtos.
export const CatalogoLayout = styled.div`
  display: grid;
  grid-template-columns: 260px 1fr;
  gap: 48px;
  padding: 128px 48px 96px;
  min-height: 100vh;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    padding: 96px 24px 64px;
  }
`;

// ─── Sidebar de Filtros ───────────────────────────────────────
// Coluna esquerda com filtros de perfil olfativo, intensidade e coleção.
export const FilterSidebar = styled.aside`
  position: sticky;
  top: 100px;
  height: fit-content;

  @media (max-width: 1024px) {
    position: static;
  }
`;

// ─── Hero da Página ───────────────────────────────────────────
// Cabeçalho da página com título editorial e barra de busca.
export const CatalogoHero = styled.div`
  margin-bottom: 48px;

  .label {
    font-family: "Inter", sans-serif;
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.outlineVariant};
    display: block;
    margin-bottom: 12px;
  }

  h1 {
    font-family: "Noto Serif", serif;
    font-size: clamp(36px, 5vw, 64px);
    font-weight: 300;
    line-height: 1.1;
    color: ${({ theme }) => theme.colors.onSurface};
    margin-bottom: 32px;
  }
`;

// ─── Barra de Busca ───────────────────────────────────────────
// Campo de busca por nome ou nota olfativa.
export const SearchInput = styled.div`
  position: relative;
  max-width: 480px;

  svg {
    position: absolute;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
    color: ${({ theme }) => theme.colors.outline};
    width: 18px;
    height: 18px;
  }

  input {
    width: 100%;
    background: ${({ theme }) => theme.colors.surfaceContainerLow};
    border: 1px solid rgba(212, 175, 55, 0.1);
    border-radius: 0;
    outline: none;
    padding: 14px 16px 14px 44px;
    color: ${({ theme }) => theme.colors.onSurface};
    font-family: "Inter", sans-serif;
    font-size: 14px;
    letter-spacing: 0.04em;
    transition: border-color 0.3s;

    &::placeholder {
      color: ${({ theme }) => theme.colors.outline};
      font-size: 13px;
    }

    &:focus {
      border-color: rgba(212, 175, 55, 0.4);
    }
  }
`;

// ─── Grupo de Filtros ─────────────────────────────────────────
// Seção individual de filtros (ex: "Perfil Olfativo").
export const FilterGroup = styled.div`
  margin-bottom: 40px;

  h4 {
    font-family: "Inter", sans-serif;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.outline};
    margin-bottom: 16px;
    padding-bottom: 12px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.04);
  }
`;

export const FilterFields = styled.div`
  display: grid;
  gap: 10px;

  select.filter-select {
    width: 100%;
    margin-top: 8px;
    padding: 10px;
    border-radius: 0;
    border: 1px solid rgba(255, 255, 255, 0.12);
    background: transparent;
    color: ${({ theme }) => theme.colors.onSurface};
    font-family: "Inter", sans-serif;
    font-size: 13px;
    outline: none;
    appearance: none;

    option {
      background: ${({ theme }) => theme.colors.surfaceContainerLow};
      color: ${({ theme }) => theme.colors.onSurface};
    }
  }
`;

// ─── Item de Filtro Checkbox ──────────────────────────────────
// Linha de filtro com checkbox e label.
export const FilterItem = styled.label<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  margin-bottom: 10px;
  font-family: "Inter", sans-serif;
  font-size: 13px;
  color: ${({ $active, theme }) =>
    $active ? theme.colors.primary : theme.colors.onSurfaceVariant};
  transition: color 0.2s;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }

  input[type="checkbox"] {
    width: 14px;
    height: 14px;
    accent-color: ${({ theme }) => theme.colors.primaryContainer};
    cursor: pointer;
  }
`;

// ─── Tags de Coleção ─────────────────────────────────────────
// Botões compactos para filtrar por coleção (Noturna, Orbis, Essentia).
export const CollectionTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

export const CollectionTag = styled.button<{ $active?: boolean }>`
  font-family: "Inter", sans-serif;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 6px 14px;
  border: 1px solid
    ${({ $active, theme }) =>
      $active ? theme.colors.primaryContainer : "rgba(255,255,255,0.08)"};
  background: ${({ $active }) =>
    $active ? "rgba(212,175,55,0.08)" : "transparent"};
  color: ${({ $active, theme }) =>
    $active ? theme.colors.primaryContainer : theme.colors.outline};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: rgba(212, 175, 55, 0.4);
    color: ${({ theme }) => theme.colors.primaryContainer};
  }
`;

// ─── Área de Resultados ───────────────────────────────────────
// Coluna direita com o grid de produtos e informações de resultado.
export const ResultsArea = styled.div``;

// ─── Barra de Resultados ──────────────────────────────────────
// Linha com contagem de resultados e opções de ordenação.
export const ResultsBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
  flex-wrap: wrap;
  gap: 16px;

  p {
    font-family: "Inter", sans-serif;
    font-size: 13px;
    color: ${({ theme }) => theme.colors.outline};
  }

  select.sort-select {
    font-family: "Inter", sans-serif;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    background: transparent;
    border: 1px solid rgba(255, 255, 255, 0.08);
    color: ${({ theme }) => theme.colors.outline};
    padding: 8px 16px;
    cursor: pointer;
    outline: none;

    option {
      background: ${({ theme }) => theme.colors.surfaceContainerLow};
      color: ${({ theme }) => theme.colors.onSurface};
    }
  }
`;

// ─── Grid de Produtos do Catálogo ─────────────────────────────
// Layout em grid responsivo que organiza os cards de perfumes.
export const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;

  @media (max-width: 1280px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

// ─── Card de Produto ─────────────────────────────────────────
// Card individual de um perfume com imagem, nome, notas e botões de ação.
export const ProductCard = styled.article`
  background: ${({ theme }) => theme.colors.surfaceContainerLow};
  border: 1px solid rgba(212, 175, 55, 0.06);
  overflow: hidden;
  transition: border-color 0.3s ease, transform 0.3s ease;

  &:hover {
    border-color: rgba(212, 175, 55, 0.2);
    transform: translateY(-4px);
  }

  /* Wrapper da imagem do produto */
  .img-wrapper {
    position: relative;
    aspect-ratio: 1;
    overflow: hidden;
    background: ${({ theme }) => theme.colors.surfaceContainerHigh};

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.5s ease;
    }

    /* Badge de categoria no canto superior esquerdo */
    .badge {
      position: absolute;
      top: 12px;
      left: 12px;
      font-family: "Inter", sans-serif;
      font-size: 9px;
      font-weight: 600;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      padding: 4px 10px;
      background: ${({ theme }) => theme.colors.primaryContainer};
      color: ${({ theme }) => theme.colors.onPrimary};
      z-index: 2;
    }

    /* Badge de estoque baixo */
    .badge-low {
      position: absolute;
      top: 12px;
      right: 12px;
      font-family: "Inter", sans-serif;
      font-size: 9px;
      font-weight: 600;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      padding: 4px 10px;
      background: rgba(255, 180, 171, 0.15);
      border: 1px solid rgba(255, 180, 171, 0.3);
      color: #ffb4ab;
      z-index: 2;
    }
  }

  /* Efeito de zoom na imagem ao hover */
  &:hover .img-wrapper img {
    transform: scale(1.06);
  }

  /* Corpo do card com informações do produto */
  .card-body {
    padding: 24px;
  }

  /* Preço do produto em dourado */
  .price {
    font-family: "Inter", sans-serif;
    font-size: 22px;
    color: ${({ theme }) => theme.colors.primary};
    font-weight: 400;
    margin-bottom: 4px;
  }

  /* Nome do produto */
  h3 {
    font-family: "Noto Serif", serif;
    font-size: 18px;
    color: ${({ theme }) => theme.colors.onSurface};
    margin-bottom: 6px;
    font-weight: 400;
  }

  /* Notas olfativas */
  .notes {
    font-family: "Inter", sans-serif;
    font-size: 11px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.outline};
    margin-bottom: 20px;
    line-height: 1.4;
  }
`;

// ─── Área de Ações do Card ────────────────────────────────────
// Linha com botões "Adicionar ao Carrinho" e "Comprar Agora".
export const CardActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  /* Botão secundário: Adicionar ao Carrinho */
  .btn-carrinho {
    width: 100%;
    font-family: "Inter", sans-serif;
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    padding: 12px;
    border: 1px solid rgba(212, 175, 55, 0.3);
    background: transparent;
    color: ${({ theme }) => theme.colors.primaryContainer};
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background: rgba(212, 175, 55, 0.08);
    }

    &:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }
  }

  /* Botão primário: Comprar Agora */
  .btn-comprar {
    width: 100%;
    font-family: "Inter", sans-serif;
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    padding: 12px;
    border: none;
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.onPrimary};
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background: ${({ theme }) => theme.colors.primaryContainer};
    }

    &:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }
  }
`;

// ─── Estado Vazio ─────────────────────────────────────────────
// Exibido quando nenhum produto é encontrado com os filtros aplicados.
export const EmptyState = styled.div`
  text-align: center;
  padding: 80px 24px;
  grid-column: 1 / -1;

  p {
    font-family: "Noto Serif", serif;
    font-size: 24px;
    color: ${({ theme }) => theme.colors.outline};
    margin-bottom: 8px;
  }

  span {
    font-family: "Inter", sans-serif;
    font-size: 14px;
    color: ${({ theme }) => theme.colors.outlineVariant};
  }
`;

// ─── Skeleton de Loading ──────────────────────────────────────
// Placeholder animado enquanto os produtos carregam.
export const SkeletonCard = styled.div`
  background: ${({ theme }) => theme.colors.surfaceContainerLow};
  border: 1px solid rgba(212, 175, 55, 0.06);
  overflow: hidden;

  .skeleton-img {
    aspect-ratio: 1;
    background: linear-gradient(
      90deg,
      ${({ theme }) => theme.colors.surfaceContainerHigh} 25%,
      ${({ theme }) => theme.colors.surfaceContainer} 50%,
      ${({ theme }) => theme.colors.surfaceContainerHigh} 75%
    );
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
  }

  .skeleton-body {
    padding: 24px;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .skeleton-line {
    width: 100%;
    height: 12px;
    background: linear-gradient(
      90deg,
      ${({ theme }) => theme.colors.surfaceContainerHigh} 25%,
      ${({ theme }) => theme.colors.surfaceContainer} 50%,
      ${({ theme }) => theme.colors.surfaceContainerHigh} 75%
    );
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
  }

  .skeleton-line.short {
    width: 65%;
  }

  .skeleton-line.medium {
    width: 45%;
  }

  .skeleton-line.tall {
    width: 80%;
    height: 100px;
  }

  @keyframes shimmer {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }
`;