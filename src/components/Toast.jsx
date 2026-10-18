import React from 'react';
import { useCart } from '../context/CartContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const Toast = () => {
  const { toastMessage, closeToast } = useCart();

  if (!toastMessage) return null;

  const isSuccess = toastMessage.type === 'success';
  const isInfo = toastMessage.type === 'info';
  const isError = toastMessage.type === 'error';

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-6 right-6 z-50 max-w-sm w-full transition-all duration-300 transform translate-y-0"
    >
      <div
        className={`flex items-center gap-3 p-4 rounded-xl shadow-lift border text-sm backdrop-blur-md ${
          isSuccess
            ? 'bg-sage-900/95 text-cream-50 border-sage-700'
            : isError
            ? 'bg-red-900/95 text-white border-red-700'
            : 'bg-charcoal-900/95 text-cream-50 border-charcoal-700'
        }`}
      >
        <div className="shrink-0">
          {isSuccess && <CheckCircle2 className="w-5 h-5 text-sage-300" />}
          {isInfo && <Info className="w-5 h-5 text-terracotta-300" />}
          {isError && <AlertCircle className="w-5 h-5 text-red-300" />}
        </div>
        <p className="flex-1 font-medium leading-snug">{toastMessage.message}</p>
        <button
          onClick={closeToast}
          className="shrink-0 p-1 rounded-lg hover:bg-white/10 transition-colors text-cream-200"
          aria-label="Close notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Toast;
