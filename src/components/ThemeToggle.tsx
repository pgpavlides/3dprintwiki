import React, { useEffect, useState } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';

export const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    // Initialize theme from localStorage or system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const initialTheme = savedTheme === 'dark' || (!savedTheme && prefersDark) ? 'dark' : 'light';
    setTheme(initialTheme);
    
    // Apply theme to document
    if (initialTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    
    // Update document and localStorage
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', newTheme);
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`
        relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900
        ${theme === 'dark' ? 'bg-indigo-600' : 'bg-gray-200'}
      `}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      role="switch"
      aria-checked={theme === 'dark'}
    >
      <span className="sr-only">Toggle theme</span>
      <span
        className={`
          ${theme === 'dark' ? 'translate-x-6' : 'translate-x-1'}
          inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform duration-200
          flex items-center justify-center
        `}
      >
        {theme === 'dark' ? (
          <FaMoon className="h-3 w-3 text-indigo-600" />
        ) : (
          <FaSun className="h-3 w-3 text-yellow-500" />
        )}
      </span>
    </button>
  );
};
