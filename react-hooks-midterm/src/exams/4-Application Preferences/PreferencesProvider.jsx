import { useState } from 'react';
import { PreferencesContext } from './PreferencesContext';

export function PreferencesProvider({ children }) {
  const [theme, setTheme] = useState('light');
  const [fontSize, setFontSize] = useState(16);

  const toggleTheme = () => {
    setTheme((previousTheme) => (previousTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <PreferencesContext.Provider value={{ theme, toggleTheme, fontSize, setFontSize }}>
      {children}
    </PreferencesContext.Provider>
  );
}
