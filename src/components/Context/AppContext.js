// you can create some help such as the AppProvider and the useAppContext hook
import { createContext, useContext, useState } from 'react';

export const AppContext = createContext({});

export const AppProvider = ({ initialState = { search: '' }, children }) => {
  const [search, setSearch] = useState(initialState);
  return (
    <AppContext.Provider value={[search, setSearch]}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
