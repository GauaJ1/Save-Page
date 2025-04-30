import { createContext, useState, useContext } from 'react';

const ResponseContext = createContext();

const ResponseProvider = ({ children }) => {
  const [customResponse, setCustomResponse] = useState('');
  const [responseType, setResponseType] = useState(true);

  return (
    <ResponseContext.Provider value={{ customResponse, setCustomResponse, responseType, setResponseType }}>
      {children}
    </ResponseContext.Provider>
  );
};

export { ResponseProvider, ResponseContext };