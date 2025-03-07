
interface ProductCardPriceProps {
  price: number;
  originalPrice?: number;
  showDiscount?: boolean;
}

const ProductCardPrice = ({ price, originalPrice, showDiscount = false }: ProductCardPriceProps) => {
  return (
    <div className="flex items-center">
      <span className="font-medium">
        ${price.toFixed(2)}
      </span>
      {showDiscount && originalPrice && (
        <span className="text-sm text-muted-foreground line-through ml-2">
          ${originalPrice.toFixed(2)}
        </span>
      )}
    </div>
  );
};

export default ProductCardPrice;
