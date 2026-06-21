import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Theme } from "@/types";

interface ThemeState {
  theme: Theme;
  resolved: "dark" | "light";
}

const initialState: ThemeState = {
  theme: "dark",
  resolved: "dark",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme(state, action: PayloadAction<Theme>) {
      state.theme = action.payload;
      if (action.payload === "system") {
        const prefersDark =
          typeof window !== "undefined" &&
          window.matchMedia("(prefers-color-scheme: dark)").matches;
        state.resolved = prefersDark ? "dark" : "light";
      } else {
        state.resolved = action.payload;
      }
    },
    toggleTheme(state) {
      const newResolved = state.resolved === "dark" ? "light" : "dark";
      state.theme = newResolved;
      state.resolved = newResolved;
    },
  },
});

export const { setTheme, toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
