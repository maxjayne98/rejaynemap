import type { RootState } from "../store";
import { ColorPallete, ThemeKey } from "../../model";

export const selectTheme = (state: RootState): ColorPallete =>
  state.globalTheme.theme;

export const selectThemeName = (state: RootState): ThemeKey =>
  state.globalTheme.themeName;
