
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { categories } from '@/lib/data';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CategoryTabsProps {
  onCategoryChange: (categoryId: string) => void;
}

const CategoryTabs = ({ onCategoryChange }: CategoryTabsProps) => {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setShowLeftArrow(scrollLeft > 0);
    setShowRightArrow(scrollLeft + clientWidth < scrollWidth - 10);
  };

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
      // Check initial scroll state
      handleScroll();
    }
    
    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  const scrollToDirection = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    
    const container = scrollContainerRef.current;
    const scrollAmount = container.clientWidth * 0.8;
    
    if (direction === 'left') {
      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
    onCategoryChange(categoryId);
  };

  return (
    <div className="relative">
      {/* Left scroll button */}
      {showLeftArrow && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10">
          <Button 
            onClick={() => scrollToDirection('left')} 
            size="icon" 
            variant="outline" 
            className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Right scroll button */}
      {showRightArrow && (
        <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10">
          <Button 
            onClick={() => scrollToDirection('right')} 
            size="icon" 
            variant="outline" 
            className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Categories tabs */}
      <ScrollArea 
        className="w-full overflow-x-auto no-scrollbar" 
        orientation="horizontal"
        scrollHideDelay={100}
      >
        <div 
          className="flex items-center space-x-2 pb-1 pt-1 px-2"
          ref={scrollContainerRef}
        >
          <Button
            onClick={() => handleCategoryChange('all')}
            variant={activeCategory === 'all' ? 'default' : 'outline'}
            className={cn(
              "whitespace-nowrap rounded-full",
              activeCategory === 'all' 
                ? "bg-primary text-primary-foreground" 
                : "bg-background"
            )}
          >
            All Items
          </Button>
          
          {categories.map((category) => (
            <Button
              key={category.id}
              onClick={() => handleCategoryChange(category.id)}
              variant={activeCategory === category.id ? 'default' : 'outline'}
              className={cn(
                "whitespace-nowrap rounded-full",
                activeCategory === category.id 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-background"
              )}
            >
              {category.name}
            </Button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default CategoryTabs;
