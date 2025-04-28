import { BrowserRouter } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import AppRoutes from '@/routes';
import { CartProvider } from '@/context/CartContext';

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <CartProvider>
          <AppRoutes />
          <Toaster />
        </CartProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
