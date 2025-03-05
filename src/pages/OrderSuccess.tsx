
import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { CheckCircle, MapPin, Clock, ArrowLeft, Package, Receipt, ExternalLink } from 'lucide-react';

const OrderSuccess = () => {
  const navigate = useNavigate();
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
  
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);
  
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
        
        <div className="grid grid-cols-2 gap-4 w-full max-w-xs mb-8">
          <Button 
            variant="outline" 
            size="lg" 
            as={Link}
            to={`/track-order/${orderId}`}
            className="flex items-center justify-center gap-2"
          >
            <Package className="h-5 w-5" />
            Track Order
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="flex items-center justify-center gap-2"
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
        >
          View All Orders
        </Button>
        <Button 
          as={Link}
          to="/"
          variant="outline"
          className="w-full"
        >
          Continue Shopping
        </Button>
      </div>
    </div>
  );
};

export default OrderSuccess;
