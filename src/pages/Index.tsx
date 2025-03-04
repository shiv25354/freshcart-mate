
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  getFeaturedProducts, 
  getNewProducts, 
  getDiscountedProducts,
  getProductsByCategory,
  categories,
  products
} from '@/lib/data';
import ProductCard from '@/components/ProductCard';
import CategoryCard from '@/components/CategoryCard';
import { Button } from '@/components/ui/button';
import { ChevronRight, TrendingUp, Sparkles, Percent, Search } from 'lucide-react';
import LocationSelector from '@/components/LocationSelector';
import CategoryTabs from '@/components/CategoryTabs';
import { useCart } from '@/context/CartContext';
import { Input } from '@/components/ui/input';

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
  <section className={`py-6 ${className}`}>
    <div className="flex items-center justify-between mb-4">
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
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [searchQuery, setSearchQuery] = useState('');
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

  // Handle category changes
  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(getProductsByCategory(selectedCategory));
    }
  }, [selectedCategory]);

  // Handle search query changes
  useEffect(() => {
    if (!searchQuery.trim()) {
      if (selectedCategory === 'all') {
        setFilteredProducts(products);
      } else {
        setFilteredProducts(getProductsByCategory(selectedCategory));
      }
      return;
    }
    
    const query = searchQuery.toLowerCase().trim();
    const filtered = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(query) || 
                            product.description.toLowerCase().includes(query);
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
    
    setFilteredProducts(filtered);
  }, [searchQuery, selectedCategory]);

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  return (
    <div className="min-h-screen pt-4 pb-20 px-4 md:px-6 max-w-7xl mx-auto">
      {/* Header with Location Selector */}
      <div className="flex items-center justify-between mb-6">
        <LocationSelector />
        
        <div className="flex gap-2">
          <Link to="/search">
            <Button variant="outline" size="icon" className="rounded-full">
              <Search className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
      
      {/* Search Bar for home page */}
      <div className="relative mb-6">
        <Input
          className="pl-10 pr-4 rounded-full"
          placeholder="Search for groceries..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      </div>

      {/* Hero Section */}
      <section 
        className={`mt-2 md:mt-4 relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary/90 to-primary transition-all duration-700 transform ${
          isPageLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}
      >
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1543168256-418811576931?q=80&w=2940&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
        <div className="relative z-10 py-10 px-6 max-w-2xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Fresh groceries, delivered to your door
          </h1>
          <p className="text-white/90 text-base mb-6">
            Shop quality groceries from local farms and premium suppliers with fast, reliable delivery.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
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

      {/* Category Tabs */}
      <div className="my-4">
        <CategoryTabs onCategoryChange={handleCategoryChange} />
      </div>

      {/* Product List */}
      <section className="mb-6">
        <h2 className="text-xl font-medium mb-4">
          {selectedCategory === 'all' 
            ? 'All Products' 
            : `${categories.find(c => c.id === selectedCategory)?.name || 'Products'}`}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className="col-span-full text-center py-10">
              <p className="text-muted-foreground">No products found</p>
            </div>
          )}
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
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {discountedProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </HomeSection>
    </div>
  );
};

export default Index;
