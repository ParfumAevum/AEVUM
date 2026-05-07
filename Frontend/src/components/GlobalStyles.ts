import { createGlobalStyle } from 'styled-components';

// GlobalStyles.ts
// Estilos globais aplicados em toda a aplicação. Inclui reset de CSS e fontes.
export const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Noto+Serif:ital,wght@0,300;0,400;1,300&family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap');

  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html, body, #root {
    width: 100%;
    min-height: 100%;
    height: 100%;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    background-color: #0A0A0a;
    color: #e5e2e1;
    font-family: 'Inter', sans-serif;
    font-size: 18px; /* Fonte base um pouco maior */
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
    min-height: 100%;
    background-image: radial-gradient(circle at top right, rgba(242, 202, 80, 0.08), transparent 25%),
      radial-gradient(circle at bottom left, rgba(242, 202, 80, 0.05), transparent 22%);
  }

  img, svg {
    max-width: 100%;
    height: auto;
    display: block;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    cursor: pointer;
    border: none;
    background: none;
    font-family: inherit;
  }

  input, textarea, select {
    font-family: inherit;
    color: inherit;
    background: none;
    border: none;
  }
`;