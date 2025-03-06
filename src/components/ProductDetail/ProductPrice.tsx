
interface ProductPriceProps {
  finalPrice: number;
  originalPrice?: number;
  discount?: number;
  basePrice?: number;
}

const ProductPrice = ({ finalPrice, originalPrice, discount, basePrice }: ProductPriceProps) => {
  return (
    <div className="mb-6">
      <div className="flex items-baseline">
        <span className="text-3xl font-bold text-primary">${finalPrice.toFixed(2)}</span>
        {discount && originalPrice && (
          <span className="ml-3 text-lg text-muted-foreground line-through">
            ${originalPrice.toFixed(2)}
          </span>
        )}
      </div>
      {discount && basePrice && (
        <p className="text-destructive mt-1">
          Save ${(originalPrice! - basePrice).toFixed(2)} ({discount}% off)
        </p>
      )}
    </div>
  );
};

export default ProductPrice;
