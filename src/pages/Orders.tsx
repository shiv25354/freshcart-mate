import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, ArrowRight, Package, Truck, Check, 
  Calendar, ShoppingBag, Clock, ChevronDown, X, RefreshCw, ShoppingCart, AlertCircle
} from 'lucide-react';

// Utils
import { toast } from "@/lib/toast";

// Types
interface Order {
  id: string;
  date: string;
  status: string;
  items: number;
  total: string;
  products: Array<{
    name: string;
    quantity: number;
    price: string;
    image: string;
  }>;
}

// Mock orders data
const mockOrders: Order[] = [
  {
    id: '2458',
    date: '2023-07-15',
    status: 'out-for-delivery',
    items: 12,
    total: '$78.45',
    products: [
      { name: 'Organic Bananas', quantity: 2, price: '$3.99', image: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/product-1.jpg' },
      { name: 'Whole Milk', quantity: 1, price: '$4.50', image: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/product-2.jpg' },
      { name: 'Avocados', quantity: 4, price: '$6.99', image: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/product-3.jpg' },
    ]
  },
  {
    id: '3679',
    date: '2023-07-10',
    status: 'preparing',
    items: 8,
    total: '$45.99',
    products: [
      { name: 'Chicken Breast', quantity: 1, price: '$12.99', image: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/product-4.jpg' },
      { name: 'Brown Rice', quantity: 1, price: '$5.49', image: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/product-5.jpg' },
      { name: 'Broccoli', quantity: 2, price: '$3.99', image: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/product-6.jpg' },
    ]
  },
  {
    id: '1234',
    date: '2023-07-05',
    status: 'delivered',
    items: 5,
    total: '$32.50',
    products: [
      { name: 'Apples', quantity: 6, price: '$4.99', image: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/product-7.jpg' },
      { name: 'Bread', quantity: 1, price: '$3.50', image: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/product-8.jpg' },
      { name: 'Eggs', quantity: 1, price: '$5.99', image: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/product-9.jpg' },
    ]
  },
  {
    id: '5678',
    date: '2023-06-28',
    status: 'delivered',
    items: 10,
    total: '$67.25',
    products: [
      { name: 'Orange Juice', quantity: 2, price: '$5.99', image: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/product-10.jpg' },
      { name: 'Pasta', quantity: 3, price: '$2.99', image: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/product-11.jpg' },
      { name: 'Tomatoes', quantity: 4, price: '$3.99', image: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/product-12.jpg' },
    ]
  },
  {
    id: '9012',
    date: '2023-06-20',
    status: 'delivered',
    items: 7,
    total: '$42.99',
    products: [
      { name: 'Cereal', quantity: 1, price: '$4.99', image: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/product-13.jpg' },
      { name: 'Yogurt', quantity: 4, price: '$1.25', image: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/product-14.jpg' },
      { name: 'Strawberries', quantity: 1, price: '$4.99', image: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/product-15.jpg' },
    ]
  }
];

// Status badge component
const StatusBadge = ({ status }: { status: string }) => {
  let bgColor = '';
  let textColor = '';
  let icon = null;

    switch (status) {
    case 'delivered':
      bgColor = 'bg-green-100';
      textColor = 'text-green-800';
      icon = <Check className="h-3 w-3 mr-1" />;
      break;
    case 'out-for-delivery':
      bgColor = 'bg-blue-100';
      textColor = 'text-blue-800';
      icon = <Truck className="h-3 w-3 mr-1" />;
      break;
    case 'preparing':
      bgColor = 'bg-yellow-100';
      textColor = 'text-yellow-800';
      icon = <Package className="h-3 w-3 mr-1" />;
      break;
      default:
      bgColor = 'bg-gray-100';
      textColor = 'text-gray-800';
      icon = <Clock className="h-3 w-3 mr-1" />;
  }

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${bgColor} ${textColor}`}>
      {icon}
      {status.replace(/-/g, ' ')}
    </span>
  );
};

// Order card component
const OrderCard = ({ order, onTrack, onReorder }: { 
  order: Order, 
  onTrack: (id: string) => void,
  onReorder: (order: Order) => void
}) => {
  const [expanded, setExpanded] = useState(false);
  const [isReordering, setIsReordering] = useState(false);

  const handleReorder = () => {
    setIsReordering(true);
    onReorder(order);
    // Reset after animation
    setTimeout(() => setIsReordering(false), 1500);
  };

  return (
    <div className="border border-border rounded-lg overflow-hidden mb-4">
      {/* Order header */}
      <div className="p-4 bg-background">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-muted-foreground" />
            <h3 className="font-medium">Order #{order.id}</h3>
      </div>
          <StatusBadge status={order.status} />
        </div>
        
        <div className="flex justify-between text-sm text-muted-foreground mb-3">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{new Date(order.date).toLocaleDateString()}</span>
          </div>
          <span>{order.items} items • {order.total}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-sm flex items-center gap-1 text-primary"
          >
            {expanded ? 'Hide details' : 'View details'}
            <ChevronDown className={`h-4 w-4 transition-transform ${expanded ? 'rotate-180' : ''}`} />
          </button>
          
          <div className="flex gap-2">
            <button
              onClick={handleReorder}
              disabled={isReordering}
              className="flex items-center gap-1 px-3 py-1.5 bg-primary/10 text-primary rounded-md text-sm hover:bg-primary/20 transition-colors"
            >
              {isReordering ? (
                <>
                  <RefreshCw className="h-3 w-3 animate-spin" />
                  Adding...
                </>
              ) : (
                <>
                  <ShoppingCart className="h-3 w-3" />
                  Reorder
                </>
              )}
            </button>
            <button
              onClick={() => onTrack(order.id)}
              className="flex items-center gap-1 px-3 py-1.5 bg-primary/10 text-primary rounded-md text-sm hover:bg-primary/20 transition-colors"
            >
              Track
              <ArrowRight className="h-3 w-3" />
            </button>
            </div>
            </div>
          </div>
          
      {/* Order details (expandable) */}
      {expanded && (
        <div className="p-4 bg-muted/30 border-t border-border">
          <h4 className="text-sm font-medium mb-3">Order Items</h4>
          <div className="space-y-3">
            {order.products.map((product, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-md overflow-hidden bg-muted flex-shrink-0">
                  <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{product.name}</p>
                  <p className="text-xs text-muted-foreground">Qty: {product.quantity}</p>
                </div>
                <div className="text-sm font-medium">{product.price}</div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 pt-3 border-t border-border flex justify-between">
            <span className="text-sm font-medium">Total</span>
            <span className="text-sm font-bold">{order.total}</span>
          </div>
          
          <button
            onClick={handleReorder}
            disabled={isReordering}
            className="w-full mt-4 py-2 flex items-center justify-center gap-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            {isReordering ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" />
                Adding items to cart...
              </>
            ) : (
              <>
                <ShoppingCart className="h-4 w-4" />
                Add all items to cart
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

// Filter dropdown component
const FilterDropdown = ({ 
  options, 
  selected, 
  onChange,
  label
}: { 
  options: string[], 
  selected: string | null, 
  onChange: (value: string | null) => void,
  label: string
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 border border-input rounded-md text-sm hover:bg-accent"
      >
        <span>{selected || label}</span>
        <ChevronDown className="h-4 w-4" />
      </button>
      
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-48 bg-background border border-input rounded-md shadow-lg z-10">
          <div className="p-1">
            {selected && (
              <button
                onClick={() => {
                  onChange(null);
                  setIsOpen(false);
                }}
                className="flex items-center gap-2 w-full px-3 py-2 text-sm text-destructive hover:bg-accent rounded-md text-left"
              >
                <X className="h-4 w-4" />
                Clear filter
              </button>
            )}
            
            {options.map((option) => (
              <button
                key={option}
                onClick={() => {
                  onChange(option);
                  setIsOpen(false);
                }}
                className={`w-full px-3 py-2 text-sm hover:bg-accent rounded-md text-left ${
                  selected === option ? 'bg-primary/10 text-primary' : ''
                }`}
              >
                {option.replace(/-/g, ' ')}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

/**
 * Orders page component
 * Displays all user orders with filtering and sorting options
 */
const Orders = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<string | null>('newest');
  const isLoading = useState(false)[0];
  const [quickOrderId, setQuickOrderId] = useState('');
  
  // Handle tracking an order
  const handleTrackOrder = useCallback((id: string) => {
    navigate(`/track-order/${id}`);
  }, [navigate]);
  
  // Handle quick order lookup
  const handleQuickLookup = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (!quickOrderId.trim()) {
      toast.error("Please enter an order ID", {
        icon: <X className="h-4 w-4" />
      });
      return;
    }
    
    // Check if order exists in mock data
    const orderExists = mockOrders.some(order => order.id === quickOrderId.trim());
    
    if (orderExists) {
      navigate(`/track-order/${quickOrderId.trim()}`);
    } else {
      toast.error(`Order #${quickOrderId.trim()} not found`, {
        description: "Please check the order ID and try again",
        icon: <AlertCircle className="h-4 w-4" />
      });
    }
  }, [quickOrderId, navigate]);
  
  // Handle reordering items
  const handleReorder = useCallback((order: Order) => {
    // Simulate adding items to cart
    setTimeout(() => {
      toast.success(`Added ${order.items} items to cart`, {
        description: "All items from your previous order have been added",
        icon: <ShoppingCart className="h-4 w-4" />
      });
      
      // In a real app, you would add the items to the cart here
      // For example: order.products.forEach(product => addToCart(product));
    }, 1000);
  }, []);
  
  // Filter and sort orders
  const filteredOrders = mockOrders
    .filter(order => {
      // Apply status filter
      if (statusFilter && order.status !== statusFilter) {
        return false;
      }
      
      // Apply search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          order.id.toLowerCase().includes(query) ||
          order.products.some(product => product.name.toLowerCase().includes(query))
        );
      }
      
      return true;
    })
    .sort((a, b) => {
      // Apply sorting
      if (sortBy === 'newest') {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      } else if (sortBy === 'oldest') {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      } else if (sortBy === 'highest') {
        return parseFloat(b.total.replace('$', '')) - parseFloat(a.total.replace('$', ''));
      } else if (sortBy === 'lowest') {
        return parseFloat(a.total.replace('$', '')) - parseFloat(b.total.replace('$', ''));
      }
      return 0;
    });
  
  // Get unique statuses for filter
  const statuses = Array.from(new Set(mockOrders.map(order => order.status)));
  
  return (
    <div className="min-h-screen bg-background pt-16 pb-20">
      <div className="max-w-2xl mx-auto px-4">
        {/* Quick order lookup */}
        <div className="bg-primary/5 rounded-lg p-4 mb-8 border border-primary/20">
          <h2 className="text-lg font-medium mb-2">Quick Order Lookup</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Enter your order ID to quickly check its status and track delivery
          </p>
          <form onSubmit={handleQuickLookup} className="flex gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Enter order ID (e.g., 2458)"
                value={quickOrderId}
                onChange={(e) => setQuickOrderId(e.target.value)}
                className="w-full pl-4 pr-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
        </div>
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 whitespace-nowrap flex items-center gap-2"
            >
              <Truck className="h-4 w-4" />
              Track Order
            </button>
          </form>
                </div>
                
        <h1 className="text-2xl font-bold mb-2">My Orders</h1>
        <p className="text-muted-foreground mb-6">
          View, track and reorder your previous purchases
        </p>
        
        {/* Search and filters */}
        <div className="mb-6 space-y-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search orders by ID or product..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
                        )}
                      </div>
          
          <div className="flex flex-wrap gap-2">
            <FilterDropdown
              label="Filter by Status"
              options={statuses}
              selected={statusFilter}
              onChange={setStatusFilter}
            />
            
            <FilterDropdown
              label="Sort by"
              options={['newest', 'oldest', 'highest', 'lowest']}
              selected={sortBy}
              onChange={setSortBy}
            />
                    </div>
                </div>
                
        {/* Orders list */}
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((_, index) => (
              <div key={index} className="border border-border rounded-lg overflow-hidden p-4 animate-pulse">
                <div className="h-6 bg-muted rounded w-1/3 mb-4"></div>
                <div className="h-4 bg-muted rounded w-1/2 mb-2"></div>
                <div className="h-4 bg-muted rounded w-1/4"></div>
              </div>
            ))}
            </div>
        ) : filteredOrders.length > 0 ? (
          <div>
            {filteredOrders.map(order => (
              <OrderCard 
                key={order.id} 
                order={order} 
                onTrack={handleTrackOrder}
                onReorder={handleReorder}
              />
          ))}
        </div>
        ) : (
          <div className="text-center py-12">
            <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No orders found</h3>
            <p className="text-muted-foreground mb-6">
              {searchQuery || statusFilter
                ? "Try adjusting your filters or search query"
                : "You haven't placed any orders yet"}
            </p>
            <button
              onClick={() => navigate('/')}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
