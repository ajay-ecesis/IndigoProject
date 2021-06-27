import { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export function AppWrapper({ children }) {
    const [regBrand,setregBrand] = useState("");
    const [regmanufacture,setregmanufacture] = useState("");

  return (
    <AppContext.Provider value={{regBrand,setregBrand,regmanufacture,setregmanufacture}}  >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}