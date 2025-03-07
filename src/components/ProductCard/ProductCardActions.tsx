
import { Button } from '@/components/ui/button';
import { ShoppingBag, Plus, Minus } from 'lucide-react';

interface ProductCardActionsProps {
  isInCart: boolean;
  quantity?: number;
  onAddToCart: (e: React.MouseEvent) => void;
  onIncreaseQuantity: (e: React.MouseEvent) => void;
  onDecreaseQuantity: (e: React.MouseEvent) => void;
}

const ProductCardActions = ({
  isInCart,
  quantity = 0,
  onAddToCart,
  onIncreaseQuantity,
  onDecreaseQuantity
}: ProductCardActionsProps) => {
  return (
    <>
      {isInCart ? (
        <div className="flex items-center">
          <Button 
            variant="outline" 
            size="icon" 
            className="h-8 w-8 rounded-full"
            onClick={onDecreaseQuantity}
          >
            <Minus className="h-3.5 w-3.5" />
          </Button>
          <span className="mx-2 text-sm font-medium min-w-6 text-center">
            {quantity}
          </span>
          <Button 
            variant="outline" 
            size="icon" 
            className="h-8 w-8 rounded-full"
            onClick={onIncreaseQuantity}
          >
            <Plus className="h-3.5 w-3.5" />
          </Button>
        </div>
      ) : (
        <Button 
          size="sm" 
          className="rounded-full"
          onClick={onAddToCart}
        >
          <ShoppingBag className="h-4 w-4 mr-1" />
          Add
        </Button>
      )}
    </>
  );
};

export default ProductCardActions;
