
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface ProductCardImageProps {
  image: string;
  name: string;
  isNew?: boolean;
  discount?: number;
}

const ProductCardImage = ({ image, name, isNew, discount }: ProductCardImageProps) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <div className="relative aspect-square overflow-hidden bg-muted">
      {!isImageLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted">
          <div className="animate-pulse-slow w-full h-full bg-muted-foreground/10"></div>
        </div>
      )}
      <img
        src={image}
        alt={name}
        className={cn(
          "object-cover w-full h-full transition-all duration-500 group-hover:scale-105",
          !isImageLoaded && "opacity-0",
          isImageLoaded && "opacity-100"
        )}
        onLoad={() => setIsImageLoaded(true)}
      />
      
      {/* Badges */}
      <div className="absolute top-3 left-3 flex flex-col gap-2">
        {isNew && (
          <span className="bg-primary text-white text-xs px-2 py-1 rounded-full animate-fade-in">
            New
          </span>
        )}
        {discount && (
          <span className="bg-destructive text-white text-xs px-2 py-1 rounded-full animate-fade-in">
            {discount}% OFF
          </span>
        )}
      </div>
    </div>
  );
};

export default ProductCardImage;
