
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Category } from '@/lib/data';
import { cn } from '@/lib/utils';

interface CategoryCardProps {
  category: Category;
  className?: string;
}

const CategoryCard = ({ category, className }: CategoryCardProps) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <Link 
      to={`/category/${category.id}`}
      className={cn(
        "group relative overflow-hidden rounded-xl transition-smooth",
        className
      )}
    >
      <div className="aspect-square relative overflow-hidden rounded-xl">
        {!isImageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-muted">
            <div className="animate-pulse-slow w-full h-full bg-muted-foreground/10"></div>
          </div>
        )}
        <img
          src={category.image}
          alt={category.name}
          className={cn(
            "object-cover w-full h-full transition-all duration-500 group-hover:scale-105",
            !isImageLoaded && "opacity-0",
            isImageLoaded && "opacity-100"
          )}
          onLoad={() => setIsImageLoaded(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent transition-opacity group-hover:opacity-80" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-white font-semibold text-xl text-center px-2 transform transition-transform duration-300 group-hover:scale-110">
            {category.name}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
