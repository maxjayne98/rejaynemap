import { createSlice } from "@reduxjs/toolkit";
import { lightTheme, darkTheme } from "../../assets/styles/theme";
import { ColorPallete } from "../../model";
import { get, set } from "local-storage";

const themePallete: { [key: string]: ColorPallete } = {
  dark: darkTheme,
  light: lightTheme,
};

const initialState: themeState = {
  theme: themePallete[get<string>("theme") || "dark"],
};

interface themeState {
  theme: ColorPallete;
}

const themeSlice = createSlice({
  name: "theme",
  initialState: initialState,
  reducers: {
    toggleTheme: (state, action) => {
      state.theme = { ...themePallete[action.payload] };
      set<string>("theme", action.payload);
    },
  },
});

export const themeActions = themeSlice.actions;

export default themeSlice.reducer;
