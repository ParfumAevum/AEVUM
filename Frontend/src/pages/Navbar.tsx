// ══════════════════════════════════════════════════════════════
// src/pages/Navbar.tsx
// Barra de navegação principal exibida em todas as páginas.
// - Exibe "Login" no lugar do ícone de perfil quando não logado
// - Exibe link "Admin" apenas para usuários com role ADMIN
// - Suporte a menu mobile com overlay
// ══════════════════════════════════════════════════════════════

import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { TopNav, Logo, NavLinks, NavIcons } from "../components/UI";
import {
  MobileMenuButton,
  MobileMenuOverlay,
  MobileMenu,
} from "../styles/NavbarStyle";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logado, isAdmin, usuario, logout } = useAuth();
  const { totalItens } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  // ─── Links de Navegação ─────────────────────────────────────
  // O link "Admin" aparece apenas para administradores
  const links = [
    { to: "/home", label: "Home" },
    { to: "/catalogo", label: "Catálogo" },
    // "Pedidos" só aparece se estiver logado
    ...(logado ? [{ to: "/pedidos", label: "Pedidos" }] : []),
    // "Admin" só aparece para administradores
    ...(isAdmin ? [{ to: "/admin/relatorios", label: "Admin" }] : []),
  ];

  // ─── Ação de Logout ─────────────────────────────────────────
  function handleLogout() {
    logout();
    navigate("/home");
    setMenuOpen(false);
  }

  return (
    <>
      <TopNav>
        {/* Logo com link para home */}
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
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
              className={location.pathname === link.to ? "active" : ""}
            >
              {link.label}
            </Link>
          ))}
        </NavLinks>

        {/* Ícones / Ações do lado direito */}
        <NavIcons>
          {logado ? (
            <>
              {/* Ícone de perfil quando logado */}
              <Link to="/perfil" title={usuario?.nome}>
                <span className="material-symbols-outlined">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="#f2ca50"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
                  </svg>
                </span>
              </Link>

              {/* Ícone do carrinho com badge de quantidade */}
              <Link
                to="/finalizar-compra"
                style={{ position: "relative" }}
                title="Carrinho"
              >
                <span className="material-symbols-outlined">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="#f2ca50"
                    viewBox="0 0 24 24"
                  >
                    <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
                  </svg>
                </span>
                {/* Badge com número de itens no carrinho */}
                {totalItens > 0 && (
                  <span
                    style={{
                      position: "absolute",
                      top: -6,
                      right: -6,
                      background: "#f2ca50",
                      color: "#0a0a0a",
                      borderRadius: "50%",
                      width: 16,
                      height: 16,
                      fontSize: 9,
                      fontWeight: 700,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {totalItens}
                  </span>
                )}
              </Link>
            </>
          ) : (
            // Exibe "Login" quando o usuário não está logado
            <Link
              to="/login"
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#f2ca50",
                padding: "8px 16px",
                border: "1px solid rgba(242,202,80,0.4)",
                transition: "all 0.2s",
              }}
            >
              Login
            </Link>
          )}
        </NavIcons>

        {/* Botão de menu mobile (hambúrguer) */}
        <MobileMenuButton
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
        >
          <span className="material-symbols-outlined">
            {menuOpen ? "close" : "menu"}
          </span>
        </MobileMenuButton>
      </TopNav>

      {/* Overlay do menu mobile */}
      <MobileMenuOverlay open={menuOpen} onClick={() => setMenuOpen(false)}>
        <MobileMenu onClick={(e) => e.stopPropagation()}>
          <button className="close-menu" onClick={() => setMenuOpen(false)}>
            <span className="material-symbols-outlined">close</span>
          </button>

          {links.map((link) => (
            <Link key={link.to} to={link.to} onClick={() => setMenuOpen(false)}>
              {link.label}
            </Link>
          ))}

          {logado ? (
            <>
              <Link to="/perfil" onClick={() => setMenuOpen(false)}>
                Perfil
              </Link>
              <Link to="/finalizar-compra" onClick={() => setMenuOpen(false)}>
                Carrinho {totalItens > 0 && `(${totalItens})`}
              </Link>
              <button
                onClick={handleLogout}
                style={{
                  fontFamily: "Inter",
                  fontSize: 16,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  color: "#ffb4ab",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  textAlign: "center",
                }}
              >
                Sair
              </button>
            </>
          ) : (
            <Link to="/login" onClick={() => setMenuOpen(false)}>
              Login
            </Link>
          )}
        </MobileMenu>
      </MobileMenuOverlay>
    </>
  );
}