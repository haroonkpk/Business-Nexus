import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("theme") === "dracula" ? "dracula" : "winter",
  setTheme: (theme) => {
    localStorage.setItem("theme", theme);
    set({ theme });
  },
  toggleTheme: () =>
    set((state) => {
      const newTheme = state.theme === "dracula" ? "winter" : "dracula";
      localStorage.setItem("theme", newTheme);
      return { theme: newTheme };
    }),
}));
