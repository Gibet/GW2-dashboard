import React, { createContext, useContext, useEffect, useCallback, useMemo, useState} from 'react'

type Theme = 'light'|'dark';
const STORAGE_KEY = 'theme';

const getInitialTheme = () => {
  try {
    const savedTheme = localStorage.getItem(STORAGE_KEY);
    if (savedTheme === 'light' || savedTheme === 'dark') return savedTheme;
  } catch {}
  if (typeof window !== 'undefined' && window.matchMedia?.('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  return 'light';
}

const ThemeContext = createContext({
  theme: 'light' as Theme,
  setTheme: (_: Theme) => {},
  toggleTheme: () => {},
});

export const ThemeProvider: React.FC<{children:React.ReactNode}> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(getInitialTheme());

  useEffect(() => {
    try { document.documentElement.dataset.theme = theme; } catch {}
    try { localStorage.setItem(STORAGE_KEY, theme); } catch {}
  }, [theme]);

  const toggleTheme = useCallback(() => setTheme(prev => prev === 'light' ? 'dark' : 'light'), []);

  const value = useMemo(() => ({ theme, setTheme, toggleTheme }), [theme, toggleTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => useContext(ThemeContext);