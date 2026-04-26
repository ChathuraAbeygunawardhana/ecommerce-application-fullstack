interface TabButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
  count?: number;
}

export function TabButton({ label, isActive, onClick, count }: TabButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`
        px-4 py-2 text-sm font-medium rounded-lg transition-colors
        ${isActive
          ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900'
          : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800'
        }
      `}
    >
      {label}
      {count !== undefined && (
        <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
          isActive 
            ? 'bg-white/20 dark:bg-zinc-900/20' 
            : 'bg-zinc-200 dark:bg-zinc-700'
        }`}>
          {count}
        </span>
      )}
    </button>
  );
}
