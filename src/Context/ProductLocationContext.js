import React, { createContext, useState } from 'react';

const PersonalInfoContext = createContext();

const PersonalInfoProvider = ({ value, children }) => {
  const [provider1, setProvider1] = useState(value);

  return (
    <PersonalInfoContext.Provider value={{ provider1, setProvider1 }}>
      {children}
    </PersonalInfoContext.Provider>
  );
};

export { PersonalInfoProvider, PersonalInfoContext };
