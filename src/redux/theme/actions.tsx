import { themeActions } from './slice'

export const toggleTheme = (themeName: string) =>
  themeActions.toggleTheme(themeName)
