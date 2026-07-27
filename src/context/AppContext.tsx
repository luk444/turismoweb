import { createContext, useContext, useState, type ReactNode } from 'react';
import type { Currency, Language } from '../types';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  currency: Currency;
  setCurrency: (currency: Currency) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('ES');
  const [currency, setCurrency] = useState<Currency>('ARS');

  return (
    <AppContext.Provider
      value={{ language, setLanguage, currency, setCurrency }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}
