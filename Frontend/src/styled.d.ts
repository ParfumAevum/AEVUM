// styled.d.ts
// Declara o tipo padrão do tema para o styled-components.
// Isso permite que o ThemeProvider forneça tipagem forte para estilos.
import 'styled-components';
import type { Theme } from './components/theme';

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {
    __themeBrand?: never;
  }
}
