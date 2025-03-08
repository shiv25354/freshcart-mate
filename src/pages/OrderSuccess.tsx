import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { CheckCircle, MapPin, Clock, ArrowLeft, Package, Receipt, Heart, Truck } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { toast } from "@/lib/toast";

const OrderSuccess = () => {
  const navigate = useNavigate();
  const { clearCart } = useCart();
  const orderId = "2458"; // This would typically come from the order creation response
  
  // Example order details
  const orderDetails = {
    id: orderId,
    date: new Date(),
    items: 3,
    total: 45.97,
    address: "123 Main Street, Apt 4B, New York, NY 10001",
    deliveryTime: "30-45 minutes",
  };
  
  // Timer state
  const [minutes, setMinutes] = useState(30);
  const [seconds, setSeconds] = useState(0);
  
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Clear the cart as order is completed
    clearCart();
    
    // Success toast notification with longer duration and interactive elements
    toast.success("Order Placed Successfully!", {
      description: `Your order #${orderId} has been confirmed and is being prepared.`,
      duration: 6000,
      action: {
        label: "Track Order",
        onClick: () => navigate(`/track-order/${orderId}`),
      },
    });
    
    // Additional toast after 2 seconds for a friendlier experience
    const welcomeTimeout = setTimeout(() => {
      toast.info("Thank you for your order!", {
        description: "We're preparing everything fresh for you.",
        icon: <Heart className="text-red-500 h-5 w-5" />,
      });
    }, 2000);
    
    // Setup countdown timer
    const timer = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(timer);
          toast.info("Your order is being delivered now!", {
            description: "The driver is on the way to your location.",
            icon: <Truck className="h-5 w-5" />,
          });
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
          
          // Show status update toasts at specific intervals
          if (minutes === 25) {
            toast.info("Order Update", {
              description: "Your order has been received by the restaurant!",
              icon: <CheckCircle className="text-green-500 h-5 w-5" />,
            });
          } else if (minutes === 15) {
            toast.info("Order Update", {
              description: "Your order is being prepared by our chefs!",
              icon: <Package className="text-blue-500 h-5 w-5" />,
            });
          }
        }
      }
    }, 1000);
    
    // Clean up intervals on component unmount
    return () => {
      clearInterval(timer);
      clearTimeout(welcomeTimeout);
    };
  }, [minutes, seconds, clearCart, orderId, navigate]);

  // Function to handle receipt download
  const handleDownloadReceipt = () => {
    toast.success("Receipt Downloaded", {
      description: "Your receipt has been downloaded to your device.",
      icon: <Receipt className="h-5 w-5" />,
    });
  };
  
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
