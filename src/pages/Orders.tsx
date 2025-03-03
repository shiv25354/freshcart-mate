
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  Package, 
  Truck, 
  CheckCircle, 
  Clock, 
  Search,
  ArrowLeft
} from 'lucide-react';

// Mock order data
const mockOrders = [
  {
    id: 'ORD-1234',
    date: '2023-10-15',
    items: [
      { id: 'p1', name: 'Organic Avocado', quantity: 2, price: 1.99, image: 'https://images.unsplash.com/photo-1601039641847-7857b994d704?q=80&w=2976&auto=format&fit=crop&ixlib=rb-4.0.3' },
      { id: 'p4', name: 'Free-Range Eggs', quantity: 1, price: 4.99, image: 'https://images.unsplash.com/photo-1506976785307-8732e854ad03?q=80&w=3160&auto=format&fit=crop&ixlib=rb-4.0.3' },
      { id: 'p8', name: 'Cold Brew Coffee', quantity: 2, price: 4.29, image: 'https://images.unsplash.com/photo-1592663527359-cf6642f54e65?q=80&w=2949&auto=format&fit=crop&ixlib=rb-4.0.3' }
    ],
    total: 17.55,
    status: 'Delivered',
    deliveryAddress: '123 Main Street, Apt 4B, New York, NY 10001',
    trackingNumber: 'TRK-9876543210'
  },
  {
    id: 'ORD-5678',
    date: '2023-09-28',
    items: [
      { id: 'p2', name: 'Fresh Strawberries', quantity: 1, price: 3.49, image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3' },
      { id: 'p5', name: 'Artisan Sourdough', quantity: 1, price: 5.49, image: 'https://images.unsplash.com/photo-1585478259715-32fa5ea6108f?q=80&w=2906&auto=format&fit=crop&ixlib=rb-4.0.3' },
      { id: 'p7', name: 'Atlantic Salmon Fillet', quantity: 1, price: 12.99, image: 'https://images.unsplash.com/photo-1599084993091-1cb5c9b3b9f8?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3' }
    ],
    total: 21.97,
    status: 'Delivered',
    deliveryAddress: '123 Main Street, Apt 4B, New York, NY 10001',
    trackingNumber: 'TRK-1234567890'
  },
  {
    id: 'ORD-9012',
    date: '2023-11-05',
    items: [
      { id: 'p3', name: 'Organic Spinach', quantity: 1, price: 2.29, image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?q=80&w=3024&auto=format&fit=crop&ixlib=rb-4.0.3' },
      { id: 'p6', name: 'Organic Whole Milk', quantity: 2, price: 3.99, image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?q=80&w=2625&auto=format&fit=crop&ixlib=rb-4.0.3' },
      { id: 'p10', name: 'Blueberry Smoothie', quantity: 1, price: 5.99, image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.0.3' }
    ],
    total: 16.26,
    status: 'In Transit',
    deliveryAddress: '123 Main Street, Apt 4B, New York, NY 10001',
    trackingNumber: 'TRK-5678901234'
  }
];

const OrdersPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<typeof mockOrders[0] | null>(null);
  const [orders, setOrders] = useState(mockOrders);
  
  useEffect(() => {
    // Simulate loading orders
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Delivered':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'In Transit':
        return <Truck className="h-5 w-5 text-blue-500" />;
      case 'Processing':
        return <Clock className="h-5 w-5 text-amber-500" />;
      default:
        return <Package className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const handleOrderClick = (order: typeof mockOrders[0]) => {
    setSelectedOrder(order);
  };

  const calculateOrderTotal = (order: typeof mockOrders[0]) => {
    return order.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <div className="min-h-screen pt-16 pb-20 px-4 md:px-6 max-w-7xl mx-auto">
      <div className="flex items-center gap-4 mt-8 mb-6">
        <Button 
          variant="ghost" 
          size="icon"
          className="-ml-3"
          onClick={() => {
            if (selectedOrder) {
              setSelectedOrder(null);
            } else {
              navigate('/profile');
            }
          }}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-3xl font-medium">
          {selectedOrder ? `Order ${selectedOrder.id}` : 'My Orders'}
        </h1>
      </div>
      
      {isLoading ? (
        <div className="grid gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-40 bg-muted animate-pulse rounded-lg"></div>
          ))}
        </div>
      ) : selectedOrder ? (
        // Order Details View
        <div className="bg-card rounded-xl shadow-sm p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <h2 className="text-xl font-medium">{selectedOrder.id}</h2>
              <p className="text-muted-foreground">
                Placed on {new Date(selectedOrder.date).toLocaleDateString()}
              </p>
            </div>
            <div className="flex items-center mt-2 md:mt-0">
              {getStatusIcon(selectedOrder.status)}
              <span className="ml-2 font-medium">{selectedOrder.status}</span>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="font-medium mb-2">Shipping Address</h3>
              <p className="text-muted-foreground">{selectedOrder.deliveryAddress}</p>
            </div>
            <div>
              <h3 className="font-medium mb-2">Tracking Number</h3>
              <p className="text-muted-foreground">{selectedOrder.trackingNumber}</p>
            </div>
          </div>
          
          <h3 className="font-medium mb-4">Order Items</h3>
          <div className="space-y-4 mb-6">
            {selectedOrder.items.map(item => (
              <div key={item.id} className="flex items-center">
                <div className="h-16 w-16 relative rounded-md overflow-hidden bg-muted flex-shrink-0">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="ml-4 flex-grow">
                  <h4 className="font-medium">{item.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    ${item.price.toFixed(2)} x {item.quantity}
                  </p>
                </div>
                <div className="text-right">
                  <span className="font-medium">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>
          
          <Separator className="mb-6" />
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>${calculateOrderTotal(selectedOrder).toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Shipping</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between font-medium text-lg">
              <span>Total</span>
              <span>${selectedOrder.total.toFixed(2)}</span>
            </div>
          </div>
          
          <div className="mt-8 flex flex-col md:flex-row gap-4">
            <Button 
              variant="outline"
              className="flex-1"
            >
              Track Order
            </Button>
            <Button 
              variant="outline"
              className="flex-1"
            >
              Download Invoice
            </Button>
            <Button 
              variant="outline"
              className="flex-1"
            >
              Request Return
            </Button>
          </div>
        </div>
      ) : orders.length === 0 ? (
        // Empty Orders View
        <div className="text-center py-16">
          <Package className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
          <h2 className="text-xl font-medium mb-2">No orders yet</h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            You haven't placed any orders yet. Browse our products and start shopping!
          </p>
          <Button onClick={() => navigate('/')}>Start Shopping</Button>
        </div>
      ) : (
        // Orders List View
        <div className="space-y-6">
          {orders.map(order => (
            <div 
              key={order.id} 
              className="bg-card rounded-xl shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-smooth"
              onClick={() => handleOrderClick(order)}
            >
              <div className="p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h2 className="text-lg font-medium">{order.id}</h2>
                    <p className="text-sm text-muted-foreground">
                      Placed on {new Date(order.date).toLocaleDateString()} • {order.items.length} items
                    </p>
                  </div>
                  <div className="flex items-center mt-2 md:mt-0">
                    {getStatusIcon(order.status)}
                    <span className="ml-2 font-medium">{order.status}</span>
                  </div>
                </div>
                
                <div className="flex flex-nowrap overflow-x-auto py-2 gap-4 mb-4 -mx-2 px-2">
                  {order.items.map(item => (
                    <div key={item.id} className="flex-shrink-0 w-16">
                      <div className="h-16 w-16 relative rounded-md overflow-hidden bg-muted">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="object-cover w-full h-full"
                        />
                        {item.quantity > 1 && (
                          <div className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                            {item.quantity}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="font-medium">Total: ${order.total.toFixed(2)}</span>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      // This would be replaced with tracking functionality
                      alert(`Tracking order ${order.id}`);
                    }}
                  >
                    {order.status === 'Delivered' ? 'View Details' : 'Track Order'}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
