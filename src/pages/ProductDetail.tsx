
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById, getProductsByCategory, Product, WeightOption } from '@/lib/data';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { toast } from '@/lib/toast';

// Import our new components
import ProductImage from '@/components/ProductDetail/ProductImage';
import ProductRating from '@/components/ProductDetail/ProductRating';
import WeightSelector from '@/components/ProductDetail/WeightSelector';
import ProductPrice from '@/components/ProductDetail/ProductPrice';
import QuantitySelector from '@/components/ProductDetail/QuantitySelector';
import ProductFeatures from '@/components/ProductDetail/ProductFeatures';
import RelatedProducts from '@/components/ProductDetail/RelatedProducts';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart, cartItems, updateQuantity, removeFromCart } = useCart();
  const [isLoading, setIsLoading] = useState(true);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [selectedWeight, setSelectedWeight] = useState<string>('default');
  
  const product = id ? getProductById(id) : undefined;
  const cartItem = product ? cartItems.find(
    item => item.product.id === product.id && 
    item.product.selectedWeight === product.weightOptions?.find(opt => opt.value === selectedWeight)?.label
  ) : undefined;
  const isInCart = !!cartItem;

  // Get weight options from product or use defaults
  const weightOptions: WeightOption[] = product?.weightOptions || [
    { label: 'Regular Size', value: 'default', priceModifier: 0 },
    { label: '500g', value: 'small', priceModifier: -0.25 },
    { label: '1kg', value: 'medium', priceModifier: 0.5 },
    { label: '2kg', value: 'large', priceModifier: 1.5 },
  ];
  
  useEffect(() => {
    if (!product) return;
    
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    // Get related products from the same category
    const related = getProductsByCategory(product.category)
      .filter(p => p.id !== product.id)
      .slice(0, 3);
    setRelatedProducts(related);
    
    return () => clearTimeout(timer);
  }, [product]);
  
  if (!product) {
    return (
      <div className="min-h-screen pt-20 px-4 max-w-7xl mx-auto flex flex-col items-center justify-center">
        <h2 className="text-2xl font-medium mb-4">Product not found</h2>
        <Button onClick={() => navigate(-1)}>Go Back</Button>
      </div>
    );
  }
  
  // Calculate price with weight option modifier
  const selectedOption = weightOptions.find(opt => opt.value === selectedWeight) || weightOptions[0];
  const basePrice = product.discount 
    ? product.price * (1 - product.discount / 100) 
    : product.price;
  const finalPrice = basePrice * (1 + selectedOption.priceModifier);

  const handleAddToCart = () => {
    // Create a modified product with the selected weight option
    const productWithOptions = {
      ...product,
      selectedWeight: selectedOption.label,
      // Adjust the price based on the selected weight
      price: product.price * (1 + selectedOption.priceModifier)
    };
    
    addToCart(productWithOptions);
  };

  const handleIncreaseQuantity = () => {
    if (cartItem) {
      updateQuantity(product.id, cartItem.quantity + 1);
    }
  };

  const handleDecreaseQuantity = () => {
    if (cartItem && cartItem.quantity > 1) {
      updateQuantity(product.id, cartItem.quantity - 1);
    } else if (cartItem) {
      removeFromCart(product.id);
    }
  };

  return (
    <div className="min-h-screen pt-16 pb-20 px-4 md:px-6 max-w-7xl mx-auto">
      <Button 
        variant="ghost" 
        className="mb-6 mt-4 -ml-3"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>
      
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {/* Product Image */}
        <ProductImage product={product} isLoading={isLoading} />
        
        {/* Product Info */}
        <div className={`flex flex-col transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
          <h1 className="text-3xl font-bold">{product.name}</h1>
          
          <ProductRating rating={product.rating} />
          
          {/* Weight/Size Options */}
          <WeightSelector 
            weightOptions={weightOptions}
            selectedWeight={selectedWeight}
            onWeightChange={setSelectedWeight}
          />
          
          <ProductPrice 
            finalPrice={finalPrice}
            originalPrice={product.price}
            discount={product.discount}
            basePrice={basePrice}
          />
          
          <p className="text-muted-foreground mb-6">{product.description}</p>
          
          {/* Add to Cart */}
          <QuantitySelector 
            isInCart={isInCart}
            quantity={cartItem?.quantity}
            onAddToCart={handleAddToCart}
            onIncrease={handleIncreaseQuantity}
            onDecrease={handleDecreaseQuantity}
          />
          
          {/* Features */}
          <ProductFeatures />
        </div>
      </div>
      
      {/* Related Products */}
      <RelatedProducts products={relatedProducts} />
    </div>
  );
};

export default ProductDetail;
