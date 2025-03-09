
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  Check, 
  AlertTriangle, 
  Info, 
  X, 
  Bell, 
  Clock, 
  Package, 
  CreditCard, 
  Download, 
  ShoppingCart 
} from 'lucide-react';
import { toast } from '@/lib/toast';

const ToastDemo = () => {
  const showSuccessToast = () => {
    toast.success('Action completed successfully!', {
      description: 'Your action has been processed without any issues.',
      icon: <Check className="h-4 w-4" />,
    });
  };

  const showErrorToast = () => {
    toast.error('An error occurred', {
      description: 'There was a problem completing your request.',
      icon: <X className="h-4 w-4" />,
    });
  };

  const showInfoToast = () => {
    toast.info('Information', {
      description: 'This is an informational message.',
      icon: <Info className="h-4 w-4" />,
    });
  };

  const showWarningToast = () => {
    toast.warning('Warning', {
      description: 'This action may have consequences.',
      icon: <AlertTriangle className="h-4 w-4" />,
    });
  };

  const showDefaultToast = () => {
    toast.default('Notification', {
      description: 'This is a default notification.',
    });
  };

  const showActionToast = () => {
    toast.info('New update available', {
      description: 'A new version of the app is ready to install.',
      action: {
        label: 'Update',
        onClick: () => toast.success('Updating application...'),
      },
    });
  };

  const showPromiseToast = () => {
    // Fix the promise type and error handler
    const promise = new Promise<{ orderNumber: string }>((resolve) => {
      setTimeout(() => resolve({ orderNumber: 'Order #2458' }), 2000);
    });

    toast.promise(promise, {
      loading: 'Processing your order...',
      success: (data) => ({
        title: 'Order placed!',
        description: `${data.orderNumber} has been confirmed`,
      }),
      error: (err) => ({
        title: 'Error processing your order',
        description: 'Please try again later'
      }),
    });
  };

  const showCustomIcons = () => {
    toast.success('Order shipped!', {
      icon: <Package className="h-4 w-4" />,
      description: 'Your order has been shipped and is on its way.',
    });
    
    setTimeout(() => {
      toast.info('Reminder', {
        icon: <Clock className="h-4 w-4" />,
        description: 'Your delivery is scheduled for tomorrow.',
      });
    }, 1500);
    
    setTimeout(() => {
      toast.default('Payment processed', {
        icon: <CreditCard className="h-4 w-4" />,
        description: 'Your payment has been successfully processed.',
      });
    }, 3000);
  };

  return (
    <div className="p-6 space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Unified Toast Notification System</h2>
        <p className="text-muted-foreground mb-6">
          Click the buttons below to see different types of toast notifications.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <Button onClick={showSuccessToast} className="flex items-center gap-2">
          <Check className="h-4 w-4" />
          Success Toast
        </Button>
        
        <Button onClick={showErrorToast} variant="destructive" className="flex items-center gap-2">
          <X className="h-4 w-4" />
          Error Toast
        </Button>
        
        <Button onClick={showInfoToast} variant="secondary" className="flex items-center gap-2">
          <Info className="h-4 w-4" />
          Info Toast
        </Button>
        
        <Button onClick={showWarningToast} variant="outline" className="flex items-center gap-2">
          <AlertTriangle className="h-4 w-4" />
          Warning Toast
        </Button>
        
        <Button onClick={showDefaultToast} variant="ghost" className="flex items-center gap-2">
          <Bell className="h-4 w-4" />
          Default Toast
        </Button>
        
        <Button onClick={showActionToast} variant="outline" className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Action Toast
        </Button>
        
        <Button onClick={showPromiseToast} variant="secondary" className="flex items-center gap-2">
          <ShoppingCart className="h-4 w-4" />
          Promise Toast
        </Button>
        
        <Button onClick={showCustomIcons} variant="default" className="flex items-center gap-2">
          <Package className="h-4 w-4" />
          Custom Icons
        </Button>
      </div>
    </div>
  );
};

export default ToastDemo;
