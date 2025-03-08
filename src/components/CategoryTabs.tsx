
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
            className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm shadow-md"
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
            className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm shadow-md"
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
          className="flex items-center space-x-4 pb-3 pt-3 px-2"
          ref={scrollContainerRef}
        >
          <div 
            onClick={() => handleCategoryChange('all')}
            className={cn(
              "flex flex-col items-center justify-center min-w-[75px] transition-all duration-300",
              "cursor-pointer select-none",
              activeCategory === 'all' ? "scale-110" : "scale-100 hover:scale-105"
            )}
          >
            <div className={cn(
              "flex items-center justify-center w-16 h-16 rounded-full mb-1",
              "bg-gradient-to-br from-primary/70 to-primary/90 text-white",
              "shadow-lg shadow-primary/20",
              "transition-all duration-300 ease-in-out",
              activeCategory === 'all' 
                ? "transform scale-110"
                : "opacity-80 hover:opacity-100"
            )}>
              <span className="text-2xl">🛒</span>
            </div>
            <span className={cn(
              "text-xs font-medium text-center",
              activeCategory === 'all' ? "text-primary" : "text-foreground/80"
            )}>
              All Items
            </span>
          </div>
          
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <div 
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                className={cn(
                  "flex flex-col items-center justify-center min-w-[75px] transition-all duration-300",
                  "cursor-pointer select-none",
                  activeCategory === category.id ? "scale-110" : "scale-100 hover:scale-105"
                )}
              >
                <div className={cn(
                  "flex items-center justify-center w-16 h-16 rounded-full mb-1",
                  "bg-gradient-to-br",
                  activeCategory === category.id 
                    ? "from-primary/70 to-primary/90 text-white"
                    : "from-background to-muted/50 text-foreground/80",
                  "shadow-lg",
                  activeCategory === category.id 
                    ? "shadow-primary/20" 
                    : "shadow-muted/10",
                  "transition-all duration-300 ease-in-out",
                  activeCategory === category.id 
                    ? "transform scale-110"
                    : "opacity-80 hover:opacity-100"
                )}>
                  {Icon && <Icon className="w-7 h-7" />}
                </div>
                <span className={cn(
                  "text-xs font-medium text-center",
                  activeCategory === category.id ? "text-primary" : "text-foreground/80"
                )}>
                  {category.name}
                </span>
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
};

export default CategoryTabs;
