import { themeActions } from "./slice";

export const toggleTheme = (themeName: string) =>
  themeActions.toggleTheme(themeName);

export const toggleColorPallet = (palleteName: string) =>
  themeActions.toggleColorPallete(palleteName);
