import type { ReactNode } from "react";
import { createContext, useContext, useState, useEffect } from "react";

export type Theme = "light" | "dark" | "system";

const ThemeContext = createContext<{theme: Theme, setTheme: (theme: Theme) => void}>({
  theme: "system",
  setTheme: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, _setTheme] = useState<Theme>("system");
  const setTheme = (theme: Theme) => {
    _setTheme(theme);
    localStorage.setItem("theme", theme);
  };
  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme) {
      setTheme(theme as Theme);
    }
    const handleStorage = (event: StorageEvent) => {
      if (event.key === "theme") {
        _setTheme(event.newValue as Theme);
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => {
      window.removeEventListener("storage", handleStorage);
    };
  }, []);
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
