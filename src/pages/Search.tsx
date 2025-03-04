
import React, { useState, useEffect } from 'react';
import { products, categories, getProductsByCategory } from '@/lib/data';
import ProductCard from '@/components/ProductCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search as SearchIcon, Filter } from 'lucide-react';
import CategoryTabs from '@/components/CategoryTabs';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredProducts, setFilteredProducts] = useState(products);
  
  // Handle category and search filtering
  useEffect(() => {
    let results = products;
    
    // Apply category filter
    if (selectedCategory !== 'all') {
      results = getProductsByCategory(selectedCategory);
    }
    
    // Apply search query filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      results = results.filter(product => 
        product.name.toLowerCase().includes(query) || 
        product.description.toLowerCase().includes(query)
      );
    }
    
    setFilteredProducts(results);
  }, [searchQuery, selectedCategory]);

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">Browse Products</h1>
      
      {/* Search Bar */}
      <div className="relative mb-6">
        <Input
          className="pl-10 pr-4 rounded-full"
          placeholder="Search for groceries..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        
        <Button 
          variant="outline" 
          size="icon" 
          className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 rounded-full"
        >
          <Filter className="h-4 w-4" />
        </Button>
      </div>
      
      {/* Category Tabs */}
      <div className="mb-6">
        <CategoryTabs onCategoryChange={handleCategoryChange} />
      </div>
      
      {/* Product Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-10">
            <p className="text-muted-foreground mb-2">No products found</p>
            <Button variant="outline" onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}>
              Clear filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
