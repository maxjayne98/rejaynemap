import type { RootState } from '../store'
import { ColorPallete } from '../../model'

export const selectTheme = (state: RootState): ColorPallete =>
  state.globalTheme.theme
 