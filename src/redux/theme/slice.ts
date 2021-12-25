import { createSlice } from "@reduxjs/toolkit";
import {
  lightTheme,
  darkTheme,
  dimTheme,
  violetCollorPallet,
  blueCollorPallet,
  greenCollorPallet,
} from "../../assets/styles/theme";
import {
  ColorPalleteKey,
  IColorPallete,
  ITheme,
  Theme,
  ThemeKey,
  ColorPallete,
} from "model";
import { get, set } from "local-storage";

const themePallete: ITheme = {
  dark: darkTheme,
  light: lightTheme,
  dim: dimTheme,
};

const themeColorPallete: IColorPallete = {
  violet: violetCollorPallet,
  blue: blueCollorPallet,
  green: greenCollorPallet,
};
const cachedPalleteName: ColorPalleteKey =
  (get<string>("colorPallete") as ColorPalleteKey) || "green";
const cachedThemeName: ThemeKey = (get<string>("theme") as ThemeKey) || "light";

const initialTheme = themePallete[cachedThemeName];

const initialColorPallete = themeColorPallete[cachedPalleteName];

interface IThemeState extends Theme, ColorPallete {}
interface ThemeState {
  theme: IThemeState;
  themeName: ThemeKey;
  palleteName: ColorPalleteKey;
}

const initialState: ThemeState = {
  theme: { ...initialTheme, ...initialColorPallete },
  themeName: cachedThemeName,
  palleteName: cachedPalleteName,
};

const themeSlice = createSlice({
  name: "theme",
  initialState: initialState,
  reducers: {
    toggleTheme: (state, action) => {
      state.theme = {
        ...state.theme,
        ...themePallete[action.payload as ThemeKey],
      };
      state.themeName = action.payload;
      set<string>("theme", action.payload);
    },
    toggleColorPallete: (state, action) => {
      state.theme = {
        ...state.theme,
        ...themeColorPallete[action.payload as ColorPalleteKey],
      };
      state.palleteName = action.payload;

      set<string>("colorPallete", action.payload);
    },
  },
});

export const themeActions = themeSlice.actions;

export default themeSlice.reducer;
