import React from 'react';
import { useTheme } from '../../contexts/ThemeContext.jsx';

const ThemeToggle = ({ className = '', variant = 'switch' }) => {
  const { isDarkMode, toggleTheme, themeClasses } = useTheme();

  if (variant === 'switch') {
    return (
      <div className={`flex items-center ${className}`}>
        <span className={`mr-3 text-sm ${themeClasses.textSecondary}`}>
          ☀️
        </span>
        <button
          onClick={toggleTheme}
          className={`
            relative 
            inline-flex 
            h-6 
            w-11 
            items-center 
            rounded-full 
            ${isDarkMode ? 'bg-orange-500' : 'bg-gray-300'}
            transition-colors 
            duration-300 
            focus:outline-none 
            focus:ring-2 
            focus:ring-orange-500 
            focus:ring-offset-2
          `}
          role="switch"
          aria-checked={isDarkMode}
          aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          <span
            className={`
              ${isDarkMode ? 'translate-x-6' : 'translate-x-1'}
              inline-block 
              h-4 
              w-4 
              transform 
              rounded-full 
              bg-white 
              transition-transform 
              duration-300
              shadow-sm
            `}
          />
        </button>
        <span className={`ml-3 text-sm ${themeClasses.textSecondary}`}>
          🌙
        </span>
      </div>
    );
  }

  // Default button variant
  return (
    <button
      onClick={toggleTheme}
      className={`
        w-10 
        h-10
        ${themeClasses.inputBg} 
        ${themeClasses.border} 
        border 
        rounded-full 
        ${themeClasses.hoverBg} 
        transition-all 
        duration-300 
        flex 
        items-center 
        justify-center 
        focus:outline-none 
        focus:ring-2 
        focus:ring-orange-500 
        focus:ring-offset-2
        hover:scale-105
        active:scale-95
        ${className}
      `}
      title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <span className="transition-transform duration-300 hover:rotate-12">
        {isDarkMode ? '🌙' : '☀️'}
      </span>
    </button>
  );
};

export default ThemeToggle;