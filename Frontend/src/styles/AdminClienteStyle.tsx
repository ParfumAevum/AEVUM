// ═══════════════════════════════════════════════════════════════════════════════════════════════════
// AdminClienteStyle.tsx - Estilos do Painel de Clientes
// ═══════════════════════════════════════════════════════════════════════════════════════════════════
import styled from "styled-components";
import { Link } from "react-router-dom";
import { PageContainer, LabelCaps } from "../components/UI";

const AdminPageContainer = styled(PageContainer)`
  display: flex;
`;

const SidebarNav = styled.nav`
  flex: 1;
`;

const PageHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 40px;
  flex-wrap: wrap;
  gap: 24px;
`;

const SectionLabel = styled(LabelCaps)`
  color: #4d4635;
  display: block;
  margin-bottom: 8px;
  font-size: 10px;
`;

const SectionTitle = styled.h2`
  font-family: "Noto Serif", serif;
  font-size: clamp(28px, 3vw, 48px);
  font-weight: 400;
  color: #e5e2e1;
`;

const SidebarLogo = styled.div`
  padding: 0 32px 40px;
  border-bottom: 1px solid rgba(212, 175, 55, 0.1);
  margin-bottom: 32px;

  h1 {
    font-family: "Noto Serif", serif;
    font-size: 16px;
    letter-spacing: 0.3em;
    color: ${({ theme }) => theme.colors.primary};
    text-transform: uppercase;
  }

  p {
    font-family: "Inter", sans-serif;
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
  font-family: "Inter", sans-serif;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ $active, theme }) =>
    $active ? theme.colors.primary : theme.colors.outline};
  background: ${({ $active }) =>
    $active ? "rgba(212,175,55,0.06)" : "transparent"};
  border-right: 2px solid
    ${({ $active, theme }) =>
      $active ? theme.colors.primaryContainer : "transparent"};
  transition: all 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    background: rgba(212, 175, 55, 0.04);
  }
`;

const ClientList = styled.div`
  display: grid;
  gap: 16px;
`;

const ClientCard = styled.div`
  background: ${({ theme }) => theme.colors.surfaceContainerLow};
  border: 1px solid rgba(212, 175, 55, 0.06);
  padding: 24px;
  display: grid;
  gap: 16px;

  .row {
    display: flex;
    justify-content: space-between;
    gap: 16px;
    flex-wrap: wrap;
  }

  h3 {
    font-family: "Noto Serif", serif;
    font-size: 20px;
    margin: 0;
    color: ${({ theme }) => theme.colors.onSurface};
  }

  p {
    font-family: "Inter", sans-serif;
    font-size: 14px;
    color: ${({ theme }) => theme.colors.outline};
    margin: 0;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
`;

const ModalContent = styled.div`
  width: min(520px, calc(100% - 32px));
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 24px;
  padding: 32px;
  box-shadow: 0 32px 80px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const ModalTitle = styled.h3`
  margin: 0;
  font-family: "Noto Serif", serif;
  font-size: 28px;
  color: ${({ theme }) => theme.colors.onSurface};
`;

const ModalForm = styled.div`
  display: grid;
  gap: 18px;

  label {
    display: grid;
    gap: 8px;
    font-family: "Inter", sans-serif;
    font-size: 14px;
    color: ${({ theme }) => theme.colors.onSurface};
  }

  input,
  select {
    width: 100%;
    padding: 14px 16px;
    border-radius: 14px;
    border: 1px solid rgba(212, 175, 55, 0.18);
    background: ${({ theme }) => theme.colors.surfaceContainerLow};
    color: ${({ theme }) => theme.colors.onSurface};
    font-family: "Inter", sans-serif;
    font-size: 14px;
    outline: none;
  }

  select {
    appearance: none;
  }
`;

const ModalActions = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: flex-end;
`;

export { 
  AdminPageContainer, 
  SidebarLogo, 
  SidebarNav, 
  NavItem, 
  PageHeader, 
  SectionLabel, 
  SectionTitle, 
  ClientList, 
  ClientCard,
  ModalOverlay,
  ModalContent,
  ModalTitle,
  ModalForm,
  ModalActions,
};