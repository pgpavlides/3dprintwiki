import React, { useEffect, useState } from 'react';

export const FontToggle: React.FC = () => {
  const [isDyslexic, setIsDyslexic] = useState<boolean>(false);

  useEffect(() => {
    // Initialize font preference from localStorage
    const savedFont = localStorage.getItem('font-preference');
    const useDyslexicFont = savedFont === 'dyslexic';
    setIsDyslexic(useDyslexicFont);
    
    // Apply font to document
    if (useDyslexicFont) {
      document.documentElement.classList.add('font-dyslexic');
    } else {
      document.documentElement.classList.remove('font-dyslexic');
    }
  }, []);

  const toggleFont = () => {
    const newFontPreference = !isDyslexic;
    setIsDyslexic(newFontPreference);
    
    // Update document and localStorage
    if (newFontPreference) {
      document.documentElement.classList.add('font-dyslexic');
      localStorage.setItem('font-preference', 'dyslexic');
    } else {
      document.documentElement.classList.remove('font-dyslexic');
      localStorage.setItem('font-preference', 'default');
    }
  };

  return (
    <button
      type="button"
      onClick={toggleFont}
      className="relative w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
      aria-label={`Switch to ${isDyslexic ? 'default' : 'dyslexic'} font`}
      title={`Switch to ${isDyslexic ? 'default' : 'dyslexic'} font`}
    >
      <span className={`font-bold text-gray-800 dark:text-gray-200 text-sm ${isDyslexic ? 'font-opendyslexic' : 'font-roboto'}`}>
        Aa
      </span>
      {isDyslexic && (
        <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
          D
        </span>
      )}
    </button>
  );
};
