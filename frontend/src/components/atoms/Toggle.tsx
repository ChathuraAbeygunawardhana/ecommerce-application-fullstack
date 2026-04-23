import React from 'react';

interface ToggleProps {
  isOn: boolean;
  onToggle: () => void;
  ariaLabel?: string;
}

export const Toggle: React.FC<ToggleProps> = ({ isOn, onToggle, ariaLabel = 'Toggle' }) => {
  return (
    <button
      onClick={onToggle}
      className="relative inline-flex h-6 w-11 items-center rounded-full bg-zinc-300 dark:bg-zinc-700 transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:ring-offset-2 dark:focus:ring-white dark:focus:ring-offset-zinc-900"
      aria-label={ariaLabel}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform duration-300 ease-in-out ${
          isOn ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );
};
