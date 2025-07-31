import { X } from 'lucide-react';
import Button from './Button';
import theme from '../../constants/theme';

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  children: React.ReactNode;
  confirmText?: string;
  cancelText?: string;
}

const Dialog = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  children,
  confirmText = '確認送出',
  cancelText = '取消',
}: DialogProps) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center p-4"
      onClick={onClose}
    >
      <div
        className={`relative ${theme.cardBg} rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-300">
          <h2 className={`text-2xl font-bold ${theme.textPrimary}`}>{title}</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-stone-200 transition-colors"
          >
            <X className="w-6 h-6 text-stone-500" />
          </button>
        </div>
        <div className="p-6 overflow-y-auto">{children}</div>
        <div className="flex justify-end items-center p-4 border-t border-gray-300 bg-stone-50 rounded-b-lg">
          <button
            onClick={onClose}
            className={`px-4 py-2 mr-2 font-semibold ${theme.textSecondary} bg-transparent hover:bg-stone-200 rounded-md transition-colors`}
          >
            {cancelText}
          </button>
          <Button onClick={onConfirm}>{confirmText}</Button>
        </div>
      </div>
    </div>
  );
};

export default Dialog;
