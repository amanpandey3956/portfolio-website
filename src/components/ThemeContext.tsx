import { createContext, useContext, useState, ReactNode } from "react";

interface ThemeContextType {
  isBlogPage: boolean;
  setIsBlogPage: (value: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useThemeContext() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeContext must be used within ThemeContextProvider");
  }
  return context;
}

interface ThemeContextProviderProps {
  children: ReactNode;
}

export function ThemeContextProvider({ children }: ThemeContextProviderProps) {
  const [isBlogPage, setIsBlogPage] = useState(false);
  
  return (
    <ThemeContext.Provider value={{ isBlogPage, setIsBlogPage }}>
      {children}
    </ThemeContext.Provider>
  );
}
