import React from 'react';
import { Modal } from './Modal';
import { Button } from './Button';
import { AlertTriangle, CheckCircle, Info } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const ConfirmationDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText,
  cancelText,
  variant = 'danger', // 'danger' | 'success' | 'info'
  isLoading = false,
}) => {
  const { language } = useLanguage();

  const icons = {
    danger: <AlertTriangle className="w-8 h-8 text-rose-600" />,
    success: <CheckCircle className="w-8 h-8 text-emerald-600" />,
    info: <Info className="w-8 h-8 text-blue-600" />,
  };

  const bgColors = {
    danger: 'bg-rose-50',
    success: 'bg-emerald-50',
    info: 'bg-blue-50',
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} maxWidth="max-w-md">
      <div className="flex flex-col items-center text-center">
        <div className={`w-16 h-16 rounded-2xl ${bgColors[variant]} flex items-center justify-center mb-4`}>
          {icons[variant]}
        </div>

        <p className="text-sm text-slate-600 mb-6">{message}</p>

        <div className="flex gap-3 w-full">
          <Button
            variant="outline"
            className="flex-1"
            onClick={onClose}
            disabled={isLoading}
          >
            {cancelText || (language === 'hi' ? 'रद्द करें' : 'Cancel')}
          </Button>

          <Button
            variant={variant === 'danger' ? 'danger' : 'primary'}
            className="flex-1"
            onClick={onConfirm}
            isLoading={isLoading}
          >
            {confirmText || (language === 'hi' ? 'पुष्टि करें' : 'Confirm')}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
