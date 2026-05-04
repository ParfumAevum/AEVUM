import 'styled-components';
import type { Theme } from './components/theme';

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {
    __themeBrand?: never;
  }
}
