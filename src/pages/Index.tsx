
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  getFeaturedProducts, 
  getNewProducts, 
  getDiscountedProducts,
  categories,
  products
} from '@/lib/data';
import ProductCard from '@/components/ProductCard';
import CategoryCard from '@/components/CategoryCard';
import { Button } from '@/components/ui/button';
import { ChevronRight, TrendingUp, Sparkles, Percent } from 'lucide-react';

const HomeSection = ({ 
  title, 
  icon: Icon, 
  children, 
  viewAllLink, 
  className = "" 
}: { 
  title: string;
  icon: React.ComponentType<any>;
  children: React.ReactNode;
  viewAllLink: string;
  className?: string;
}) => (
  <section className={`py-8 ${className}`}>
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center">
        <Icon className="w-5 h-5 mr-2 text-primary" />
        <h2 className="text-xl font-medium">{title}</h2>
      </div>
      <Link to={viewAllLink}>
        <Button variant="ghost" className="flex items-center group">
          View All
          <ChevronRight className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </Link>
    </div>
    {children}
  </section>
);

const Index = () => {
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const featuredProducts = getFeaturedProducts();
  const newProducts = getNewProducts();
  const discountedProducts = getDiscountedProducts();
  
  useEffect(() => {
    // Simulate page loading
    const timer = setTimeout(() => {
      setIsPageLoaded(true);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen pt-16 pb-20 px-4 md:px-6 max-w-7xl mx-auto">
      {/* Hero Section */}
      <section className="mt-6 md:mt-10 relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary/90 to-primary">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1543168256-418811576931?q=80&w=2940&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
        <div 
          className={`relative z-10 py-16 px-6 max-w-2xl mx-auto text-center transition-all duration-700 transform ${
            isPageLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Fresh groceries, delivered to your door
          </h1>
          <p className="text-white/90 text-lg mb-8">
            Shop quality groceries from local farms and premium suppliers with fast, reliable delivery.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-primary hover:bg-white/90 transition-smooth"
              asChild
            >
              <Link to="/search">Start Shopping</Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white/10 transition-smooth"
              asChild
            >
              <Link to="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section 
        className={`py-12 transition-all duration-700 delay-[200ms] ${
          isPageLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}
      >
        <h2 className="text-xl font-medium mb-6">Browse Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map(category => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <HomeSection 
        title="Featured Products" 
        icon={TrendingUp}
        viewAllLink="/featured"
        className={`transition-all duration-700 delay-[400ms] ${
          isPageLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </HomeSection>

      {/* New Arrivals */}
      <HomeSection 
        title="New Arrivals" 
        icon={Sparkles}
        viewAllLink="/new"
        className={`transition-all duration-700 delay-[600ms] ${
          isPageLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {newProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </HomeSection>

      {/* Special Offers */}
      <HomeSection 
        title="Special Offers" 
        icon={Percent}
        viewAllLink="/offers"
        className={`transition-all duration-700 delay-[800ms] ${
          isPageLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {discountedProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </HomeSection>
    </div>
  );
};

export default Index;
