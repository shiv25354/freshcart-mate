
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  User, 
  MapPin, 
  CreditCard, 
  Package, 
  Bell, 
  Settings, 
  LogOut 
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/components/ui/sonner';

// Mock user data
const mockUser = {
  name: 'Alex Johnson',
  email: 'alex.johnson@example.com',
  phone: '(555) 123-4567',
  address: '123 Main Street, Apt 4B, New York, NY 10001',
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3'
};

const ProfilePage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(mockUser);
  const [formValues, setFormValues] = useState(mockUser);
  
  useEffect(() => {
    // Simulate loading user data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUser(formValues);
    toast.success('Profile updated successfully');
  };

  // Mock order history
  const orders = [
    { id: 'ORD-1234', date: '2023-10-15', items: 5, total: 45.95, status: 'Delivered' },
    { id: 'ORD-5678', date: '2023-09-28', items: 3, total: 29.99, status: 'Delivered' },
    { id: 'ORD-9012', date: '2023-08-17', items: 2, total: 19.50, status: 'Delivered' }
  ];

  // Profile tab sections config
  const tabs = [
    { id: 'account', label: 'Account', icon: User },
    { id: 'orders', label: 'My Orders', icon: Package },
    { id: 'addresses', label: 'Addresses', icon: MapPin },
    { id: 'payments', label: 'Payment Methods', icon: CreditCard },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <div className="min-h-screen pt-16 pb-20 px-4 md:px-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-medium mt-8 mb-6">My Profile</h1>
      
      {isLoading ? (
        <div className="grid gap-6">
          <div className="h-12 bg-muted animate-pulse rounded-lg"></div>
          <div className="h-64 bg-muted animate-pulse rounded-lg"></div>
        </div>
      ) : (
        <Tabs defaultValue="account" className="w-full">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/4">
              <div className="rounded-xl bg-card p-6 shadow-sm mb-6">
                <div className="flex flex-col items-center">
                  <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
                    <img 
                      src={user.avatar} 
                      alt={user.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h2 className="text-xl font-medium">{user.name}</h2>
                  <p className="text-muted-foreground mb-4">{user.email}</p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full mb-4"
                    onClick={() => navigate('/orders')}
                  >
                    <Package className="mr-2 h-4 w-4" />
                    View Orders
                  </Button>
                </div>
                
                <Separator className="my-4" />
                
                <TabsList className="flex flex-col w-full space-y-1 h-auto bg-transparent">
                  {tabs.map(tab => (
                    <TabsTrigger 
                      key={tab.id}
                      value={tab.id}
                      className="w-full flex items-center justify-start text-left px-3 py-2 h-10"
                    >
                      <tab.icon className="mr-2 h-4 w-4" />
                      {tab.label}
                    </TabsTrigger>
                  ))}
                  <Button 
                    variant="ghost" 
                    className="w-full flex items-center justify-start text-left px-3 py-2 h-10 mt-2"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </Button>
                </TabsList>
              </div>
            </div>

            <div className="md:w-3/4">
              <TabsContent value="account" className="mt-0">
                <div className="rounded-xl bg-card p-6 shadow-sm">
                  <h2 className="text-xl font-medium mb-6">Personal Information</h2>
                  <form onSubmit={handleSubmit}>
                    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 mb-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input 
                          id="name" 
                          name="name" 
                          value={formValues.name} 
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input 
                          id="email" 
                          name="email" 
                          type="email" 
                          value={formValues.email} 
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input 
                          id="phone" 
                          name="phone" 
                          value={formValues.phone} 
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="address">Address</Label>
                        <Input 
                          id="address" 
                          name="address" 
                          value={formValues.address} 
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <Button type="submit">Save Changes</Button>
                  </form>
                </div>
              </TabsContent>

              <TabsContent value="orders" className="mt-0">
                <div className="rounded-xl bg-card p-6 shadow-sm">
                  <h2 className="text-xl font-medium mb-6">Order History</h2>
                  {orders.length === 0 ? (
                    <div className="text-center py-12">
                      <Package className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium mb-2">No orders yet</h3>
                      <p className="text-muted-foreground mb-6">
                        You haven't placed any orders yet.
                      </p>
                      <Button onClick={() => navigate('/')}>Start Shopping</Button>
                    </div>
                  ) : (
                    <div className="grid gap-4">
                      {orders.map(order => (
                        <div key={order.id} className="border rounded-lg p-4">
                          <div className="flex flex-wrap justify-between items-center">
                            <div>
                              <h3 className="font-medium">{order.id}</h3>
                              <p className="text-sm text-muted-foreground">
                                {new Date(order.date).toLocaleDateString()} • {order.items} items
                              </p>
                            </div>
                            <div className="flex items-center">
                              <span className="text-right">${order.total.toFixed(2)}</span>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="ml-4"
                                onClick={() => navigate(`/orders/${order.id}`)}
                              >
                                View Details
                              </Button>
                            </div>
                          </div>
                          <div className="mt-3 flex justify-between items-center">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              {order.status}
                            </span>
                            <Button variant="outline" size="sm">
                              Track Order
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="addresses" className="mt-0">
                <div className="rounded-xl bg-card p-6 shadow-sm">
                  <h2 className="text-xl font-medium mb-6">Saved Addresses</h2>
                  <div className="border rounded-lg p-4 mb-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">Home</h3>
                        <p className="text-muted-foreground">
                          {user.address}
                        </p>
                      </div>
                      <Button variant="ghost" size="sm">Edit</Button>
                    </div>
                    <div className="mt-2">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/20 text-primary">
                        Default
                      </span>
                    </div>
                  </div>
                  <Button variant="outline">
                    <Plus className="mr-2 h-4 w-4" />
                    Add New Address
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="payments" className="mt-0">
                <div className="rounded-xl bg-card p-6 shadow-sm">
                  <h2 className="text-xl font-medium mb-6">Payment Methods</h2>
                  <div className="border rounded-lg p-4 mb-4">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center">
                        <CreditCard className="h-10 w-10 text-primary mr-3" />
                        <div>
                          <h3 className="font-medium">Visa ending in 4242</h3>
                          <p className="text-sm text-muted-foreground">
                            Expires 12/2025
                          </p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">Edit</Button>
                    </div>
                    <div className="mt-2">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/20 text-primary">
                        Default
                      </span>
                    </div>
                  </div>
                  <Button variant="outline">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Payment Method
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="settings" className="mt-0">
                <div className="rounded-xl bg-card p-6 shadow-sm">
                  <h2 className="text-xl font-medium mb-6">Preferences</h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Email Notifications</h3>
                        <p className="text-sm text-muted-foreground">
                          Receive emails about your orders and account
                        </p>
                      </div>
                      <Switch checked={true} />
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Order Confirmations</h3>
                        <p className="text-sm text-muted-foreground">
                          Receive confirmation when placing orders
                        </p>
                      </div>
                      <Switch checked={true} />
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Promotional Emails</h3>
                        <p className="text-sm text-muted-foreground">
                          Receive emails about deals and new products
                        </p>
                      </div>
                      <Switch checked={false} />
                    </div>
                  </div>
                </div>
              </TabsContent>
            </div>
          </div>
        </Tabs>
      )}
    </div>
  );
};

// Simple Switch component for the settings tab
const Switch = ({ checked }: { checked: boolean }) => {
  const [isChecked, setIsChecked] = useState(checked);
  
  return (
    <button
      type="button"
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
        isChecked ? 'bg-primary' : 'bg-muted'
      }`}
      onClick={() => setIsChecked(!isChecked)}
    >
      <span
        className={`${
          isChecked ? 'translate-x-6' : 'translate-x-1'
        } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
      />
    </button>
  );
};

export default ProfilePage;
