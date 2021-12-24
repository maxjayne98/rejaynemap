import { createSlice } from "@reduxjs/toolkit";
import {
  lightTheme,
  darkTheme,
  dimTheme,
  violetCollorPallet,
  blueCollorPallet,
  greenCollorPallet,
} from "../../assets/styles/theme";
import { ColorPallete } from "../../model";
import { get, set } from "local-storage";

const themePallete: { [key: string]: ColorPallete } = {
  dark: darkTheme,
  light: lightTheme,
  dim: dimTheme,
};

const themeColorPallete: any = {
  violet: violetCollorPallet,
  blue: blueCollorPallet,
  green: greenCollorPallet,
};

const theme = themePallete[get<string>("theme") || "light"];
const colorPallete = themeColorPallete[get<string>("colorPallete") || "green"];

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
