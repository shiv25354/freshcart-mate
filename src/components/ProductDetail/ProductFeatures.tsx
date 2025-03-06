
import { Truck, ShieldCheck, RefreshCw } from 'lucide-react';

const ProductFeatures = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-auto">
      <div className="flex flex-col items-center p-4 bg-muted rounded-lg text-center">
        <Truck className="h-6 w-6 mb-2 text-primary" />
        <span className="text-sm font-medium">Free Delivery</span>
        <span className="text-xs text-muted-foreground">On orders above $30</span>
      </div>
      <div className="flex flex-col items-center p-4 bg-muted rounded-lg text-center">
        <ShieldCheck className="h-6 w-6 mb-2 text-primary" />
        <span className="text-sm font-medium">Quality Guarantee</span>
        <span className="text-xs text-muted-foreground">100% fresh products</span>
      </div>
      <div className="flex flex-col items-center p-4 bg-muted rounded-lg text-center">
        <RefreshCw className="h-6 w-6 mb-2 text-primary" />
        <span className="text-sm font-medium">Easy Returns</span>
        <span className="text-xs text-muted-foreground">Within 24 hours</span>
      </div>
    </div>
  );
};

export default ProductFeatures;
