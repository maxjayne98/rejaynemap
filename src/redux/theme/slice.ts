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
  AppTheme,
  ThemeKey,
} from "model";
import { getLocalStorage, setLocalStorage } from "utils";

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
  (getLocalStorage("colorPallete") as ColorPalleteKey) || "green";

const cachedThemeName: ThemeKey =
  (getLocalStorage("theme") as ThemeKey) || "light";

const initialTheme = themePallete[cachedThemeName];

const initialColorPallete = themeColorPallete[cachedPalleteName];

interface ThemeState {
  theme: AppTheme;
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
      setLocalStorage("theme", action.payload);
    },
    toggleColorPallete: (state, action) => {
      state.theme = {
        ...state.theme,
        ...themeColorPallete[action.payload as ColorPalleteKey],
      };
      state.palleteName = action.payload;

      setLocalStorage("colorPallete", action.payload);
    },
  },
});

export const themeActions = themeSlice.actions;

export default themeSlice.reducer;
