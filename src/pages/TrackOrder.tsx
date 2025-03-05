
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  ArrowLeft, 
  Bell, 
  MapPin, 
  Truck, 
  Check, 
  Phone, 
  MessageSquare,
  Shield,
  Download,
  Menu,
  ChevronRight
} from 'lucide-react';

// Mock order tracking data
const mockOrderDetails = {
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
  const navigate = useNavigate();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [orderDetails, setOrderDetails] = useState(mockOrderDetails);
  
  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
      // In a real app, you would fetch the order details based on the ID
      if (id) {
        setOrderDetails({...mockOrderDetails, id});
      }
    }, 800);
    return () => clearTimeout(timer);
  }, [id]);

  const handleBack = () => {
    navigate('/orders');
  };

  const getStatusIcon = (status: string, completed: boolean) => {
    switch (status) {
      case 'check':
        return completed ? 
          <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
            <Check className="h-4 w-4 text-primary" />
          </div> :
          <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
            <Check className="h-4 w-4 text-muted-foreground" />
          </div>;
      case 'truck':
        return <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
          <Truck className="h-4 w-4 text-blue-600" />
        </div>;
      default:
        return <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center" />;
    }
  };

  return (
    <div className="min-h-screen bg-background pt-16 pb-20">
      <header className="bg-card px-4 py-3 fixed top-0 w-full z-50 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" onClick={handleBack}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="ml-2 text-lg font-semibold">Track Order #{orderDetails.id}</h1>
          </div>
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
        </div>
      </header>
      
      {isLoading ? (
        <div className="px-4 space-y-4">
          <div className="h-[300px] bg-muted animate-pulse rounded-lg"></div>
          <div className="h-16 bg-muted animate-pulse rounded-lg"></div>
          <div className="h-20 bg-muted animate-pulse rounded-lg"></div>
          <div className="h-40 bg-muted animate-pulse rounded-lg"></div>
        </div>
      ) : (
        <>
          <section className="relative h-[300px] bg-muted">
            <img 
              className="w-full h-full object-cover" 
              src={orderDetails.mapImage} 
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
          
          <section className="bg-card p-4 border-b">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Estimated Arrival</p>
                <p className="text-xl font-semibold">{orderDetails.eta}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Distance</p>
                <p className="text-xl font-semibold">{orderDetails.distance}</p>
              </div>
            </div>
          </section>
          
          <section className="bg-card p-4 border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <img 
                  src={orderDetails.driver.image} 
                  className="w-12 h-12 rounded-full border bg-muted" 
                  alt={orderDetails.driver.name}
                />
                <div className="ml-3">
                  <p className="font-semibold">{orderDetails.driver.name}</p>
                  <p className="text-sm text-muted-foreground">{orderDetails.driver.vehicle}</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Button size="icon" variant="outline" className="rounded-full h-10 w-10">
                  <Phone className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="outline" className="rounded-full h-10 w-10">
                  <MessageSquare className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </section>
          
          <section className="bg-card p-4 border-b">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-semibold">Order Progress</h2>
              <Button variant="link" className="text-sm h-auto p-0" onClick={() => navigate(`/orders`)}>
                View Details
              </Button>
            </div>
            
            <div className="space-y-6">
              {orderDetails.progress.map((step, index) => (
                <div key={step.id} className="flex items-start">
                  {getStatusIcon(step.icon, step.completed)}
                  <div className="ml-3 flex-1">
                    <p className="font-medium">{step.status}</p>
                    <p className="text-sm text-muted-foreground">{step.time}</p>
                  </div>
                  {index !== orderDetails.progress.length - 1 && (
                    <div className="absolute ml-4 h-6 w-[1px] bg-muted-foreground/20 top-8 left-4" />
                  )}
                </div>
              ))}
            </div>
          </section>
          
          <section className="bg-card p-4 border-b">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold">Delivery Instructions</h2>
              <Button variant="link" className="text-sm h-auto p-0">
                Edit
              </Button>
            </div>
            <div className="bg-muted p-3 rounded-lg">
              <p className="text-sm">{orderDetails.instructions}</p>
              {orderDetails.contactless && (
                <div className="mt-2 flex items-center text-sm text-muted-foreground">
                  <Shield className="h-4 w-4 mr-2" />
                  <span>Contactless Delivery Selected</span>
                </div>
              )}
            </div>
          </section>
        </>
      )}
      
      <nav className="fixed bottom-0 w-full bg-card border-t p-4">
        <Button className="w-full" size="lg">
          <Download className="mr-2 h-4 w-4" />
          Download Receipt
        </Button>
      </nav>
    </div>
  );
};

export default TrackOrder;
