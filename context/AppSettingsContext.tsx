import { createContext, useContext, useState, ReactNode } from "react";

type Language = "en" | "ur";

export type AppSettingsContextType = {
  isDark: boolean;
  toggleTheme: () => void;
  language: Language;
  toggleLanguage: () => void;
};

const AppSettingsContext = createContext<AppSettingsContextType | null>(null);

export function AppSettingsProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState(false);
  const [language, setLanguage] = useState<Language>("en");

  const toggleTheme = () => setIsDark((prev) => !prev);
  const toggleLanguage = () =>
    setLanguage((prev) => (prev === "en" ? "ur" : "en"));

  return (
    <AppSettingsContext.Provider
      value={{ isDark, toggleTheme, language, toggleLanguage }}
    >
      {children}
    </AppSettingsContext.Provider>
  );
}

export function useAppSettings(): AppSettingsContextType {
  const context = useContext(AppSettingsContext);
  if (!context) throw new Error("useAppSettings must be used inside AppSettingsProvider");
  return context;
}
