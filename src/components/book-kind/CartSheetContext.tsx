import React, { createContext, useContext, useState } from 'react';

interface CartSheetContextType {
  open: boolean;
  setOpen: (v: boolean) => void;
}

const CartSheetContext = createContext<CartSheetContextType | undefined>(undefined);

export function useCartSheet() {
  const ctx = useContext(CartSheetContext);
  if (!ctx) throw new Error('useCartSheet must be used within CartSheetProvider');
  return ctx;
}

export function CartSheetProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <CartSheetContext.Provider value={{ open, setOpen }}>
      {children}
    </CartSheetContext.Provider>
  );
}
