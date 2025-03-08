
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { toast } from '@/lib/toast';
import { deliveryOptions, paymentMethods } from '@/lib/checkout-constants';

// Component imports
import CheckoutHeader from '@/components/checkout/CheckoutHeader';
import DeliveryOptions from '@/components/checkout/DeliveryOptions';
import PaymentMethods from '@/components/checkout/PaymentMethods';
import OrderItems from '@/components/checkout/OrderItems';
import OrderSummary from '@/components/checkout/OrderSummary';

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, getCartTotal, clearCart } = useCart();
  const [selectedDelivery, setSelectedDelivery] = useState<string>(deliveryOptions[0].id);
  const [selectedPayment, setSelectedPayment] = useState<string>(paymentMethods[0].id);
  
  // Calculate totals
  const subtotal = getCartTotal();
  const deliveryFee = deliveryOptions.find(option => option.id === selectedDelivery)?.price || 0;
  const total = subtotal + deliveryFee;
  
  const handlePlaceOrder = () => {
    // Here we would connect to a payment gateway or API
    toast.success('Order placed successfully!');
    clearCart();
    // Navigate to the order success page instead of orders page
    navigate('/order-success');
  };
  
  return (
    <div className="min-h-screen pt-16 pb-20 px-4 md:px-6 max-w-7xl mx-auto">
      <CheckoutHeader title="Checkout" backUrl="/cart" />
      
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Delivery Options */}
          <DeliveryOptions 
            deliveryOptions={deliveryOptions}
            selectedDelivery={selectedDelivery}
            setSelectedDelivery={setSelectedDelivery}
          />
          
          {/* Payment Methods */}
          <PaymentMethods 
            paymentMethods={paymentMethods}
            selectedPayment={selectedPayment}
            setSelectedPayment={setSelectedPayment}
          />

          {/* Order Items */}
          <OrderItems cartItems={cartItems} />
        </div>
        
        {/* Order Summary */}
        <div className="lg:col-span-1">
          <OrderSummary 
            subtotal={subtotal}
            deliveryFee={deliveryFee}
            total={total}
            onPlaceOrder={handlePlaceOrder}
          />
        </div>
      </div>
    </div>
  );
};

export default Checkout;
