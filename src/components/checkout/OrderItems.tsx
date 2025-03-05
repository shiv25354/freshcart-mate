
import React from 'react';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CartItem } from '@/context/CartContext';

interface OrderItemsProps {
  cartItems: CartItem[];
}

const OrderItems: React.FC<OrderItemsProps> = ({ cartItems }) => {
  return (
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
  );
};

export default OrderItems;
