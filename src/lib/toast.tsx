import { toast as sonnerToast, ExternalToast, ToastT } from "sonner";
import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

type ToastType = "success" | "error" | "info" | "warning" | "default";

type SonnerToastMethod = (message: ReactNode, data?: ExternalToast) => string | number;

interface ToastOptions extends Omit<ExternalToast, 'title'> {
  description?: ReactNode;
  duration?: number;
  icon?: ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
}

type PromiseData<T> = {
  loading: string;
  success: (data: T) => ReactNode;
  error: (error: unknown) => ReactNode;
};

/**
 * Unified toast notification system for the entire application
 */
export const toast = {
  /**
   * Show a success toast notification
   */
  success: (title: string, options?: ToastOptions) => {
    return sonnerToast.success(title, options as ExternalToast);
  },

  /**
   * Show an error toast notification
   */
  error: (title: string, options?: ToastOptions) => {
    return sonnerToast.error(title, options as ExternalToast);
  },

  /**
   * Show an info toast notification
   */
  info: (title: string, options?: ToastOptions) => {
    return sonnerToast.info(title, options as ExternalToast);
  },

  /**
   * Show a warning toast notification
   */
  warning: (title: string, options?: ToastOptions) => {
    return sonnerToast.warning(title, options as ExternalToast);
  },

  /**
   * Show a default toast notification
   */
  default: (title: string, options?: ToastOptions) => {
    return sonnerToast(title, options as ExternalToast);
  },

  /**
   * Show a custom toast notification with a specific icon
   */
  custom: (title: string, type: ToastType, Icon?: LucideIcon, options?: ToastOptions) => {
    const toastMethod = type === 'default' ? sonnerToast : sonnerToast[type];
    if (Icon) {
      const IconComponent = <Icon className="h-5 w-5" />;
      return (toastMethod as SonnerToastMethod)(title, { ...options, icon: IconComponent } as ExternalToast);
    }
    return (toastMethod as SonnerToastMethod)(title, options as ExternalToast);
  },

  /**
   * Dismiss a specific toast by ID or all toasts if no ID is provided
   */
  dismiss: (toastId?: string) => {
    return sonnerToast.dismiss(toastId);
  },

  /**
   * Update an existing toast by ID
   */
  update: (toastId: string | number, data: Partial<ExternalToast>) => {
    return (sonnerToast as any).update?.(toastId, data);
  },

  /**
   * Promise toast that shows loading, success, and error states
   */
  promise: <T extends unknown>(
    promise: Promise<T>,
    messages: PromiseData<T>,
    options?: ToastOptions
  ) => {
    return sonnerToast.promise(promise, {
      ...messages,
      ...options as ExternalToast
    });
  }
};
