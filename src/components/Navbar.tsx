
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  ShoppingBag, 
  User, 
  Menu, 
  X, 
  Home,
  Search
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Navbar = () => {
  const location = useLocation();
  const { getCartCount } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const cartCount = getCartCount();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { path: "/", label: "Home", icon: Home },
    { path: "/search", label: "Browse", icon: Search },
    { path: "/profile", label: "Profile", icon: User },
    { path: "/cart", label: "Cart", icon: ShoppingBag, count: cartCount }
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 px-6 ${
        isScrolled 
          ? 'bg-background/90 backdrop-blur-md shadow-sm' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link 
          to="/" 
          className="text-2xl font-semibold flex items-center transition-smooth"
        >
          <span className="text-primary">Fresh</span>
          <span>Cart</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`flex items-center relative transition-smooth hover:text-primary ${
                location.pathname === link.path 
                  ? 'text-primary font-medium' 
                  : 'text-foreground/80'
              }`}
            >
              <link.icon className="w-5 h-5 mr-1.5" />
              <span>{link.label}</span>
              {link.count && link.count > 0 && (
                <span className="absolute -top-2 -right-4 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {link.count}
                </span>
              )}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Trigger */}
        <div className="flex items-center md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Menu className="h-6 w-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent className="w-[270px] p-6">
              <SheetHeader>
                <SheetTitle className="text-left flex items-center">
                  <span className="text-primary">Fresh</span>
                  <span>Cart</span>
                </SheetTitle>
              </SheetHeader>
              <nav className="mt-8 flex flex-col space-y-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`flex items-center transition-smooth text-lg ${
                      location.pathname === link.path 
                        ? 'text-primary font-medium' 
                        : 'text-foreground/80'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <link.icon className="w-5 h-5 mr-3" />
                    <span>{link.label}</span>
                    {link.count && link.count > 0 && (
                      <span className="ml-auto bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {link.count}
                      </span>
                    )}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
