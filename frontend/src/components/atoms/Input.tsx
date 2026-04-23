import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input: React.FC<InputProps> = ({ 
  label, 
  className = '',
  ...props 
}) => {
  return (
    <div className="space-y-1.5 w-full">
      {label && (
        <label className="flex items-center text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
          {label}
        </label>
      )}
      <input
        className={`w-full h-11 px-4 rounded-lg bg-zinc-100/50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 focus:border-zinc-900 dark:focus:border-zinc-100 transition-all text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 ${className}`}
        {...props}
      />
    </div>
  );
};
