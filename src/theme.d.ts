// src/theme.d.ts
import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface TypeBackground {
    alt: string;
    medium: string;
    light: string;
    dark: string;
  }

  interface Palette {
    background: TypeBackground;
    neutral: TypeBackground;
  }

  interface PaletteOptions {
    background?: Partial<TypeBackground>;
    neutral?: Partial<TypeBackground>;
  }
}
