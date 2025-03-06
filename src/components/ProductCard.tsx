
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '@/lib/data';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Plus, Minus, Star, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  className?: string;
}

const ProductCard = ({ product, className }: ProductCardProps) => {
  const { addToCart, cartItems, updateQuantity, removeFromCart } = useCart();
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [selectedWeight, setSelectedWeight] = useState('default');
  const [showWeightOptions, setShowWeightOptions] = useState(false);
  
  const cartItem = cartItems.find(item => 
    item.product.id === product.id && 
    item.product.selectedWeight === product.weightOptions?.find(opt => opt.value === selectedWeight)?.label
  );
  const isInCart = !!cartItem;
  
  // Get the selected weight option
  const selectedOption = product.weightOptions?.find(opt => opt.value === selectedWeight) || 
                         (product.weightOptions ? product.weightOptions[0] : { label: 'Regular Size', value: 'default', priceModifier: 0 });
  
  // Calculate final price with weight modifier
  const basePrice = product.discount 
    ? product.price * (1 - product.discount / 100) 
    : product.price;
  const finalPrice = basePrice * (1 + selectedOption.priceModifier);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Create a modified product with the selected weight option
    const productWithOptions = {
      ...product,
      selectedWeight: selectedOption.label,
      price: product.price * (1 + selectedOption.priceModifier)
    };
    
    addToCart(productWithOptions);
  };

  const handleIncreaseQuantity = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (cartItem) {
      updateQuantity(product.id, cartItem.quantity + 1);
    }
  };

  const handleDecreaseQuantity = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (cartItem && cartItem.quantity > 1) {
      updateQuantity(product.id, cartItem.quantity - 1);
    } else if (cartItem) {
      removeFromCart(product.id);
    }
  };

  const handleWeightSelect = (e: React.MouseEvent, value: string) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedWeight(value);
    setShowWeightOptions(false);
  };

  return (
    <Link 
      to={`/product/${product.id}`}
      className={cn(
        "group relative flex flex-col bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-smooth",
        className
      )}
    >
      <div className="relative aspect-square overflow-hidden bg-muted">
        {!isImageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-muted">
            <div className="animate-pulse-slow w-full h-full bg-muted-foreground/10"></div>
          </div>
        )}
        <img
          src={product.image}
          alt={product.name}
          className={cn(
            "object-cover w-full h-full transition-all duration-500 group-hover:scale-105",
            !isImageLoaded && "opacity-0",
            isImageLoaded && "opacity-100"
          )}
          onLoad={() => setIsImageLoaded(true)}
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isNew && (
            <span className="bg-primary text-white text-xs px-2 py-1 rounded-full animate-fade-in">
              New
            </span>
          )}
          {product.discount && (
            <span className="bg-destructive text-white text-xs px-2 py-1 rounded-full animate-fade-in">
              {product.discount}% OFF
            </span>
          )}
        </div>
      </div>
      
      <div className="flex flex-col p-4 flex-grow">
        <div className="flex items-start justify-between mb-1">
          <h3 className="font-medium line-clamp-1">{product.name}</h3>
          <div className="flex items-center text-amber-500 ml-2 text-sm">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span className="ml-1">{product.rating}</span>
          </div>
        </div>
        
        <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
          {product.description}
        </p>
        
        {/* Weight/Size Selector */}
        {product.weightOptions && (
          <div className="relative mb-2 text-sm z-10">
            <button
              className="w-full flex items-center justify-between border rounded-md px-2 py-1 bg-background hover:bg-muted transition-colors text-xs"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setShowWeightOptions(!showWeightOptions);
              }}
            >
              <span>{selectedOption.label}</span>
              <ChevronDown className="h-3 w-3 text-muted-foreground" />
            </button>
            
            {showWeightOptions && (
              <div className="absolute z-20 mt-1 w-full bg-background border rounded-md shadow-lg">
                {product.weightOptions.map((option) => (
                  <button
                    key={option.value}
                    className="w-full text-left px-2 py-1 hover:bg-muted text-xs"
                    onClick={(e) => handleWeightSelect(e, option.value)}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
        
        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-center">
            <span className="font-medium">
              ${finalPrice.toFixed(2)}
            </span>
            {product.discount && (
              <span className="text-sm text-muted-foreground line-through ml-2">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>
          
          {isInCart ? (
            <div className="flex items-center">
              <Button 
                variant="outline" 
                size="icon" 
                className="h-8 w-8 rounded-full"
                onClick={handleDecreaseQuantity}
              >
                <Minus className="h-3.5 w-3.5" />
              </Button>
              <span className="mx-2 text-sm font-medium min-w-6 text-center">
                {cartItem.quantity}
              </span>
              <Button 
                variant="outline" 
                size="icon" 
                className="h-8 w-8 rounded-full"
                onClick={handleIncreaseQuantity}
              >
                <Plus className="h-3.5 w-3.5" />
              </Button>
            </div>
          ) : (
            <Button 
              size="sm" 
              className="rounded-full"
              onClick={handleAddToCart}
            >
              <ShoppingBag className="h-4 w-4 mr-1" />
              Add
            </Button>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
