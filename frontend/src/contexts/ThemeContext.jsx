import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const themeClasses = {
    bg: isDarkMode ? 'bg-black' : 'bg-gray-50',
    text: isDarkMode ? 'text-white' : 'text-gray-900',
    textSecondary: isDarkMode ? 'text-gray-300' : 'text-gray-600',
    cardBg: isDarkMode ? 'bg-gray-900' : 'bg-white',
    border: isDarkMode ? 'border-gray-800' : 'border-gray-200',
    accent: 'text-orange-500',
    accentBg: 'bg-orange-500',
    heroBg: isDarkMode 
      ? 'bg-gradient-to-br from-gray-900 via-black to-gray-800' 
      : 'bg-gradient-to-br from-blue-50 via-white to-purple-50',
    inputBg: isDarkMode ? 'bg-gray-800' : 'bg-white',
    hoverBg: isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100',
  };

  return (
    <ThemeContext.Provider value={{ 
      isDarkMode, 
      toggleTheme, 
      themeClasses 
    }}>
      {children}
    </ThemeContext.Provider>
  );
};