// Navbar.tsx
// Componente de navegação principal exibido em todas as páginas.
// Suporta navegação desktop com links e menu mobile com overlay.
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { TopNav, Logo, NavLinks, NavIcons } from '../components/UI';

const MobileMenuButton = styled.button`
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

const MobileMenuOverlay = styled.div<{ open: boolean }>`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.85);
  z-index: 120;
  display: ${({ open }) => (open ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
`;

const MobileMenu = styled.div`
  background: ${({ theme }) => theme.colors.surfaceContainerLow};
  border: 1px solid rgba(212, 175, 55, 0.16);
  width: min(92%, 360px);
  padding: 32px;
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  gap: 18px;

  a {
    font-family: 'Inter', sans-serif;
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

export default function Navbar() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { to: '/home', label: 'Home' },
    { to: '/catalogo', label: 'Catálogo' },
    { to: '/pedidos', label: 'Pedidos' },
    { to: '/admin/relatorios', label: 'Admin' },
  ];

  return (
    <>
      <TopNav>
        {/* Logo e botão para voltar à home */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <Link to="/home">
            <Logo>AEVUM</Logo>
          </Link>
        </div>

        {/* Links de navegação exibidos no desktop */}
        <NavLinks>
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={location.pathname === link.to ? 'active' : ''}
            >
              {link.label}
            </Link>
          ))}
        </NavLinks>

        {/* Ícones de perfil e carrinho */}
        <NavIcons>
          <Link to="/perfil">
            <span className="material-symbols-outlined">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill='yellow' viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"></path>
              </svg>
            </span>
          </Link>
          <Link to="/finalizar-compra">
            <span className="material-symbols-outlined">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill='yellow' viewBox="0 0 24 24">
                <path d="M7 18c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"></path>
              </svg>
            </span>
          </Link>
        </NavIcons>

        <MobileMenuButton
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
        >
          <span className="material-symbols-outlined">{menuOpen ? 'close' : 'menu'}</span>
        </MobileMenuButton>
      </TopNav>

      <MobileMenuOverlay open={menuOpen} onClick={() => setMenuOpen(false)}>
        <MobileMenu onClick={(event) => event.stopPropagation()}>
          <button className="close-menu" onClick={() => setMenuOpen(false)}>
            <span className="material-symbols-outlined">close</span>
          </button>
          {links.map((link) => (
            <Link key={link.to} to={link.to} onClick={() => setMenuOpen(false)}>
              {link.label}
            </Link>
          ))}
          <Link to="/perfil" onClick={() => setMenuOpen(false)}>
            Perfil
          </Link>
          <Link to="/finalizar-compra" onClick={() => setMenuOpen(false)}>
            Carrinho
          </Link>
        </MobileMenu>
      </MobileMenuOverlay>
    </>
  );
}