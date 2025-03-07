import { useState, useEffect } from 'react';
import { 
  getFeaturedProducts, 
  getNewProducts, 
  getDiscountedProducts,
  getProductsByCategory,
  categories,
  products
} from '@/lib/data';
import { TrendingUp, Sparkles, Percent } from 'lucide-react';
import CategoryTabs from '@/components/CategoryTabs';

// Home components
import HomeHeader from '@/components/Home/HomeHeader';
import HomeSearch from '@/components/Home/HomeSearch';
import HeroSection from '@/components/Home/HeroSection';
import ProductList from '@/components/Home/ProductList';
import HomeSection from '@/components/Home/HomeSection';
import ProductCard from '@/components/ProductCard';

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

  const getCategoryTitle = () => {
    if (selectedCategory === 'all') return 'All Products';
    return categories.find(c => c.id === selectedCategory)?.name || 'Products';
  };

  return (
    <div className="min-h-screen pt-4 pb-20 px-4 md:px-6 max-w-7xl mx-auto">
      {/* Header with Location Selector */}
      <HomeHeader />
      
      {/* Search Bar for home page */}
      <HomeSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {/* Hero Section */}
      <HeroSection isPageLoaded={isPageLoaded} />

      {/* Category Tabs */}
      <div className="my-4">
        <CategoryTabs onCategoryChange={handleCategoryChange} />
      </div>

      {/* Product List */}
      <ProductList 
        title={getCategoryTitle()} 
        products={filteredProducts} 
      />

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
