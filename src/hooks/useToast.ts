import { useCallback } from 'react';
import { toast } from 'sonner';

interface ToastOptions {
  description?: string;
  duration?: number;
  position?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
  className?: string;
}

interface ToastReturn {
  toast: (message: string, options?: ToastOptions) => void;
  success: (message: string, options?: ToastOptions) => void;
  error: (message: string, options?: ToastOptions) => void;
  info: (message: string, options?: ToastOptions) => void;
  warning: (message: string, options?: ToastOptions) => void;
}

export function useToast(): ToastReturn {
  const showToast = useCallback((message: string, options?: ToastOptions) => {
    toast(message, options);
  }, []);

  const successToast = useCallback((message: string, options?: ToastOptions) => {
    toast.success(message, options);
  }, []);

  const errorToast = useCallback((message: string, options?: ToastOptions) => {
    toast.error(message, options);
  }, []);

  const infoToast = useCallback((message: string, options?: ToastOptions) => {
    toast.info(message, options);
  }, []);

  const warningToast = useCallback((message: string, options?: ToastOptions) => {
    toast.warning(message, options);
  }, []);

  return {
    toast: showToast,
    success: successToast,
    error: errorToast,
    info: infoToast,
    warning: warningToast
  };
}