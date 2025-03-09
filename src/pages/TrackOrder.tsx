import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from "@/lib/toast";
import { Truck, Check, ShoppingCart, Package } from 'lucide-react';

// Components
import OrderHeader from '@/components/TrackOrder/OrderHeader';
import OrderMap from '@/components/TrackOrder/OrderMap';
import OrderStatus from '@/components/TrackOrder/OrderStatus';
import OrderDriver from '@/components/TrackOrder/OrderDriver';
import OrderProgress from '@/components/TrackOrder/OrderProgress';
import DeliveryInstructions from '@/components/TrackOrder/DeliveryInstructions';
import OrderFooter from '@/components/TrackOrder/OrderFooter';
import LoadingState from '@/components/TrackOrder/LoadingState';

// Types
import { OrderDetails } from '@/components/TrackOrder/types';

// Mock order tracking data
const mockOrderDetails: OrderDetails = {
  id: '2458',
  status: 'out-for-delivery',
  eta: '12:45 PM',
  distance: '2.3 km',
  progress: [
    { id: 1, status: 'Order Placed', time: '11:30 AM', completed: true, icon: 'check' },
    { id: 2, status: 'Preparing', time: '11:45 AM', completed: true, icon: 'check' },
    { id: 3, status: 'Out for Delivery', time: '12:15 PM', completed: true, icon: 'truck' },
    { id: 4, status: 'Delivered', time: '12:45 PM', completed: false, icon: 'check' },
  ],
  driver: {
    name: 'Michael Chen',
    vehicle: 'Toyota Prius • ABC 123',
    image: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg',
    phone: '+1234567890',
  },
  instructions: 'Leave at the door. Please ring doorbell after delivery.',
  contactless: true,
  mapImage: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/4a2932b9ab-0323888bb81dbf75a06e.png'
};

const TrackOrder = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [orderDetails, setOrderDetails] = useState<OrderDetails>(mockOrderDetails);
  const [lastNotifiedStep, setLastNotifiedStep] = useState<number | null>(null);
  
  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
      // In a real app, you would fetch the order details based on the ID
      if (id) {
        setOrderDetails({...mockOrderDetails, id});
        
        // Show welcome toast when loaded
        toast.info(`Tracking order #${id}`, {
          description: "You'll receive notifications as your order status changes"
        });
      }
    }, 800);
    return () => clearTimeout(timer);
  }, [id]);

  // Simulate order status updates
  useEffect(() => {
    if (isLoading) return;

    // Find the current active step (the first non-completed step)
    const currentActiveStepIndex = orderDetails.progress.findIndex(step => !step.completed);
    
    // If there's a new active step that we haven't notified about yet
    if (currentActiveStepIndex > 0 && currentActiveStepIndex !== lastNotifiedStep) {
      const currentStep = orderDetails.progress[currentActiveStepIndex];
      
      // Demo: After 5 seconds, simulate the order reaching the next step
      const statusTimer = setTimeout(() => {
        // Update the order progress
        const updatedProgress = [...orderDetails.progress];
        if (currentActiveStepIndex >= 0) {
          updatedProgress[currentActiveStepIndex].completed = true;
          
          setOrderDetails({
            ...orderDetails,
            progress: updatedProgress
          });
          
          // Show notification for the new status based on the step
          if (currentStep.status === 'Order Placed') {
            toast.success("🟢 Your order is confirmed!", {
              description: "We're getting everything ready for you. 🛒",
              icon: <ShoppingCart className="h-4 w-4" />
            });
          } else if (currentStep.status === 'Out for Delivery') {
            toast.info("🚗 Your groceries are on the way!", {
              description: "Track your order in real-time. 📍",
              icon: <Truck className="h-4 w-4" />
            });
          } else if (currentStep.status === 'Delivered') {
            toast.success("📦 Delivered!", {
              description: "Your groceries have arrived. Bon appétit! 🍏",
              icon: <Package className="h-4 w-4" />
            });
          } else {
            // Generic notification for other statuses
            toast.success(`Order Status Updated!`, {
              description: `Your order is now ${currentStep.status.toLowerCase()}`,
              icon: currentStep.icon === 'truck' ? <Truck className="h-4 w-4" /> : <Check className="h-4 w-4" />
            });
          }
          
          setLastNotifiedStep(currentActiveStepIndex);
        }
      }, 5000);
      
      return () => clearTimeout(statusTimer);
    }
  }, [isLoading, orderDetails, lastNotifiedStep]);

  return (
    <div className="min-h-screen bg-background pt-16 pb-20">
      <OrderHeader orderId={orderDetails.id} />
      
      {isLoading ? (
        <LoadingState />
      ) : (
        <>
          <OrderMap mapImage={orderDetails.mapImage} />
          <OrderStatus eta={orderDetails.eta} distance={orderDetails.distance} />
          <OrderDriver driver={orderDetails.driver} />
          <OrderProgress progress={orderDetails.progress} />
          <DeliveryInstructions 
            instructions={orderDetails.instructions} 
            contactless={orderDetails.contactless} 
          />
        </>
      )}
      
      <OrderFooter />
    </div>
  );
};

export default TrackOrder;
