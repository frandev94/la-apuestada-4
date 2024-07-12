import { create } from "zustand";
import { persist } from "zustand/middleware";

type ThemeType = "dark" | "light";

interface ThemeState {
  theme: ThemeType;
  toggle: () => void;
  change: (theme: ThemeType) => void;
}

const getWindowTheme = (): ThemeType=> (window?.matchMedia && window?.matchMedia('(prefers-color-scheme: dark)').matches) ? "dark" : "light";

/**
 * Store to manage theme state
 */
const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: getWindowTheme() ?? "light",
      change: (by) => set(() => ({ theme: by })),
      toggle: () =>
        set((state) => {
          console.log(state, "toggle");
          return ({
          theme: state.theme === "light" ? "dark" : "light",
        })}),
    }),
    {
      name: "theme-storage",
    }
  )
);

export default useThemeStore;
