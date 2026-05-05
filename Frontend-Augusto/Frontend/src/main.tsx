// main.tsx
// Este arquivo inicializa o React e injeta o aplicativo no elemento root do HTML.
// Ele também aplica o tema e os estilos globais de styled-components.
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import App from './App.tsx';
import { theme } from './components/theme';
import { GlobalStyles } from './components/GlobalStyles';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <App />
    </ThemeProvider>
  </StrictMode>,
);
