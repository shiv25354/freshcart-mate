import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import CartItem from '@/components/CartItem';
import { Button } from '@/components/ui/button';
import { ShoppingBag, ArrowRight, Truck, Calendar, CreditCard } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/lib/toast';

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, clearCart, getCartTotal } = useCart();
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);
  
  const cartTotal = getCartTotal();
  const shippingFee = cartTotal > 30 ? 0 : 4.99;
  const orderTotal = cartTotal + shippingFee;
  const isEmpty = cartItems.length === 0;

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen pt-16 pb-20 px-4 md:px-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-medium mt-8 mb-6">Your Cart</h1>
      
      {isLoading ? (
        <div className="grid gap-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-24 bg-muted animate-pulse rounded-lg"></div>
          ))}
        </div>
      ) : isEmpty ? (
        <div className="flex flex-col items-center justify-center py-16">
          <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-6">
            <ShoppingBag className="h-10 w-10 text-muted-foreground" />
          </div>
          <h2 className="text-xl font-medium mb-2">Your cart is empty</h2>
          <p className="text-muted-foreground mb-6">
            Looks like you haven't added any items to your cart yet.
          </p>
          <Button
            size="lg"
            onClick={() => navigate('/')}
          >
            Continue Shopping
          </Button>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-card shadow-sm rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium">Cart Items ({cartItems.length})</h2>
                <Button variant="ghost" size="sm" onClick={clearCart}>
                  Clear Cart
                </Button>
              </div>
              
              <Separator className="mb-4" />
              
              {cartItems.map((item) => (
                <div key={item.product.id}>
                  <CartItem item={item} />
                  <Separator className="my-4" />
                </div>
              ))}
              
              <div className="mt-4">
                <Button
                  variant="outline"
                  onClick={() => navigate('/')}
                  className="w-full sm:w-auto"
                >
                  Continue Shopping
                </Button>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <div className="bg-card shadow-sm rounded-xl p-6 sticky top-24">
              <h2 className="text-lg font-medium mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>{shippingFee === 0 ? 'Free' : `$${shippingFee}`}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-medium text-lg">
                  <span>Total</span>
                  <span>${orderTotal.toFixed(2)}</span>
                </div>
              </div>
              
              <Button 
                size="lg"
                className="w-full mb-4"
                onClick={handleCheckout}
              >
                Proceed to Checkout
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              
              <div className="space-y-3 text-sm">
                <div className="flex items-center">
                  <Truck className="h-4 w-4 mr-2 text-primary" />
                  <span>Free delivery on orders over $30</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-primary" />
                  <span>Estimated delivery: 1-3 business days</span>
                </div>
                <div className="flex items-center">
                  <CreditCard className="h-4 w-4 mr-2 text-primary" />
                  <span>Secure payment processing</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
