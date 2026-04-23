import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  isLoading?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  isLoading = false,
  children,
  className = '',
  disabled,
  ...props 
}) => {
  const baseStyles = "h-11 flex items-center justify-center rounded-full font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 px-6";
  
  const variantStyles = {
    primary: "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-white focus:ring-zinc-900 dark:focus:ring-white",
    secondary: "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white hover:bg-zinc-200 dark:hover:bg-zinc-700 focus:ring-zinc-900 dark:focus:ring-white"
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${className} ${(disabled || isLoading) ? 'opacity-50 cursor-not-allowed' : ''}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <div className="w-5 h-5 rounded-full border-2 border-zinc-200 border-t-zinc-900 dark:border-zinc-700 dark:border-t-white animate-spin" />
      ) : (
        children
      )}
    </button>
  );
};
