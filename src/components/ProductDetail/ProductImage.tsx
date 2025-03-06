
import { Product } from '@/lib/data';
import { Leaf } from 'lucide-react';

interface ProductImageProps {
  product: Product;
  isLoading: boolean;
}

const ProductImage = ({ product, isLoading }: ProductImageProps) => {
  return (
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
  );
};

export default ProductImage;
