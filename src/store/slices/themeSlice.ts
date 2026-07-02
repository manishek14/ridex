// src/store/slices/themeSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Theme } from "@/types";

interface ThemeState {
  theme: Theme;
  resolved: "dark" | "light";
}

function applyTheme(resolved: "dark" | "light") {
  if (typeof document === "undefined") return;
  document.documentElement.dataset.theme = resolved;
  try { localStorage.setItem("theme", resolved); } catch { /* noop */ }
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
      const prefersDark =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;
      state.resolved =
        action.payload === "system"
          ? prefersDark ? "dark" : "light"
          : action.payload;
      applyTheme(state.resolved);
    },
    toggleTheme(state) {
      const next = state.resolved === "dark" ? "light" : "dark";
      state.theme    = next;
      state.resolved = next;
      applyTheme(next);
    },
    // در providers صدا زده می‌شه تا از localStorage بخونه
    hydrateTheme(state) {
      if (typeof window === "undefined") return;
      try {
        const stored = localStorage.getItem("theme");
        if (stored === "light" || stored === "dark") {
          state.theme    = stored;
          state.resolved = stored;
        } else {
          const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
          state.resolved = prefersDark ? "dark" : "light";
          state.theme    = "system";
        }
        // data-theme از theme init script قبلاً set شده
        // فقط اطمینان می‌دیم که در sync باشه
        document.documentElement.dataset.theme = state.resolved;
      } catch { /* noop */ }
    },
  },
});

export const { setTheme, toggleTheme, hydrateTheme } = themeSlice.actions;
export default themeSlice.reducer;
