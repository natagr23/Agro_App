import { useContext, createContext } from "react";

const AppContext = createContext();

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { useGlobalContext, AppContext };
