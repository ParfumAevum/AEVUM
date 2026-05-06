import styled from "styled-components";

export const MobileMenuButton = styled.button`
  display: none;
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.onSurface};
  cursor: pointer;

  span.material-symbols-outlined {
    font-size: 28px;
  }

  @media (max-width: 720px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const MobileMenuOverlay = styled.div<{ open: boolean }>`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.85);
  z-index: 120;
  display: ${({ open }) => (open ? "flex" : "none")};
  justify-content: center;
  align-items: center;
`;

export const MobileMenu = styled.div`
  background: ${({ theme }) => theme.colors.surfaceContainerLow};
  border: 1px solid rgba(212, 175, 55, 0.16);
  width: min(92%, 360px);
  padding: 32px;
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  gap: 18px;

  a {
    font-family: "Inter", sans-serif;
    font-size: 16px;
    font-weight: 700;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.onSurface};
    text-align: center;
  }

  button.close-menu {
    align-self: flex-end;
    background: transparent;
    border: none;
    color: ${({ theme }) => theme.colors.onSurface};
    cursor: pointer;
  }
`;