import {
  Palette as MuiPalette,
  PaletteOptions as MuiPaletteOptions,
} from '@mui/material/styles/createPalette';

interface CustomProps {
  white: string;
  warning: string;
  success: string;
  hover: string;
}

declare module '@mui/material/styles/createPalette' {
  interface Palette extends MuiPalette {
    passive: { light: string; main: string };
    custom: CustomProps;
  }

  interface PaletteOptions extends MuiPaletteOptions {
    passive?: { light: string; main: string };
    custom: CustomProps;
  }
}

declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xs: true;
    sm: true;
    md: true;
    lg: true;
    xl: true;
    xxl: true;
  }
}
