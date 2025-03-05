
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Timer, Truck, Wallet, CreditCard, Receipt, Check } from 'lucide-react';
import { toast } from 'sonner';
import { ScrollArea } from '@/components/ui/scroll-area';

type DeliveryOption = {
  id: string;
  title: string;
  price: number;
  time: string;
};

type PaymentMethod = {
  id: string;
  title: string;
  icon: React.ElementType;
};

const deliveryOptions: DeliveryOption[] = [
  {
    id: 'express',
    title: 'Express Delivery',
    price: 50,
    time: '10 minutes',
  },
  {
    id: 'standard',
    title: 'Standard Delivery',
    price: 20,
    time: '30 minutes',
  },
];

const paymentMethods: PaymentMethod[] = [
  {
    id: 'cash',
    title: 'Cash on Delivery',
    icon: Wallet,
  },
  {
    id: 'upi',
    title: 'UPI',
    icon: CreditCard,
  },
  {
    id: 'wallet',
    title: 'Wallet',
    icon: Receipt,
  },
];

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, getCartTotal, clearCart } = useCart();
  const [selectedDelivery, setSelectedDelivery] = useState<string>(deliveryOptions[0].id);
  const [selectedPayment, setSelectedPayment] = useState<string>(paymentMethods[0].id);
  
  // Calculate totals
  const subtotal = getCartTotal();
  const deliveryFee = deliveryOptions.find(option => option.id === selectedDelivery)?.price || 0;
  const total = subtotal + deliveryFee;
  
  const handlePlaceOrder = () => {
    // Here we would connect to a payment gateway or API
    toast.success('Order placed successfully!');
    clearCart();
    navigate('/orders');
  };
  
  return (
    <div className="min-h-screen pt-16 pb-20 px-4 md:px-6 max-w-7xl mx-auto">
      <div className="flex items-center gap-2 mb-6 mt-8">
        <Button variant="ghost" size="icon" onClick={() => navigate('/cart')}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-medium">Checkout</h1>
      </div>
      
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Delivery Options */}
          <div className="bg-card shadow-sm rounded-xl p-6">
            <h2 className="text-lg font-medium mb-4">Delivery Options</h2>
            <Separator className="mb-4" />
            
            <div className="space-y-3">
              {deliveryOptions.map((option) => (
                <div 
                  key={option.id}
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${
                    selectedDelivery === option.id 
                      ? 'border-primary bg-primary/5' 
                      : 'border-border hover:border-primary/50'
                  }`}
                  onClick={() => setSelectedDelivery(option.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        selectedDelivery === option.id ? 'bg-primary text-primary-foreground' : 'bg-muted'
                      }`}>
                        {selectedDelivery === option.id ? (
                          <Check className="h-5 w-5" />
                        ) : (
                          <Timer className="h-5 w-5" />
                        )}
                      </div>
                      <div>
                        <div className="font-medium">{option.title}</div>
                        <div className="text-sm text-muted-foreground flex items-center gap-1">
                          <Truck className="h-3 w-3" />
                          <span>Delivery in {option.time}</span>
                        </div>
                      </div>
                    </div>
                    <div className="font-medium">₹{option.price}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Payment Methods */}
          <div className="bg-card shadow-sm rounded-xl p-6">
            <h2 className="text-lg font-medium mb-4">Payment Method</h2>
            <Separator className="mb-4" />
            
            <div className="space-y-3">
              {paymentMethods.map((method) => {
                const Icon = method.icon;
                return (
                  <div 
                    key={method.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-all ${
                      selectedPayment === method.id 
                        ? 'border-primary bg-primary/5' 
                        : 'border-border hover:border-primary/50'
                    }`}
                    onClick={() => setSelectedPayment(method.id)}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        selectedPayment === method.id ? 'bg-primary text-primary-foreground' : 'bg-muted'
                      }`}>
                        {selectedPayment === method.id ? (
                          <Check className="h-5 w-5" />
                        ) : (
                          <Icon className="h-5 w-5" />
                        )}
                      </div>
                      <div className="font-medium">{method.title}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Order Items */}
          <div className="bg-card shadow-sm rounded-xl p-6">
            <h2 className="text-lg font-medium mb-4">Order Items ({cartItems.length})</h2>
            <Separator className="mb-4" />
            
            <ScrollArea className="h-[200px]">
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.product.id} className="flex items-center gap-4">
                    <div className="h-16 w-16 rounded-md overflow-hidden bg-muted">
                      <img 
                        src={item.product.image} 
                        alt={item.product.name} 
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{item.product.name}</div>
                      <div className="text-sm text-muted-foreground">
                        Qty: {item.quantity} × ${item.product.price.toFixed(2)}
                      </div>
                    </div>
                    <div className="font-medium">
                      ${(item.quantity * item.product.price).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
        
        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-card shadow-sm rounded-xl p-6 sticky top-24">
            <h2 className="text-lg font-medium mb-4">Order Summary</h2>
            <Separator className="mb-4" />
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Delivery Fee</span>
                <span>${deliveryFee.toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-medium text-lg">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            
            <Button 
              size="lg"
              className="w-full mb-4"
              onClick={handlePlaceOrder}
            >
              Place Order
            </Button>
            
            <div className="text-sm text-muted-foreground">
              By placing your order, you agree to our <span className="text-primary cursor-pointer">Terms of Service</span> and <span className="text-primary cursor-pointer">Privacy Policy</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
