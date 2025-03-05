
import React from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Calendar, CreditCard, Truck } from 'lucide-react';

interface OrderSummaryProps {
  subtotal: number;
  deliveryFee: number;
  total: number;
  onPlaceOrder: () => void;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  subtotal,
  deliveryFee,
  total,
  onPlaceOrder,
}) => {
  return (
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
        onClick={onPlaceOrder}
      >
        Place Order
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
      
      <div className="text-sm text-muted-foreground mt-4">
        By placing your order, you agree to our <span className="text-primary cursor-pointer">Terms of Service</span> and <span className="text-primary cursor-pointer">Privacy Policy</span>
      </div>
    </div>
  );
};

export default OrderSummary;
