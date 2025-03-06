
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById, getProductsByCategory, Product } from '@/lib/data';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/ProductCard';
import { 
  ShoppingBag, 
  Plus, 
  Minus, 
  Star, 
  ArrowLeft, 
  Truck,
  ShieldCheck,
  RefreshCw,
  Leaf,
  ChevronDown
} from 'lucide-react';

// Weight/size options type
interface WeightOption {
  label: string;
  value: string;
  priceModifier: number;
}

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart, cartItems, updateQuantity, removeFromCart } = useCart();
  const [isLoading, setIsLoading] = useState(true);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [selectedWeight, setSelectedWeight] = useState<string>('default');
  const [showWeightOptions, setShowWeightOptions] = useState(false);
  
  const product = id ? getProductById(id) : undefined;
  const cartItem = product ? cartItems.find(item => item.product.id === product.id) : undefined;
  const isInCart = !!cartItem;

  // Define weight/size options based on product category
  const weightOptions: WeightOption[] = [
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
        <div className="relative overflow-hidden rounded-xl bg-muted">
          {isLoading ? (
            <div className="aspect-square animate-pulse-slow bg-muted-foreground/10"></div>
          ) : (
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover aspect-square animate-fade-in"
            />
          )}
          
          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {product.isNew && (
              <span className="bg-blue-500 text-white px-3 py-1 rounded-full flex items-center text-sm">
                <span className="mr-1">🆕</span> New
              </span>
            )}
            {product.discount && (
              <span className="bg-destructive text-white px-3 py-1 rounded-full flex items-center text-sm">
                <span className="mr-1">🔥</span> {product.discount}% OFF
              </span>
            )}
            {product.category === 'vegetables' && (
              <span className="bg-green-500 text-white px-3 py-1 rounded-full flex items-center text-sm">
                <Leaf className="w-3.5 h-3.5 mr-1" /> Organic
              </span>
            )}
          </div>
        </div>
        
        {/* Product Info */}
        <div className={`flex flex-col transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
          <h1 className="text-3xl font-bold">{product.name}</h1>
          
          <div className="flex items-center mt-2 mb-4">
            <div className="flex items-center text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'fill-current' : 'fill-none'}`} 
                />
              ))}
              <span className="ml-2 text-foreground">{product.rating}</span>
              <span className="ml-2 text-muted-foreground">(120 reviews)</span>
            </div>
          </div>
          
          {/* Weight/Size Options */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              Choose Weight/Size:
            </label>
            <div className="relative">
              <button
                className="w-full flex items-center justify-between border rounded-md px-4 py-2.5 bg-background hover:bg-muted transition-colors"
                onClick={() => setShowWeightOptions(!showWeightOptions)}
              >
                <span>{selectedOption.label}</span>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </button>
              
              {showWeightOptions && (
                <div className="absolute z-10 mt-1 w-full bg-background border rounded-md shadow-lg">
                  {weightOptions.map((option) => (
                    <button
                      key={option.value}
                      className="w-full text-left px-4 py-2.5 hover:bg-muted"
                      onClick={() => {
                        setSelectedWeight(option.value);
                        setShowWeightOptions(false);
                      }}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          <div className="mb-6">
            <div className="flex items-baseline">
              <span className="text-3xl font-bold text-primary">${finalPrice.toFixed(2)}</span>
              {product.discount && (
                <span className="ml-3 text-lg text-muted-foreground line-through">
                  ${product.price.toFixed(2)}
                </span>
              )}
            </div>
            {product.discount && (
              <p className="text-destructive mt-1">
                Save ${(product.price - basePrice).toFixed(2)} ({product.discount}% off)
              </p>
            )}
          </div>
          
          <p className="text-muted-foreground mb-6">{product.description}</p>
          
          {/* Add to Cart */}
          <div className="flex items-center mb-8">
            {isInCart ? (
              <div className="flex items-center">
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-10 w-10 rounded-full"
                  onClick={handleDecreaseQuantity}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="mx-4 text-lg font-medium min-w-8 text-center">
                  {cartItem.quantity}
                </span>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-10 w-10 rounded-full"
                  onClick={handleIncreaseQuantity}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Button 
                size="lg" 
                className="rounded-full"
                onClick={handleAddToCart}
              >
                <ShoppingBag className="h-5 w-5 mr-2" />
                Add to Cart
              </Button>
            )}
          </div>
          
          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-auto">
            <div className="flex flex-col items-center p-4 bg-muted rounded-lg text-center">
              <Truck className="h-6 w-6 mb-2 text-primary" />
              <span className="text-sm font-medium">Free Delivery</span>
              <span className="text-xs text-muted-foreground">On orders above $30</span>
            </div>
            <div className="flex flex-col items-center p-4 bg-muted rounded-lg text-center">
              <ShieldCheck className="h-6 w-6 mb-2 text-primary" />
              <span className="text-sm font-medium">Quality Guarantee</span>
              <span className="text-xs text-muted-foreground">100% fresh products</span>
            </div>
            <div className="flex flex-col items-center p-4 bg-muted rounded-lg text-center">
              <RefreshCw className="h-6 w-6 mb-2 text-primary" />
              <span className="text-sm font-medium">Easy Returns</span>
              <span className="text-xs text-muted-foreground">Within 24 hours</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="mt-12">
          <h2 className="text-xl font-medium mb-6">You might also like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetail;
