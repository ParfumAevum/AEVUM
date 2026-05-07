// ══════════════════════════════════════════════════════════════
// src/main.tsx
// Ponto de entrada da aplicação React.
// Envolve o App com ThemeProvider, GlobalStyles, AuthProvider
// e CartProvider para disponibilizar os contextos globalmente.
// ══════════════════════════════════════════════════════════════

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "styled-components";
import App from "./App.tsx";
import { theme } from "./components/theme";
import { GlobalStyles } from "./components/GlobalStyles";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* Tema visual da aplicação (cores, fontes, espaçamentos) */}
    <ThemeProvider theme={theme}>
      {/* Estilos CSS globais (reset, fontes, body) */}
      <GlobalStyles />
      {/* Contexto de autenticação (usuário logado, token JWT) */}
      <AuthProvider>
        {/* Contexto do carrinho de compras */}
        <CartProvider>
          <App />
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>
);