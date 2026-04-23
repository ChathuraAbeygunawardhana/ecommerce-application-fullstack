import React from 'react';

interface AlertProps {
  type: 'error' | 'success';
  message: string;
}

export const Alert: React.FC<AlertProps> = ({ type, message }) => {
  const styles = {
    error: "bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 border-red-200 dark:border-red-800",
    success: "bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 border-green-200 dark:border-green-800"
  };

  return (
    <div className={`mb-4 p-3 rounded-lg text-sm text-center relative z-10 border ${styles[type]}`}>
      {message}
    </div>
  );
};
