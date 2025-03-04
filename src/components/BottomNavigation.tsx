
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, ShoppingCart, ClipboardList, UserRound } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCart } from '@/context/CartContext';
import { BasketButton } from '@/components/ui/button';

const navItems = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/search', label: 'Browse', icon: Search },
  { path: '/cart', label: 'Cart', icon: ShoppingCart },
  { path: '/orders', label: 'Orders', icon: ClipboardList },
  { path: '/profile', label: 'Profile', icon: UserRound },
];

const BottomNavigation = () => {
  const location = useLocation();
  const { getCartCount, getCartTotal } = useCart();
  const cartCount = getCartCount();
  const cartTotal = getCartTotal();
  const currentPath = location.pathname;
  
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex flex-col items-center">
      {/* View Basket Button */}
      {cartCount > 0 && (
        <div className="mb-2 px-4 w-full flex justify-center">
          <BasketButton
            as={Link}
            to="/cart"
            isOpen={true}
            count={cartCount}
            total={cartTotal}
            className="shadow-lg"
            >
            <ShoppingCart className="mr-1" />
            View Basket
          </BasketButton>
        </div>
      )}
      
      {/* Navigation Bar */}
      <nav className="w-full max-w-lg mx-auto bg-white/80 backdrop-blur-lg border border-gray-200 shadow-lg rounded-t-xl px-2 py-1">
        <ul className="flex justify-between sm:gap-2 px-2">
          {navItems.map((item) => {
            const isActive = currentPath === item.path;
            const Icon = item.icon;
            
            return (
              <li key={item.path} className="w-full">
                <Link 
                  to={item.path}
                  className={cn(
                    "flex flex-col sm:flex-row items-center justify-center gap-1 py-2 px-1 sm:px-3 rounded-lg transition-all duration-300",
                    isActive 
                      ? "text-primary font-medium" 
                      : "text-gray-500 hover:text-gray-700 hover:bg-gray-100/50"
                  )}
                >
                  <Icon 
                    size={20} 
                    className={cn(
                      "transition-all duration-300",
                      isActive ? "animate-float" : ""
                    )} 
                  />
                  <span className="text-xs sm:text-sm">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default BottomNavigation;
