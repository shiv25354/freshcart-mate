
import React from 'react';
import { CartProvider } from '@/context/CartContext';
import { Toaster } from '@/components/ui/sonner';

interface ProvidersProps {
  children: React.ReactNode;
}

const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <CartProvider>
      {children}
      <Toaster />
    </CartProvider>
  );
};

export default Providers;
