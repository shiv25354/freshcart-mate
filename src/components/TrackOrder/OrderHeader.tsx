
import { ArrowLeft, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { toast } from "sonner";

interface OrderHeaderProps {
  orderId: string;
}

const OrderHeader = ({ orderId }: OrderHeaderProps) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/orders');
  };

  const toggleNotifications = () => {
    toast.info(
      "Notifications are now " + (true ? "enabled" : "disabled"), 
      { description: "You'll receive updates about your order status" }
    );
  };

  return (
    <header className="bg-card px-4 py-3 fixed top-0 w-full z-50 border-b">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" onClick={handleBack}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="ml-2 text-lg font-semibold">Track Order #{orderId}</h1>
        </div>
        <Button variant="ghost" size="icon" onClick={toggleNotifications}>
          <Bell className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
};

export default OrderHeader;
