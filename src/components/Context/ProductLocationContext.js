import React, { createContext, useState } from 'react';

const PersonalInfoContext = createContext();

const PersonalInfoProvider = ({ value, children }) => {
  const [info, setInfo] = useState(value);

  return (
    <PersonalInfoContext.Provider value={{ info, setInfo }}>
      {children}
    </PersonalInfoContext.Provider>
  );
};

export { PersonalInfoProvider, PersonalInfoContext };
