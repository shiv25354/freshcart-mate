
import { Star } from 'lucide-react';

interface ProductCardInfoProps {
  name: string;
  description: string;
  rating: number;
}

const ProductCardInfo = ({ name, description, rating }: ProductCardInfoProps) => {
  return (
    <>
      <div className="flex items-start justify-between mb-1">
        <h3 className="font-medium line-clamp-1">{name}</h3>
        <div className="flex items-center text-amber-500 ml-2 text-sm">
          <Star className="w-3.5 h-3.5 fill-current" />
          <span className="ml-1">{rating}</span>
        </div>
      </div>
      
      <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
        {description}
      </p>
    </>
  );
};

export default ProductCardInfo;
