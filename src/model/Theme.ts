export type ThemeKey = "light" | "dark" | "dim";
export type ColorPalleteKey = "green" | "blue" | "violet";

export interface ColorPallete {
  primary: string;
  secondary: string;
  thirnary: string;
}

export interface Theme {
  body: string;
  text: string;
  text1: string;
  text2: string;
  text3: string;
}

export interface AppTheme extends Theme, ColorPallete {}

export type ITheme = {
  [key in ThemeKey]: Theme;
};

export type IColorPallete = {
  [key in ColorPalleteKey]: ColorPallete;
};
