// DesabilitarNomeContext.js
import React, { createContext, useState } from 'react';

const DesabilitarNomeContext = createContext();

const DesabilitarNomeProvider = ({ children }) => {
  const [DesabilitarNome, setDesabilitarNome] = useState(true);

  return (
    <DesabilitarNomeContext.Provider value={{ DesabilitarNome, setDesabilitarNome }}>
      {children}
    </DesabilitarNomeContext.Provider>
  );
};

export { DesabilitarNomeProvider, DesabilitarNomeContext };