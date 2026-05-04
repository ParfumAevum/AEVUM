import styled from 'styled-components';

// ─── Typography ────────────────────────────────────────────────────────────────

export const DisplayXL = styled.h1`
  font-family: 'Noto Serif', serif;
  font-size: clamp(54px, 6vw, 96px); /* Tamanho de fonte maior */
  font-weight: 300;
  line-height: 1.1;
  letter-spacing: -0.02em;
  color: ${({ theme }) => theme.colors.onSurface};
`;

export const HeadlineLg = styled.h2`
  font-family: 'Noto Serif', serif;
  font-size: clamp(36px, 4vw, 54px); /* Tamanho de fonte maior */
  font-weight: 400;
  line-height: 1.2;
  color: ${({ theme }) => theme.colors.onSurface};
`;

export const HeadlineMd = styled.h3`
  font-family: 'Noto Serif', serif;
  font-size: clamp(28px, 2.5vw, 36px); /* Tamanho de fonte maior */
  font-weight: 400;
  line-height: 1.3;
  color: ${({ theme }) => theme.colors.onSurface};
`;

export const LabelCaps = styled.span`
  font-family: 'Inter', sans-serif;
  font-size: 13px; /* Tamanho um pouco maior */
  font-weight: 600;
  line-height: 1;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.outline};
`;

export const EditorialDivider = styled.div`
  width: 100%;
  height: 1px;
  background: rgba(212, 175, 55, 0.2);
  margin: 64px 0;
`;

export const PageContainer = styled.main`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.onBackground};
`;

// ─── Admin Sidebar ─────────────────────────────────────────────────────────────

export const AdminSidebar = styled.nav`
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  width: 256px;
  display: flex;
  flex-direction: column;
  padding: 32px 0;
  background: #0A0A0A;
  border-right: 1px solid rgba(212, 175, 55, 0.2);
  z-index: 50;

  @media (max-width: 1024px) {
    display: none;
  }
`;

export const AdminContent = styled.div`
  margin-left: 256px;
  padding: 48px;
  min-height: 100vh;
  width: calc(100% - 256px); /* Garante que ocupe todo o espaço restante */
  background: ${({ theme }) => theme.colors.background};

  @media (max-width: 1024px) {
    margin-left: 0;
    width: 100%;
    padding: 24px;
  }
`;

// ─── Stat Card ─────────────────────────────────────────────────────────────────

export const StatCard = styled.div`
  background: ${({ theme }) => theme.colors.surfaceContainerLow};
  border: 1px solid rgba(212, 175, 55, 0.1);
  padding: 24px;
`;

// ─── Buttons & Inputs ──────────────────────────────────────────────────────────

export const PrimaryButton = styled.button`
  display: flex;
  align-items: center;
  gap: 12px;
  font-family: 'Inter', sans-serif;
  font-size: 14px; /* Botão um pouco maior */
  font-weight: 600;
  padding: 16px 36px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.onPrimary};
  background: ${({ theme }) => theme.colors.primary};
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  width: fit-content;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryContainer};
  }
`;

export const GhostButton = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: 'Inter', sans-serif;
  font-size: 12px; /* Botão um pouco maior */
  font-weight: 600;
  padding: 14px 28px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.onSurface};
  background: transparent;
  border: 1px solid rgba(212, 175, 55, 0.3);
  cursor: pointer;
  transition: all 0.3s ease;
  width: fit-content;

  &:hover {
    background: rgba(212, 175, 55, 0.1);
  }
`;

export const TableInput = styled.input`
  width: 100%;
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.onSurface};
  background: ${({ theme }) => theme.colors.surfaceContainerLow};
  border: 1px solid ${({ theme }) => theme.colors.outlineVariant};
  padding: 12px 16px;
  outline: none;
  transition: border-color 0.3s;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.outline};
  }
`;

export const Logo = styled.span`
  display: inline-block;
  font-family: 'Noto Serif', serif;
  font-size: 28px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.surfaceBright};
`;

export const HairlineInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;

export const HairlineLabel = styled.label`
  font-family: 'Inter', sans-serif;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.outline};
`;

export const HairlineInput = styled.input`
  width: 100%;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.onSurface};
  background: ${({ theme }) => theme.colors.surfaceContainerLow};
  border: 1px solid ${({ theme }) => theme.colors.outlineVariant};
  padding: 16px 18px;
  outline: none;
  transition: border-color 0.3s;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const TopNav = styled.nav`
  position: sticky;
  top: 0;
  left: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  width: 100%;
  padding: clamp(18px, 2vw, 28px) 32px;
  background: rgba(10, 10, 10, 0.93);
  border-bottom: 1px solid rgba(212, 175, 55, 0.12);
  backdrop-filter: blur(14px);

  @media (max-width: 960px) {
    gap: 16px;
    flex-wrap: wrap;
    padding: 18px 24px;
  }

  @media (max-width: 720px) {
    justify-content: space-between;
  }
`;

export const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 28px;

  @media (max-width: 900px) {
    display: none;
  }

  a {
    font-family: 'Inter', sans-serif;
    font-size: 13px;
    font-weight: 600;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.onSurface};
    text-decoration: none;
    transition: color 0.3s ease;

    &.active {
      color: ${({ theme }) => theme.colors.primary};
    }

    &:hover {
      color: ${({ theme }) => theme.colors.primaryContainer};
    }
  }
`;

export const NavIcons = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;

  a {
    color: ${({ theme }) => theme.colors.onSurface};
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;
