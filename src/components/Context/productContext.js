import { createContext } from 'react';
import { useState } from 'react';

export const proveedorContext = createContext();

export const ProveedorProvider = ({ children }) => {
  const [proveedor, setproveedor] = useState('FDFDF');
  return (
    <proveedorContext.Provider value={[proveedor, setproveedor]}>
      {children}
    </proveedorContext.Provider>
  );
};
