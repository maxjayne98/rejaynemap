import { createSlice } from "@reduxjs/toolkit";
import {
  lightTheme,
  darkTheme,
  purpleCollorPallet,
  blueCollorPallet,
} from "../../assets/styles/theme";
import { ColorPallete } from "../../model";
import { get, set } from "local-storage";

const themePallete: { [key: string]: ColorPallete } = {
  dark: darkTheme,
  light: lightTheme,
};

const themeColorPallete: any = {
  purple: purpleCollorPallet,
  blue: blueCollorPallet,
};

const theme = themePallete[get<string>("theme") || "light"];
const colorPallete = themeColorPallete[get<string>("colorPallete") || "purple"];

const initialState: themeState = {
  theme: { ...theme, ...colorPallete },
};

interface themeState {
  theme: any;
}

const themeSlice = createSlice({
  name: "theme",
  initialState: initialState,
  reducers: {
    toggleTheme: (state, action) => {
      state.theme = { ...state.theme, ...themePallete[action.payload] };
      set<string>("theme", action.payload);
    },
    toggleColorPallete: (state, action) => {
      state.theme = { ...state.theme, ...themeColorPallete[action.payload] };
      set<string>("colorPallete", action.payload);
    },
  },
});

export const themeActions = themeSlice.actions;

export default themeSlice.reducer;
