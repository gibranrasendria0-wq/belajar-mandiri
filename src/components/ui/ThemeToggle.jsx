import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export default function ThemeToggle({ className = '' }) {
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      type="button"
      className={`relative inline-flex items-center justify-center p-2.5 rounded-xl border border-slate-200 dark:border-[#232B3E] bg-white dark:bg-[#131722] text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-50 dark:hover:bg-[#191F2D] shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500/40 ${className}`}
      title={isDark ? 'Beralih ke Light Mode' : 'Beralih ke Dark Mode'}
      aria-label="Toggle Theme"
    >
      {isDark ? (
        <Sun className="w-5 h-5 text-amber-400 animate-spin-slow transition-transform" />
      ) : (
        <Moon className="w-5 h-5 text-indigo-500 transition-transform" />
      )}
    </button>
  );
}
