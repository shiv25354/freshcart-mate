import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '../lib/data';
import { toast } from "sonner";

export interface CartItem {
  product: Product & { selectedWeight?: string };
  quantity: number;
}

interface CartContextValue {
  cartItems: CartItem[];
  addToCart: (product: Product & { selectedWeight?: string }) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Load cart from localStorage on initial render
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      }
    } catch (error) {
      console.error('Failed to load cart from localStorage:', error);
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(cartItems));
    } catch (error) {
      console.error('Failed to save cart to localStorage:', error);
    }
  }, [cartItems]);

  const addToCart = (product: Product & { selectedWeight?: string }) => {
    setCartItems(prevItems => {
      // For products with weight options, check if that specific weight is already in cart
      const existingItem = prevItems.find(item => 
        item.product.id === product.id && 
        item.product.selectedWeight === product.selectedWeight
      );
      
      if (existingItem) {
        const weightInfo = product.selectedWeight ? ` (${product.selectedWeight})` : '';
        toast.success(`Added another ${product.name}${weightInfo} to cart`);
        return prevItems.map(item => 
          (item.product.id === product.id && item.product.selectedWeight === product.selectedWeight)
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      } else {
        const weightInfo = product.selectedWeight ? ` (${product.selectedWeight})` : '';
        toast.success(`Added ${product.name}${weightInfo} to cart`);
        return [...prevItems, { product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId: string) => {
    setCartItems(prevItems => {
      const removedItem = prevItems.find(item => item.product.id === productId);
      if (removedItem) {
        toast.info(`Removed ${removedItem.product.name} from cart`);
      }
      return prevItems.filter(item => item.product.id !== productId);
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.product.id === productId 
          ? { ...item, quantity } 
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    toast.info("Cart cleared");
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      // Use the product price directly, as it may already include weight-based modifications
      const price = item.product.discount 
        ? item.product.price * (1 - item.product.discount / 100) 
        : item.product.price;
      return total + price * item.quantity;
    }, 0);
  };

  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider 
      value={{ 
        cartItems, 
        addToCart, 
        removeFromCart, 
        updateQuantity, 
        clearCart, 
        getCartTotal,
        getCartCount
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
