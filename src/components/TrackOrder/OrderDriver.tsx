
import { Phone, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from "sonner";

interface DriverInfo {
  name: string;
  vehicle: string;
  image: string;
  phone: string;
}

interface OrderDriverProps {
  driver: DriverInfo;
}

const OrderDriver = ({ driver }: OrderDriverProps) => {
  const contactDriver = (method: 'call' | 'message') => {
    if (method === 'call') {
      toast.info("Calling driver...", {
        description: `Connecting you to ${driver.name}`,
        icon: <Phone className="h-4 w-4" />,
      });
    } else {
      toast.info("Message sent", {
        description: `Your message has been sent to ${driver.name}`,
        icon: <MessageSquare className="h-4 w-4" />,
      });
    }
  };

  return (
    <section className="bg-card p-4 border-b">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <img 
            src={driver.image} 
            className="w-12 h-12 rounded-full border bg-muted" 
            alt={driver.name}
          />
          <div className="ml-3">
            <p className="font-semibold">{driver.name}</p>
            <p className="text-sm text-muted-foreground">{driver.vehicle}</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Button size="icon" variant="outline" className="rounded-full h-10 w-10" onClick={() => contactDriver('call')}>
            <Phone className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="outline" className="rounded-full h-10 w-10" onClick={() => contactDriver('message')}>
            <MessageSquare className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default OrderDriver;
