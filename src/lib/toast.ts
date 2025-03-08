
import { toast as sonnerToast } from "sonner";
import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

type ToastType = "success" | "error" | "info" | "warning" | "default";

interface ToastOptions {
  description?: ReactNode;
  duration?: number;
  icon?: ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
}

/**
 * Unified toast notification system for the entire application
 */
export const toast = {
  /**
   * Show a success toast notification
   */
  success: (title: string, options?: ToastOptions) => {
    return sonnerToast.success(title, options);
  },

  /**
   * Show an error toast notification
   */
  error: (title: string, options?: ToastOptions) => {
    return sonnerToast.error(title, options);
  },

  /**
   * Show an info toast notification
   */
  info: (title: string, options?: ToastOptions) => {
    return sonnerToast.info(title, options);
  },

  /**
   * Show a warning toast notification
   */
  warning: (title: string, options?: ToastOptions) => {
    return sonnerToast.warning(title, options);
  },

  /**
   * Show a default toast notification
   */
  default: (title: string, options?: ToastOptions) => {
    return sonnerToast(title, options);
  },

  /**
   * Show a custom toast notification with a specific icon
   */
  custom: (title: string, type: ToastType, Icon?: LucideIcon, options?: ToastOptions) => {
    if (Icon) {
      const IconComponent = <Icon className="h-5 w-5" />;
      return sonnerToast[type](title, { ...options, icon: IconComponent });
    }
    return sonnerToast[type](title, options);
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
  update: (toastId: string, data: { title?: string } & ToastOptions) => {
    const { title, ...options } = data;
    return sonnerToast.update(toastId, { 
      ...options, 
      ...(title ? { title } : {}) 
    });
  },

  /**
   * Promise toast that shows loading, success, and error states
   */
  promise: <T>(
    promise: Promise<T>,
    {
      loading,
      success,
      error,
    }: {
      loading: string;
      success: (data: T) => string | { title: string; description?: string };
      error: (error: unknown) => string | { title: string; description?: string };
    },
    options?: ToastOptions
  ) => {
    return sonnerToast.promise(promise, {
      loading,
      success,
      error,
    }, options);
  }
};
