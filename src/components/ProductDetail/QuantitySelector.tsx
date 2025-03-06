
import { Button } from '@/components/ui/button';
import { ShoppingBag, Plus, Minus } from 'lucide-react';

interface QuantitySelectorProps {
  isInCart: boolean;
  quantity?: number;
  onAddToCart: () => void;
  onIncrease?: () => void;
  onDecrease?: () => void;
}

const QuantitySelector = ({ 
  isInCart, 
  quantity = 0, 
  onAddToCart, 
  onIncrease, 
  onDecrease 
}: QuantitySelectorProps) => {
  return (
    <div className="flex items-center mb-8">
      {isInCart ? (
        <div className="flex items-center">
          <Button 
            variant="outline" 
            size="icon" 
            className="h-10 w-10 rounded-full"
            onClick={onDecrease}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="mx-4 text-lg font-medium min-w-8 text-center">
            {quantity}
          </span>
          <Button 
            variant="outline" 
            size="icon" 
            className="h-10 w-10 rounded-full"
            onClick={onIncrease}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <Button 
          size="lg" 
          className="rounded-full"
          onClick={onAddToCart}
        >
          <ShoppingBag className="h-5 w-5 mr-2" />
          Add to Cart
        </Button>
      )}
    </div>
  );
};

export default QuantitySelector;
