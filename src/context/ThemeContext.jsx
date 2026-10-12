import React, { createContext, useContext, useEffect, useState } from 'react';
import { getFromStorage, saveToStorage, STORAGE_KEYS, DEFAULT_SETTINGS } from '../lib/storage';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    const saved = getFromStorage(STORAGE_KEYS.SETTINGS, DEFAULT_SETTINGS);
    return saved?.theme || 'dark';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.style.colorScheme = 'dark';
    } else {
      root.classList.remove('dark');
      root.style.colorScheme = 'light';
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      const currentSettings = getFromStorage(STORAGE_KEYS.SETTINGS, DEFAULT_SETTINGS);
      saveToStorage(STORAGE_KEYS.SETTINGS, { ...currentSettings, theme: next });
      return next;
    });
  };

  const setThemeExplicitly = (newTheme) => {
    if (newTheme === 'dark' || newTheme === 'light') {
      setTheme(newTheme);
      const currentSettings = getFromStorage(STORAGE_KEYS.SETTINGS, DEFAULT_SETTINGS);
      saveToStorage(STORAGE_KEYS.SETTINGS, { ...currentSettings, theme: newTheme });
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme: setThemeExplicitly, isDark: theme === 'dark' }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
