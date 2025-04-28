import { describe, it, expect, vi, beforeEach } from 'vitest';
import { toast } from './toast';
import { toast as sonnerToast } from 'sonner';
import { AlertCircle } from 'lucide-react';

// Mock sonner toast
vi.mock('sonner', () => ({
  toast: Object.assign(
    vi.fn(),
    {
      success: vi.fn(),
      error: vi.fn(),
      info: vi.fn(),
      warning: vi.fn(),
      dismiss: vi.fn(),
      promise: vi.fn(),
      custom: vi.fn(),
    }
  ),
}));

describe('toast utility', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('shows success toast', () => {
    const title = 'Success message';
    const options = { description: 'Success description' };
    
    toast.success(title, options);
    
    expect(sonnerToast.success).toHaveBeenCalledWith(title, options);
  });

  it('shows error toast', () => {
    const title = 'Error message';
    const options = { description: 'Error description' };
    
    toast.error(title, options);
    
    expect(sonnerToast.error).toHaveBeenCalledWith(title, options);
  });

  it('shows info toast', () => {
    const title = 'Info message';
    const options = { description: 'Info description' };
    
    toast.info(title, options);
    
    expect(sonnerToast.info).toHaveBeenCalledWith(title, options);
  });

  it('shows warning toast', () => {
    const title = 'Warning message';
    const options = { description: 'Warning description' };
    
    toast.warning(title, options);
    
    expect(sonnerToast.warning).toHaveBeenCalledWith(title, options);
  });

  it('shows default toast', () => {
    const title = 'Default message';
    const options = { description: 'Default description' };
    
    toast.default(title, options);
    
    expect(sonnerToast).toHaveBeenCalledWith(title, options);
  });

  it('shows custom toast with icon', () => {
    const title = 'Custom message';
    const type = 'success';
    const options = { description: 'Custom description' };
    
    toast.custom(title, type, AlertCircle, options);
    
    expect(sonnerToast.success).toHaveBeenCalledWith(
      title,
      expect.objectContaining({
        ...options,
        icon: expect.any(Object),
      })
    );
  });

  it('dismisses toast', () => {
    const toastId = '123';
    
    toast.dismiss(toastId);
    
    expect(sonnerToast.dismiss).toHaveBeenCalledWith(toastId);
  });

  it('dismisses all toasts when no id provided', () => {
    toast.dismiss();
    
    expect(sonnerToast.dismiss).toHaveBeenCalledWith(undefined);
  });

  it('shows promise toast', async () => {
    const promise = Promise.resolve('result');
    const messages = {
      loading: 'Loading...',
      success: (data: string) => `Success: ${data}`,
      error: (error: unknown) => `Error: ${error}`,
    };
    const options = { duration: 3000 };
    
    toast.promise(promise, messages, options);
    
    expect(sonnerToast.promise).toHaveBeenCalledWith(
      promise,
      expect.objectContaining({
        ...messages,
        ...options,
      })
    );
  });
}); 