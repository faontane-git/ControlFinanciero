// Crea un archivo context/FinanzasContext.tsx
import React, { createContext, useState, useContext } from 'react';
import { Movimiento } from './types';
 
type FinanzasContextType = {
  movimientos: Movimiento[];
  agregarMovimiento: (movimiento: Movimiento) => void;
};

const FinanzasContext = createContext<FinanzasContextType>({
  movimientos: [],
  agregarMovimiento: () => {},
});

export const FinanzasProvider = ({ children }: { children: React.ReactNode }) => {
  const [movimientos, setMovimientos] = useState<Movimiento[]>([]);

  const agregarMovimiento = (movimiento: Movimiento) => {
    setMovimientos([...movimientos, movimiento]);
  };

  return (
    <FinanzasContext.Provider value={{ movimientos, agregarMovimiento }}>
      {children}
    </FinanzasContext.Provider>
  );
};

export const useFinanzas = () => useContext(FinanzasContext);