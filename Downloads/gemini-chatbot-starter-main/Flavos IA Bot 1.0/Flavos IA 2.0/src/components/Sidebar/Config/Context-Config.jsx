import { createContext, useState } from 'react';

const SettingsContext = createContext();

const SettingsProvider = ({ children }) => {
  const [showSettings, setShowSettings] = useState(false);

  return (
    <SettingsContext.Provider value={{ showSettings, setShowSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

export { SettingsProvider, SettingsContext };