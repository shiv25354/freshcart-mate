import { Routes, Route } from 'react-router-dom';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Index from '@/pages/Index';
import NotFound from '@/pages/NotFound';
import Search from '@/pages/Search';
import Cart from '@/pages/Cart';
import Checkout from '@/pages/Checkout';
import Orders from '@/pages/Orders';
import Profile from '@/pages/Profile';
import ProductDetail from '@/pages/ProductDetail';
import TrackOrder from '@/pages/TrackOrder';
import OrderSuccess from '@/pages/OrderSuccess';
import BottomNavigation from '@/components/BottomNavigation';

const queryClient = new QueryClient();

const AppRoutes = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="pb-20"> {/* Add padding at the bottom to account for the fixed navigation */}
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/search" element={<Search />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/track-order/:id" element={<TrackOrder />} />
            <Route path="/order-success" element={<OrderSuccess />} />
            <Route path="/category/:id" element={<Search />} />
            <Route path="/featured" element={<Search />} />
            <Route path="/new" element={<Search />} />
            <Route path="/offers" element={<Search />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <BottomNavigation />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default AppRoutes; 