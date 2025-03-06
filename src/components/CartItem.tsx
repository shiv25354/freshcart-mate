
import { Product } from '@/lib/data';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Trash, Plus, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CartItemProps {
  item: {
    product: Product & { selectedWeight?: string };
    quantity: number;
  };
  className?: string;
}

const CartItem = ({ item, className }: CartItemProps) => {
  const { updateQuantity, removeFromCart } = useCart();
  const { product, quantity } = item;
  
  const finalPrice = product.discount 
    ? product.price * (1 - product.discount / 100) 
    : product.price;
  
  const totalPrice = finalPrice * quantity;

  return (
    <div className={cn(
      "flex items-center py-4 space-x-4",
      className
    )}>
      <div className="h-20 w-20 relative rounded-md overflow-hidden bg-muted flex-shrink-0">
        <img 
          src={product.image} 
          alt={product.name} 
          className="object-cover w-full h-full"
        />
      </div>
      
      <div className="flex-grow min-w-0">
        <h3 className="font-medium truncate">{product.name}</h3>
        
        {/* Display selected weight if available */}
        {product.selectedWeight && (
          <div className="text-xs text-muted-foreground mt-1">
            Size: {product.selectedWeight}
          </div>
        )}
        
        <div className="flex items-center mt-1 text-sm text-muted-foreground">
          <span>${finalPrice.toFixed(2)} each</span>
          {product.discount && (
            <span className="line-through ml-2">${product.price.toFixed(2)}</span>
          )}
        </div>
        
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center border rounded-full">
            <Button 
              variant="ghost" 
              size="icon"
              className="h-8 w-8 rounded-full"
              onClick={() => {
                if (quantity > 1) {
                  updateQuantity(product.id, quantity - 1);
                } else {
                  removeFromCart(product.id);
                }
              }}
            >
              <Minus className="h-3.5 w-3.5" />
            </Button>
            <span className="mx-2 text-sm font-medium min-w-6 text-center">
              {quantity}
            </span>
            <Button 
              variant="ghost" 
              size="icon"
              className="h-8 w-8 rounded-full"
              onClick={() => updateQuantity(product.id, quantity + 1)}
            >
              <Plus className="h-3.5 w-3.5" />
            </Button>
          </div>
          
          <div className="flex items-center">
            <span className="font-medium">${totalPrice.toFixed(2)}</span>
            <Button 
              variant="ghost" 
              size="icon"
              className="h-8 w-8 rounded-full ml-2 text-destructive hover:text-destructive/80"
              onClick={() => removeFromCart(product.id)}
            >
              <Trash className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
