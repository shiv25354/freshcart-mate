// Core imports
import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// UI and Icons
import { 
  Truck, Check, ShoppingCart, Package, AlertCircle, RefreshCw, 
  Share2, Phone, Clock, X, 
  Download, Smartphone, CheckCircle, Utensils,
  LucideIcon
} from 'lucide-react';

// Utils
import { toast } from "@/lib/toast";

// Components
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { QRCodeDisplay } from '@/components/QRCodeDisplay';

type OrderStatus = 'preparing' | 'out-for-delivery' | 'delivered' | 'cancelled' | 'in_progress';

interface OrderProgress {
  step: string;
  completed: boolean;
  status: string;
  icon: LucideIcon;
}

interface OrderDetails {
  id: string;
  status: OrderStatus;
  eta: string;
  distance: string;
  progress: OrderProgress[];
  driver: {
    name: string;
    phone: string;
    photo: string;
  };
  instructions: string;
  contactless: boolean;
  items: {
    name: string;
    quantity: number;
    price: number;
  }[];
}

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

// Mock order tracking data
const mockOrderDetails: Record<string, OrderDetails> = {
  '2458': {
    id: '2458',
    status: 'out-for-delivery',
    eta: '12:45 PM',
    distance: '2.3 km',
    progress: [
      { step: 'Order Placed', completed: true, status: 'Completed', icon: CheckCircle },
      { step: 'Preparing', completed: true, status: 'Completed', icon: Utensils },
      { step: 'Out for Delivery', completed: true, status: 'Completed', icon: Truck },
      { step: 'Delivered', completed: false, status: 'Pending', icon: Package }
    ],
    driver: {
      name: 'Michael Chen',
      phone: '+1234567890',
      photo: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg'
    },
    instructions: 'Leave at the door. Please ring doorbell after delivery.',
    contactless: true,
    items: [
      {
        name: 'Groceries Pack 1',
        quantity: 2,
        price: 45.99
      },
      {
        name: 'Fresh Produce',
        quantity: 1,
        price: 32.46
      }
    ]
  },
  '3679': {
    id: '3679',
    status: 'preparing',
    eta: '1:30 PM',
    distance: '3.5 km',
    progress: [
      { step: 'Order Placed', completed: true, status: 'Completed', icon: CheckCircle },
      { step: 'Preparing', completed: false, status: 'In Progress', icon: Utensils },
      { step: 'Out for Delivery', completed: false, status: 'Pending', icon: Truck },
      { step: 'Delivered', completed: false, status: 'Pending', icon: Package }
    ],
    driver: {
      name: 'Sarah Johnson',
      phone: '+1987654321',
      photo: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg'
    },
    instructions: 'Call when you arrive. Building has security entrance.',
    contactless: false,
    items: [
      {
        name: 'Weekly Essentials',
        quantity: 1,
        price: 45.99
      }
    ]
  }
};

/**
 * TrackOrder component for tracking delivery status
 * Handles order lookup, status updates, and notifications
 */
export default function TrackOrderPage() {
  return (
    <ErrorBoundary>
      <TrackOrder />
    </ErrorBoundary>
  );
}

function TrackOrder() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  
  if (!orderId) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-2xl font-bold mb-4">Invalid Order ID</h1>
        <p className="text-gray-600 mb-6">Please provide a valid order ID to track your delivery</p>
        <button
          onClick={() => navigate('/track')}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Go Back
        </button>
      </div>
    );
  }

  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [remainingTime, setRemainingTime] = useState<string>('');
  const [showQrCode, setShowQrCode] = useState(false);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [showAddToHomeScreen, setShowAddToHomeScreen] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [notifiedSteps, setNotifiedSteps] = useState<Set<number>>(new Set());

  // Calculate remaining time with proper validation
  const calculateRemainingTime = useCallback((eta: string): string => {
    try {
      const etaParts = eta.match(/(\d+):(\d+)\s+(AM|PM)/i);
      if (!etaParts) {
        return 'Invalid ETA format';
      }

      const [_, hours, minutes, period] = etaParts;
      const etaDate = new Date();
      let etaHours = parseInt(hours);
      
      if (period.toUpperCase() === 'PM' && etaHours !== 12) {
        etaHours += 12;
      } else if (period.toUpperCase() === 'AM' && etaHours === 12) {
        etaHours = 0;
      }

      etaDate.setHours(etaHours, parseInt(minutes), 0);

      // If ETA is for next day (when current time is after ETA time)
      if (etaDate < new Date()) {
        etaDate.setDate(etaDate.getDate() + 1);
      }

      const diffMs = etaDate.getTime() - new Date().getTime();
      const diffMins = Math.round(diffMs / 60000);

      if (diffMins < 0) {
        return 'Delivery overdue';
      } else if (diffMins === 0) {
        return 'Arriving now';
      } else if (diffMins < 60) {
        return `${diffMins} minutes`;
      } else {
        const hours = Math.floor(diffMins / 60);
        const mins = diffMins % 60;
        return `${hours}h ${mins}m`;
      }
    } catch (error) {
      console.error('Error calculating ETA:', error);
      return 'ETA calculation error';
    }
  }, []);

  // Update remaining time with cleanup
  useEffect(() => {
    if (!orderDetails?.eta) return;

    const updateRemainingTime = () => {
      const timeLeft = calculateRemainingTime(orderDetails.eta);
      setRemainingTime(timeLeft);
    };

    updateRemainingTime();
    const interval = setInterval(updateRemainingTime, 60000);
    return () => clearInterval(interval);
  }, [orderDetails?.eta, calculateRemainingTime]);

  // Fetch order details
  useEffect(() => {
    let mounted = true;
    const controller = new AbortController();

    const getOrderDetails = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Simulate API call
        const mockData = mockOrderDetails[orderId];
        
        if (!mockData) {
          throw new Error('Order not found');
        }

        if (mounted) {
          setOrderDetails(mockData);
          setIsLoading(false);
        }
      } catch (error) {
        if (mounted && !controller.signal.aborted) {
          const errorMessage = error instanceof Error ? error.message : 'Failed to fetch order details';
          setError(errorMessage);
          toast.error(errorMessage);
          navigate('/track');
        }
      }
    };

    getOrderDetails();

    return () => {
      mounted = false;
      controller.abort();
    };
  }, [orderId, navigate]);

  // Handle refresh
  const handleRefresh = useCallback(async () => {
    if (!orderId || isRefreshing) return;

    setIsRefreshing(true);
    try {
      const mockData = mockOrderDetails[orderId];
      if (!mockData) {
        throw new Error('Order not found');
      }
      setOrderDetails(mockData);
      toast.success('Order status updated');
    } catch (error) {
      toast.error('Failed to refresh order status');
    } finally {
      setIsRefreshing(false);
    }
  }, [orderId, isRefreshing]);

  // Handle share
  const handleShare = useCallback(async () => {
    if (!orderId) {
      toast.error('No order to share');
      return;
    }

    const shareUrl = `${window.location.origin}/track/${orderId}`;
    
    try {
      if (navigator.share) {
        await navigator.share({
          title: `Track Order #${orderId}`,
          text: `Track your FreshCart order #${orderId} in real-time!`,
          url: shareUrl,
        });
        toast.success('Order shared successfully!');
      } else {
        setShowQrCode(true);
      }
    } catch (error) {
      if (error instanceof Error && error.name !== 'AbortError') {
        setShowQrCode(true);
      }
    }
  }, [orderId]);

  // Handle cancel order
  const handleCancelOrder = useCallback(() => {
    if (!orderId || !orderDetails) return;
    
    // Only allow cancellation for orders that are not out for delivery or delivered
    if (orderDetails.status === 'out-for-delivery' || orderDetails.status === 'delivered') {
      toast.error("Cannot cancel order", {
        description: "Your order is already out for delivery or delivered",
        icon: <X className="h-4 w-4" />
      });
      setShowCancelConfirm(false);
      return;
    }

    // Simulate API call
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Order cancelled successfully", {
        description: "Your payment will be refunded within 3-5 business days",
        icon: <Check className="h-4 w-4" />
      });
      setShowCancelConfirm(false);
      navigate('/orders');
    }, 1500);
  }, [orderId, orderDetails, navigate]);

  // Listen for beforeinstallprompt event
  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowAddToHomeScreen(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  // Handle Add to Home Screen
  const handleAddToHomeScreen = useCallback(async () => {
    if (!deferredPrompt) {
      toast.info("To add to home screen:", {
        description: "Use your browser's 'Add to Home Screen' option in the menu",
        icon: <Smartphone className="h-4 w-4" />
      });
      return;
    }

    try {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        toast.success("Added to home screen!", {
          description: "You can now access this order tracking directly from your home screen",
          icon: <Check className="h-4 w-4" />
        });
      }
    } catch (error) {
      console.error('Error adding to home screen:', error);
      toast.error("Failed to add to home screen");
    } finally {
      setDeferredPrompt(null);
      setShowAddToHomeScreen(false);
    }
  }, [deferredPrompt]);

  // Handle order status notification
  const showStatusNotification = useCallback((step: OrderProgress) => {
    switch (step.step) {
      case 'Order Placed':
        toast.success("🟢 Your order is confirmed!", {
          description: "We're getting everything ready for you. 🛒",
          icon: <ShoppingCart className="h-4 w-4" />
        });
        break;
      case 'Preparing':
        toast.info("👨‍🍳 Your order is being prepared!", {
          description: "Our team is carefully preparing your items.",
          icon: <Package className="h-4 w-4" />
        });
        break;
      case 'Out for Delivery':
        toast.info("🚗 Your groceries are on the way!", {
          description: "Track your order in real-time. 📍",
          icon: <Truck className="h-4 w-4" />
        });
        break;
      case 'Delivered':
        toast.success("📦 Delivered!", {
          description: "Your groceries have arrived. Bon appétit! 🍏",
          icon: <Package className="h-4 w-4" />
        });
        break;
      default:
        toast.success(`Order Status Updated!`, {
          description: `Your order is now ${step.step.toLowerCase()}`,
          icon: <Check className="h-4 w-4" />
        });
    }
  }, []);

  // Order status update effect - simulates real-time updates
  useEffect(() => {
    if (isLoading || !orderDetails) return;

    let mounted = true;
    const timers: NodeJS.Timeout[] = [];

    const updateOrderStatus = async () => {
      const currentActiveStepIndex = orderDetails.progress.findIndex(step => !step.completed);
      if (currentActiveStepIndex === -1) return; // All steps completed

      // Only proceed if we haven't notified about this step
      if (!notifiedSteps.has(currentActiveStepIndex)) {
        const timer = setTimeout(() => {
          if (!mounted) return;

          const currentStep = orderDetails.progress[currentActiveStepIndex];
          
          // Update progress
          setOrderDetails(prev => {
            if (!prev || !mounted) return prev;
            
            // Create updated progress array
            const updatedProgress = prev.progress.map((step, index) => 
              index === currentActiveStepIndex ? { ...step, completed: true } : step
            );
            
            // Update status based on the current step
            let updatedStatus: OrderStatus = prev.status;
            if (currentStep.step === 'Preparing') {
              updatedStatus = 'preparing';
            } else if (currentStep.step === 'Out for Delivery') {
              updatedStatus = 'out-for-delivery';
            } else if (currentStep.step === 'Delivered') {
              updatedStatus = 'delivered';
            }
            
            return {
              ...prev,
              status: updatedStatus,
              progress: updatedProgress
            };
          });

          // Show notification and mark as notified
          if (mounted) {
            showStatusNotification(currentStep);
            setNotifiedSteps(prev => new Set([...prev, currentActiveStepIndex]));
          }
        }, 5000);

        timers.push(timer);
      }
    };

    updateOrderStatus();

    // Cleanup function
    return () => {
      mounted = false;
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [isLoading, orderDetails, notifiedSteps, showStatusNotification]);

  // Handle driver contact
  const handleDriverContact = useCallback(() => {
    if (!orderDetails?.driver?.phone) {
      toast.error("Driver contact not available", {
        description: "Please try again later or contact support",
        icon: <Phone className="h-4 w-4" />
      });
      return;
    }

    // Check if order is out for delivery
    if (orderDetails.status !== 'out-for-delivery') {
      toast.info("Driver not assigned yet", {
        description: "You can contact the driver once your order is out for delivery",
        icon: <AlertCircle className="h-4 w-4" />
      });
      return;
    }

    // Format phone number for dialing
    const phoneNumber = orderDetails.driver.phone.replace(/\D/g, '');
    window.location.href = `tel:${phoneNumber}`;
  }, [orderDetails]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <RefreshCw className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    );
  }

  if (error || !orderDetails) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-2xl font-bold mb-4">Order Not Found</h1>
        <p className="text-gray-600 mb-6">{error || 'Please check the order ID and try again'}</p>
        <button
          onClick={() => navigate('/track')}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 bg-white border-b border-gray-200 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold">Order #{orderId}</h1>
            <div className="flex gap-2">
              <button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                <RefreshCw className={`h-5 w-5 ${isRefreshing ? 'animate-spin' : ''}`} />
              </button>
              <button
                onClick={handleShare}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                <Share2 className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 py-6">
        {/* ETA Section */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600">Estimated Time</p>
              <p className="text-2xl font-semibold">{remainingTime}</p>
            </div>
            <Clock className="h-8 w-8 text-blue-500" />
          </div>
        </div>

        {/* Progress Section */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <h2 className="text-lg font-semibold mb-4">Order Progress</h2>
          <div className="space-y-4">
            {orderDetails.progress.map((step, index) => (
              <ProgressStep
                key={step.step}
                step={step.step}
                completed={step.completed}
                index={index}
              />
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-4">
          <button
            onClick={() => setShowCancelConfirm(true)}
            disabled={orderDetails.status === 'out-for-delivery' || orderDetails.status === 'delivered'}
            className={`w-full py-3 border border-red-500 rounded-lg ${
              orderDetails.status === 'out-for-delivery' || orderDetails.status === 'delivered'
                ? 'opacity-50 cursor-not-allowed'
                : 'text-red-500 hover:bg-red-50'
            }`}
          >
            Cancel Order
          </button>
          <button
            onClick={handleDriverContact}
            disabled={!orderDetails?.driver?.phone || orderDetails.status !== 'out-for-delivery'}
            className={`w-full py-3 rounded-lg ${
              !orderDetails?.driver?.phone || orderDetails.status !== 'out-for-delivery'
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
          >
            Contact Driver
          </button>
        </div>
      </main>

      {/* Modals */}
      {showQrCode && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Share Order Tracking</h3>
              <button
                onClick={() => setShowQrCode(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <QRCodeDisplay orderId={orderId} />
          </div>
        </div>
      )}

      {showCancelConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-4">Cancel Order?</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to cancel this order?</p>
            <div className="flex gap-4">
              <button
                onClick={() => setShowCancelConfirm(false)}
                className="flex-1 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                No, Keep Order
              </button>
              <button
                onClick={handleCancelOrder}
                className="flex-1 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {showAddToHomeScreen && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 shadow-lg">
          <div className="flex items-center justify-between max-w-2xl mx-auto">
            <div className="flex items-center gap-3">
              <Download className="h-6 w-6 text-blue-500" />
              <div>
                <p className="font-medium">Add to Home Screen</p>
                <p className="text-sm text-gray-600">Quick access to order tracking</p>
              </div>
            </div>
            <button
              onClick={handleAddToHomeScreen}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Add Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Progress step component
function ProgressStep({ step, completed, index }: { step: string; completed: boolean; index: number }) {
  return (
    <div className="flex items-center">
      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
        completed ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'
      }`}>
        {completed ? <Check className="h-4 w-4" /> : index + 1}
      </div>
      <div className="ml-4">
        <p className={`font-medium ${completed ? 'text-green-500' : 'text-gray-600'}`}>
          {step}
        </p>
      </div>
    </div>
  );
}