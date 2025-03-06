
import { Product } from '@/lib/data';
import ProductCard from '@/components/ProductCard';

interface RelatedProductsProps {
  products: Product[];
}

const RelatedProducts = ({ products }: RelatedProductsProps) => {
  if (products.length === 0) return null;
  
  return (
    <section className="mt-12">
      <h2 className="text-xl font-medium mb-6">You might also like</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default RelatedProducts;
