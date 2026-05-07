// ═══════════════════════════════════════════════════════════════════════════════════════════════════
// CadastroStyle.tsx - Estilos da Página de Cadastro
// ═══════════════════════════════════════════════════════════════════════════════════════════════════
// Este arquivo contém todos os componentes estilizados para a página de criação de conta.
// Inclui layout centralizado com imagem de fundo, formulário de registro e campos de entrada.
// ═══════════════════════════════════════════════════════════════════════════════════════════════════
import styled from "styled-components";

// ─── Container Principal do Cadastro ────────────────────────────────────────────────────────────────
// Wrapper principal que envolve toda a página de cadastro com layout flexível e centralizado.
export const Wrapper = styled.div`
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
`;

// ─── Imagem de Fundo ────────────────────────────────────────────────────────────────────────────────
// Camada de imagem de fundo com gradient overlay para melhorar a legibilidade do conteúdo.
export const BgImage = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.4;
    mix-blend-mode: luminosity;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(19,19,19,0) 0%, rgba(19,19,19,0.95) 100%);
  }
`;

// ─── Header da Página ───────────────────────────────────────────────────────────────────────────────
// Header fixo no topo que geralmente contém logo ou navegação.
export const Header = styled.header`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 50;
  padding: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const EditorialQuote = styled.div`
  display: none;
  position: fixed;
  bottom: 96px;
  left: 96px;
  z-index: 10;
  max-width: 420px;
  pointer-events: none;
  opacity: 0.5;

  @media (min-width: 1536px) {
    display: block;
  }
`;

// Card principal do formulário de cadastro com vidro fosco e borda suave.
export const FormCard = styled.section`
  position: relative;
  z-index: 20;
  width: 100%;
  max-width: 768px;
  margin: 160px auto 48px;
  padding: 64px 48px;
  background: rgba(19, 19, 19, 0.8);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(53, 53, 52, 0.4);
`;

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 32px 48px;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

export const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  min-height: 84px;
`;

export const CheckRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  input[type="checkbox"] {
    width: 16px;
    height: 16px;
    border-radius: 0;
    border: 1px solid ${({ theme }) => theme.colors.outline};
    background: transparent;
    cursor: pointer;
    accent-color: ${({ theme }) => theme.colors.primaryContainer};
  }

  label {
    font-family: 'Inter', sans-serif;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.outline};
    cursor: pointer;
  }
`;

export const FormFooter = styled.div`
  padding-top: 40px;
  border-top: 1px solid rgba(53, 53, 52, 0.4);
  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
    font-family: 'Inter', sans-serif;
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.outline};
  }

  .icons {
    display: flex;
    gap: 24px;
    color: ${({ theme }) => theme.colors.outline};

    span.material-symbols-outlined {
      cursor: pointer;
      transition: color 0.3s ease;

      &:hover {
        color: ${({ theme }) => theme.colors.primary};
      }
    }
  }
`;