// src/providers/index.tsx
"use client";

import { Provider } from "react-redux";
import { store } from "@/store";
import { useEffect, type ReactNode } from "react";
import { hydrateTheme } from "@/store/slices/themeSlice";

function ThemeHydrator() {
  useEffect(() => {
    // اولین mount: تم رو از localStorage بخون و Redux state رو sync کن
    store.dispatch(hydrateTheme());
  }, []);
  return null;
}

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <Provider store={store}>
      <ThemeHydrator />
      {children}
    </Provider>
  );
}
