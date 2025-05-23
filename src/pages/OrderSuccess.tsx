import { useEffect, useState } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { CheckCircle, MapPin, Clock, ArrowLeft, Package, Receipt, Heart, Truck } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { toast } from "@/lib/toast";

const OrderSuccess = () => {
  const navigate = useNavigate();
  const { clearCart } = useCart();
  const { orderId } = useParams(); // Get orderId from URL params
  const [orderDetails, setOrderDetails] = useState({
    id: '',
    date: new Date(),
    items: 0,
    total: 0,
    address: "",
    deliveryTime: "",
  });
  
  // Timer state using a single value in seconds
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes in seconds
  
  // Derived time values
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  // Handle receipt download with proper error handling
  const handleDownloadReceipt = async () => {
    try {
      // Simulate API call for receipt download
      const response = await fetch(`/api/orders/${orderId}/receipt`);
      if (!response.ok) throw new Error('Failed to download receipt');
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `receipt-${orderId}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      toast.success("Receipt Downloaded", {
        description: "Your receipt has been downloaded to your device.",
        icon: <Receipt className="h-5 w-5" />,
      });
    } catch (error) {
      toast.error("Failed to download receipt", {
        description: "Please try again later or contact support.",
      });
    }
  };

  // Fetch order details
  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        // Simulate API call
        // In production, this would be a real API call
        const mockDetails = {
          id: orderId || '', // Provide default empty string if orderId is undefined
          date: new Date(),
          items: 3,
          total: 45.97,
          address: "123 Main Street, Apt 4B, New York, NY 10001",
          deliveryTime: "30-45 minutes",
        };
        setOrderDetails(mockDetails);
      } catch (error) {
        toast.error("Failed to load order details", {
          description: "Please refresh the page or contact support.",
        });
        navigate('/orders');
      }
    };

    if (orderId) {
      fetchOrderDetails();
    } else {
      navigate('/orders');
    }
  }, [orderId, navigate]);

  // Setup countdown timer with proper cleanup
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          toast.info("Your order is being delivered now!", {
            description: "The driver is on the way to your location.",
            icon: <Truck className="h-5 w-5" />,
          });
          return 0;
        }
        
        // Show status updates at specific times
        if (prev === 25 * 60) { // 25 minutes left
          toast.info("Order Update", {
            description: "Your order has been received by the restaurant!",
            icon: <CheckCircle className="text-green-500 h-5 w-5" />,
          });
        } else if (prev === 15 * 60) { // 15 minutes left
          toast.info("Order Update", {
            description: "Your order is being prepared by our chefs!",
            icon: <Package className="text-blue-500 h-5 w-5" />,
          });
        }
        
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []); // No dependencies needed as we use functional updates

  // Initial success notifications
  useEffect(() => {
    if (!orderId) return;

    // Clear the cart as order is completed
    clearCart();
    
    // Queue notifications with proper timing
    const notifications = [
      {
        delay: 0,
        fn: () => toast.success("Order Placed Successfully!", {
          description: `Your order #${orderId} has been confirmed and is being prepared.`,
          duration: 6000,
          action: {
            label: "Track Order",
            onClick: () => navigate(`/track-order/${orderId}`),
          },
        })
      },
      {
        delay: 2000,
        fn: () => toast.info("Thank you for your order!", {
          description: "We're preparing everything fresh for you.",
          icon: <Heart className="text-red-500 h-5 w-5" />,
        })
      }
    ];

    // Setup notifications with proper cleanup
    const timeouts = notifications.map(({ delay, fn }) => 
      setTimeout(fn, delay)
    );

    return () => timeouts.forEach(clearTimeout);
  }, [orderId, clearCart, navigate]);

  return (
    <div className="min-h-screen pt-16 pb-20 px-4 md:px-6 max-w-3xl mx-auto">
      <div className="flex items-center gap-2 mb-6 mt-8">
        <Button variant="ghost" size="icon" onClick={() => navigate('/orders')}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-medium">Order Confirmation</h1>
      </div>
      
      {/* Success Animation */}
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 animate-pulse">
          <CheckCircle className="h-12 w-12 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Order Placed Successfully!</h2>
        <p className="text-muted-foreground mb-6">Your order #{orderId} has been confirmed</p>
        
        {/* Delivery Timer */}
        <div className="w-full max-w-md bg-blue-50 rounded-lg p-4 mb-6 animate-fade-in">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-blue-500" />
              <h3 className="font-medium text-blue-700">Estimated Delivery</h3>
            </div>
            <div className="text-lg font-bold text-blue-700">
              {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </div>
          </div>
          <p className="text-blue-600 text-sm mt-2">Your order is being prepared and will arrive soon!</p>
        </div>
        
        {/* Calm Town Message */}
        <div className="w-full max-w-md bg-purple-50 rounded-lg p-4 mb-6 animate-slide-up">
          <div className="flex items-center gap-2 mb-2">
            <Heart className="h-5 w-5 text-purple-500" />
            <h3 className="font-medium text-purple-700">Relax, We've Got This</h3>
          </div>
          <p className="text-purple-600 text-sm">
            Take a deep breath and relax. Your order is in good hands and on its way to you. 
            Feel free to continue browsing or sit back and enjoy your day!
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-4 w-full max-w-xs mb-8">
          <Button 
            variant="outline" 
            size="lg" 
            as={Link}
            to={`/track-order/${orderId}`}
            className="flex items-center justify-center gap-2"
            onClick={() => toast.info("Tracking your order", { description: "Loading live order tracking..." })}
          >
            <Package className="h-5 w-5" />
            Track Order
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="flex items-center justify-center gap-2"
            onClick={handleDownloadReceipt}
          >
            <Receipt className="h-5 w-5" />
            View Receipt
          </Button>
        </div>
      </div>
      
      <div className="bg-card shadow-sm rounded-xl overflow-hidden mb-6">
        <div className="p-6">
          <h3 className="font-semibold text-lg mb-4">Order Details</h3>
          <Separator className="mb-4" />
          
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Order ID</span>
              <span className="font-medium">#{orderId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Date</span>
              <span className="font-medium">
                {orderDetails.date.toLocaleDateString('en-US', { 
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Items</span>
              <span className="font-medium">{orderDetails.items} items</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total</span>
              <span className="font-medium">${orderDetails.total.toFixed(2)}</span>
            </div>
            <Separator className="my-4" />
            <div className="flex gap-3">
              <MapPin className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-1" />
              <div>
                <p className="text-muted-foreground text-sm mb-1">Delivery Address</p>
                <p className="font-medium">{orderDetails.address}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Clock className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-1" />
              <div>
                <p className="text-muted-foreground text-sm mb-1">Estimated Delivery Time</p>
                <p className="font-medium">{orderDetails.deliveryTime}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col gap-4">
        <Button 
          as={Link}
          to="/orders"
          className="w-full"
          onClick={() => toast.info("Viewing all orders", { description: "Loading your order history..." })}
        >
          View All Orders
        </Button>
        <Button 
          as={Link}
          to="/"
          variant="outline"
          className="w-full"
          onClick={() => toast.info("Back to shopping", { description: "Taking you to our store..." })}
        >
          Continue Shopping
        </Button>
      </div>
    </div>
  );
};

export default OrderSuccess;
