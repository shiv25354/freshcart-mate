
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { WeightOption } from '@/lib/data';

interface ProductCardWeightSelectorProps {
  weightOptions?: WeightOption[];
  selectedWeight: string;
  onWeightSelect: (value: string) => void;
}

const ProductCardWeightSelector = ({ 
  weightOptions, 
  selectedWeight, 
  onWeightSelect 
}: ProductCardWeightSelectorProps) => {
  const [showWeightOptions, setShowWeightOptions] = useState(false);
  
  if (!weightOptions) return null;
  
  const selectedOption = weightOptions.find(opt => opt.value === selectedWeight) || weightOptions[0];
  
  const handleWeightSelect = (e: React.MouseEvent, value: string) => {
    e.preventDefault();
    e.stopPropagation();
    onWeightSelect(value);
    setShowWeightOptions(false);
  };

  return (
    <div className="relative mb-2 text-sm z-10">
      <button
        className="w-full flex items-center justify-between border rounded-md px-2 py-1 bg-background hover:bg-muted transition-colors text-xs"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setShowWeightOptions(!showWeightOptions);
        }}
      >
        <span>{selectedOption.label}</span>
        <ChevronDown className="h-3 w-3 text-muted-foreground" />
      </button>
      
      {showWeightOptions && (
        <div className="absolute z-20 mt-1 w-full bg-background border rounded-md shadow-lg">
          {weightOptions.map((option) => (
            <button
              key={option.value}
              className="w-full text-left px-2 py-1 hover:bg-muted text-xs"
              onClick={(e) => handleWeightSelect(e, option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductCardWeightSelector;
