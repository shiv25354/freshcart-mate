
import { Star } from 'lucide-react';

interface ProductRatingProps {
  rating: number;
}

const ProductRating = ({ rating }: ProductRatingProps) => {
  return (
    <div className="flex items-center mt-2 mb-4">
      <div className="flex items-center text-amber-500">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            className={`w-5 h-5 ${i < Math.floor(rating) ? 'fill-current' : 'fill-none'}`} 
          />
        ))}
        <span className="ml-2 text-foreground">{rating}</span>
        <span className="ml-2 text-muted-foreground">(120 reviews)</span>
      </div>
    </div>
  );
};

export default ProductRating;
