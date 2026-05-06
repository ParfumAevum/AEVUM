import styled from "styled-components";

export const ProfileLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 48px;
  padding-top: 128px;
  padding-left: clamp(24px, 4vw, 48px);
  padding-right: clamp(24px, 4vw, 48px);
  padding-bottom: 64px;

  @media (min-width: 1024px) {
    grid-template-columns: 280px 1fr;
  }

  @media (max-width: 768px) {
    padding-top: 96px;
    padding-left: 24px;
    padding-right: 24px;
    padding-bottom: 48px;
  }
`;

// Barra lateral com avatar e links internos de navegação de perfil.
export const Sidebar = styled.aside`
  padding: 48px;

  @media (max-width: 1023px) {
    padding: 24px;
  }
`;

export const AvatarWrapper = styled.div`
  text-align: center;
  margin-bottom: 48px;

  .avatar {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    margin: 0 auto 16px;
    background: ${({ theme }) => theme.colors.surfaceContainer};
    border: 2px solid rgba(212, 175, 55, 0.3);
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;

    span {
      font-size: 48px;
      color: ${({ theme }) => theme.colors.primary};
    }
  }

  h3 {
    font-family: "Noto Serif", serif;
    font-size: 18px;
    color: ${({ theme }) => theme.colors.onSurface};
    margin-bottom: 8px;
  }

  p {
    font-family: "Inter", sans-serif;
    font-size: 11px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.outline};
  }
`;

export const NavLinks = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 8px;

  a {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 16px;
    font-family: "Inter", sans-serif;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.onSurfaceVariant};
    border-radius: 4px;
    transition: all 0.2s ease;

    &:hover,
    &.active {
      background: rgba(212, 175, 55, 0.1);
      color: ${({ theme }) => theme.colors.primary};
    }

    span {
      font-size: 18px;
    }
  }
`;

// Área principal do conteúdo onde os formulários de edição são exibidos.
export const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 64px;
`;

export const FormSection = styled.section`
  h2 {
    font-family: "Noto Serif", serif;
    font-size: 22px;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.onSurface};
    margin-bottom: 8px;
    padding-bottom: 20px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  p.section-desc {
    font-family: "Inter", sans-serif;
    font-size: 12px;
    color: ${({ theme }) => theme.colors.outline};
    margin-bottom: 32px;
  }
`;

export const FieldGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const FieldBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  label {
    font-family: "Inter", sans-serif;
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: ${({ theme }) => theme.colors.outlineVariant};
    font-weight: 600;
  }
`;

export const ActionRow = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  padding-top: 32px;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
`;

// Bloco de ação sensível para exclusão ou redefinição de conta.
export const DangerZone = styled.div`
  border: 1px solid rgba(255, 180, 171, 0.2);
  padding: 32px;
  background: rgba(147, 0, 10, 0.05);

  h3 {
    font-family: "Noto Serif", serif;
    font-size: 16px;
    color: ${({ theme }) => theme.colors.error};
    margin-bottom: 8px;
  }

  p {
    font-family: "Inter", sans-serif;
    font-size: 12px;
    color: ${({ theme }) => theme.colors.onSurfaceVariant};
    margin-bottom: 24px;
  }
`;

export const DangerButton = styled.button`
  font-family: "Inter", sans-serif;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.error};
  background: none;
  border: 1px solid rgba(255, 180, 171, 0.3);
  padding: 12px 24px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 180, 171, 0.1);
  }
`;