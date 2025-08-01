import { useEffect } from 'react';
import { CheckCircle, XCircle, Info, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info';

interface ToastProps {
  message: string;
  type: ToastType;
  onClose: () => void;
}

const toastConfig = {
  success: {
    icon: <CheckCircle className="w-6 h-6 text-green-500" />,
    style: 'bg-green-50 border-green-200 text-green-800',
  },
  error: {
    icon: <XCircle className="w-6 h-6 text-red-500" />,
    style: 'bg-red-50 border-red-200 text-red-800',
  },
  info: {
    icon: <Info className="w-6 h-6 text-blue-500" />,
    style: 'bg-blue-50 border-blue-200 text-blue-800',
  },
};

const Toast = ({ message, type, onClose }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000); // 5秒後自動關閉

    return () => clearTimeout(timer);
  }, [onClose]);

  const { icon, style } = toastConfig[type];

  return (
    <div
      className={`max-w-sm w-full rounded-lg shadow-lg p-4 flex items-start space-x-3 border animate-fade-in-up ${style}`}
      role="alert"
    >
      <div className="flex-shrink-0">{icon}</div>
      <div className="flex-1">
        <p className="text-sm font-medium">{message}</p>
      </div>
      <button onClick={onClose} className="p-1 rounded-lg focus:outline-none focus:ring-2">
        <X className="h-5 w-5" />
      </button>
    </div>
  );
};

export default Toast;