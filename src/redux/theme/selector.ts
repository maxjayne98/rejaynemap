import type { RootState } from "redux/store";
import { ColorPallete, ThemeKey, ColorPalleteKey } from "model";

export const selectTheme = (state: RootState): ColorPallete =>
  state.globalTheme.theme;

export const selectThemeName = (state: RootState): ThemeKey =>
  state.globalTheme.themeName;

export const selectPalletName = (state: RootState): ColorPalleteKey =>
  state.globalTheme.palleteName;
