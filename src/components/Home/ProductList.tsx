
import ProductCard from '@/components/ProductCard';
import { Product } from '@/lib/types';

interface ProductListProps {
  title: string;
  products: Product[];
}

const ProductList = ({ title, products }: ProductListProps) => {
  return (
    <section className="mb-6">
      <h2 className="text-xl font-medium mb-4">{title}</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.length > 0 ? (
          products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <div className="col-span-full text-center py-10">
            <p className="text-muted-foreground">No products found</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductList;
