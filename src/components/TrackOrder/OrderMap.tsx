
import { MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface OrderMapProps {
  mapImage: string;
}

const OrderMap = ({ mapImage }: OrderMapProps) => {
  return (
    <section className="relative h-[300px] bg-muted">
      <img 
        className="w-full h-full object-cover" 
        src={mapImage} 
        alt="Delivery route map" 
      />
      <Button 
        className="absolute bottom-4 right-4 rounded-full" 
        size="icon" 
        variant="secondary"
      >
        <MapPin className="h-5 w-5 text-primary" />
      </Button>
    </section>
  );
};

export default OrderMap;
