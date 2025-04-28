import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { CartProvider, useCart } from './CartContext';
import { Product } from '@/lib/data';
import { toast } from 'sonner';

// Mock sonner toast
vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    info: vi.fn(),
  },
}));

// Mock localStorage
const mockLocalStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
});

// Sample product data
const sampleProduct: Product = {
  id: '1',
  name: 'Test Product',
  price: 10.00,
  image: 'test.jpg',
  category: 'test',
  description: 'Test description',
  discount: 0,
  inStock: true,
  rating: 4.5
};

const sampleProductWithWeight: Product & { selectedWeight?: string } = {
  ...sampleProduct,
  selectedWeight: '500g',
  weightOptions: [
    { label: '500g', value: '500g', priceModifier: 0 },
    { label: '1kg', value: '1kg', priceModifier: 0.5 },
  ],
};

// Test component that uses the cart context
const TestComponent = () => {
  const { 
    addToCart, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    getCartTotal,
    getCartCount 
  } = useCart();

  return (
    <div>
      <div data-testid="cart-count">{getCartCount()}</div>
      <div data-testid="cart-total">{getCartTotal()}</div>
      <button onClick={() => addToCart(sampleProduct)}>Add Item</button>
      <button onClick={() => removeFromCart(sampleProduct.id)}>Remove Item</button>
      <button onClick={() => updateQuantity(sampleProduct.id, 2)}>Update Quantity</button>
      <button onClick={clearCart}>Clear Cart</button>
    </div>
  );
};

describe('CartContext', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockLocalStorage.getItem.mockReturnValue(null);
  });

  it('initializes with empty cart', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    expect(screen.getByTestId('cart-count')).toHaveTextContent('0');
    expect(screen.getByTestId('cart-total')).toHaveTextContent('0');
  });

  it('loads cart from localStorage on mount', () => {
    const savedCart = [{ product: sampleProduct, quantity: 2 }];
    mockLocalStorage.getItem.mockReturnValue(JSON.stringify(savedCart));

    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    expect(screen.getByTestId('cart-count')).toHaveTextContent('2');
    expect(screen.getByTestId('cart-total')).toHaveTextContent('20');
  });

  it('adds item to cart', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    fireEvent.click(screen.getByText('Add Item'));

    expect(screen.getByTestId('cart-count')).toHaveTextContent('1');
    expect(screen.getByTestId('cart-total')).toHaveTextContent('10');
    expect(toast.success).toHaveBeenCalledWith('Added Test Product to cart');
  });

  it('adds item with weight to cart', () => {
    const TestWeightComponent = () => {
      const { addToCart, getCartCount } = useCart();
      return (
        <div>
          <div data-testid="cart-count">{getCartCount()}</div>
          <button onClick={() => addToCart(sampleProductWithWeight)}>Add Weight Item</button>
        </div>
      );
    };

    render(
      <CartProvider>
        <TestWeightComponent />
      </CartProvider>
    );

    fireEvent.click(screen.getByText('Add Weight Item'));

    expect(screen.getByTestId('cart-count')).toHaveTextContent('1');
    expect(toast.success).toHaveBeenCalledWith('Added Test Product (500g) to cart');
  });

  it('removes item from cart', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    // First add an item
    fireEvent.click(screen.getByText('Add Item'));
    // Then remove it
    fireEvent.click(screen.getByText('Remove Item'));

    expect(screen.getByTestId('cart-count')).toHaveTextContent('0');
    expect(screen.getByTestId('cart-total')).toHaveTextContent('0');
    expect(toast.info).toHaveBeenCalledWith('Removed Test Product from cart');
  });

  it('updates item quantity', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    // First add an item
    fireEvent.click(screen.getByText('Add Item'));
    // Then update its quantity
    fireEvent.click(screen.getByText('Update Quantity'));

    expect(screen.getByTestId('cart-count')).toHaveTextContent('2');
    expect(screen.getByTestId('cart-total')).toHaveTextContent('20');
  });

  it('clears cart', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    // Add an item and then clear the cart
    fireEvent.click(screen.getByText('Add Item'));
    fireEvent.click(screen.getByText('Clear Cart'));

    expect(screen.getByTestId('cart-count')).toHaveTextContent('0');
    expect(screen.getByTestId('cart-total')).toHaveTextContent('0');
    expect(toast.info).toHaveBeenCalledWith('Cart cleared');
  });

  it('calculates total with discounted items', () => {
    const discountedProduct = { ...sampleProduct, discount: 20 }; // 20% discount
    const TestDiscountComponent = () => {
      const { addToCart, getCartTotal } = useCart();
      return (
        <div>
          <div data-testid="cart-total">{getCartTotal()}</div>
          <button onClick={() => addToCart(discountedProduct)}>Add Discounted Item</button>
        </div>
      );
    };

    render(
      <CartProvider>
        <TestDiscountComponent />
      </CartProvider>
    );

    fireEvent.click(screen.getByText('Add Discounted Item'));
    // Price should be 8.00 (10.00 - 20% discount)
    expect(screen.getByTestId('cart-total')).toHaveTextContent('8');
  });

  it('saves cart to localStorage when updated', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    fireEvent.click(screen.getByText('Add Item'));

    expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
      'cart',
      expect.stringContaining(sampleProduct.id)
    );
  });
}); 