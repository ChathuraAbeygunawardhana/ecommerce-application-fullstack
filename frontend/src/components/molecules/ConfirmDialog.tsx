import React from 'react';
import { Button } from '../atoms/Button';

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onCancel}
      />
      
      <div className="relative bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xl p-6 max-w-md w-full mx-4 animate-in fade-in zoom-in-95 duration-200">
        <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">
          {title}
        </h3>
        <p className="text-zinc-600 dark:text-zinc-400 mb-6">
          {message}
        </p>
        
        <div className="flex gap-3 justify-end">
          <Button
            variant="secondary"
            onClick={onCancel}
            className="px-4"
          >
            {cancelLabel}
          </Button>
          <Button
            variant="primary"
            onClick={onConfirm}
            className="px-4"
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
};
