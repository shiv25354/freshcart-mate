
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '@/lib/data';
import { useCart } from '@/context/CartContext';
import { cn } from '@/lib/utils';

import ProductCardImage from './ProductCard/ProductCardImage';
import ProductCardInfo from './ProductCard/ProductCardInfo';
import ProductCardWeightSelector from './ProductCard/ProductCardWeightSelector';
import ProductCardPrice from './ProductCard/ProductCardPrice';
import ProductCardActions from './ProductCard/ProductCardActions';

interface ProductCardProps {
  product: Product;
  className?: string;
}

const ProductCard = ({ product, className }: ProductCardProps) => {
  const { addToCart, cartItems, updateQuantity, removeFromCart } = useCart();
  const [selectedWeight, setSelectedWeight] = useState('default');
  
  // Get the selected weight option
  const selectedOption = product.weightOptions?.find(opt => opt.value === selectedWeight) || 
                         (product.weightOptions ? product.weightOptions[0] : { label: 'Regular Size', value: 'default', priceModifier: 0 });
  
  // Calculate final price with weight modifier
  const basePrice = product.discount 
    ? product.price * (1 - product.discount / 100) 
    : product.price;
  const finalPrice = basePrice * (1 + selectedOption.priceModifier);

  // Check if product is in cart
  const cartItem = cartItems.find(item => 
    item.product.id === product.id && 
    item.product.selectedWeight === product.weightOptions?.find(opt => opt.value === selectedWeight)?.label
  );
  const isInCart = !!cartItem;

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

  return (
    <Link 
      to={`/product/${product.id}`}
      className={cn(
        "group relative flex flex-col bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-smooth",
        className
      )}
    >
      <ProductCardImage 
        image={product.image} 
        name={product.name} 
        isNew={product.isNew} 
        discount={product.discount} 
      />
      
      <div className="flex flex-col p-4 flex-grow">
        <ProductCardInfo 
          name={product.name} 
          description={product.description} 
          rating={product.rating} 
        />
        
        {product.weightOptions && (
          <ProductCardWeightSelector 
            weightOptions={product.weightOptions} 
            selectedWeight={selectedWeight} 
            onWeightSelect={setSelectedWeight} 
          />
        )}
        
        <div className="mt-auto flex items-center justify-between">
          <ProductCardPrice 
            price={finalPrice} 
            originalPrice={product.price} 
            showDiscount={!!product.discount} 
          />
          
          <ProductCardActions 
            isInCart={isInCart} 
            quantity={cartItem?.quantity} 
            onAddToCart={handleAddToCart} 
            onIncreaseQuantity={handleIncreaseQuantity} 
            onDecreaseQuantity={handleDecreaseQuantity} 
          />
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
