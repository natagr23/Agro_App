import React, { createContext, useState } from 'react';

const PersonalInfoContext = createContext();

const PersonalInfoProvider = ({ value, children }) => {
  const [provider, setProvider] = useState(value);

  return (
    <PersonalInfoContext.Provider value={{ provider, setProvider }}>
      {children}
    </PersonalInfoContext.Provider>
  );
};

export { PersonalInfoProvider, PersonalInfoContext };
