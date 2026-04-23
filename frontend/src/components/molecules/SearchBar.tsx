import React from 'react';
import { Button } from '@/components/atoms/Button';

interface SearchBarProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  placeholder?: string;
  isLoading?: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  onSubmit,
  placeholder = 'Search...',
  isLoading = false
}) => {
  return (
    <form onSubmit={onSubmit} className="flex gap-2 w-full">
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="flex-1 h-12 px-5 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-white transition-shadow"
      />
      <Button
        type="submit"
        isLoading={isLoading}
        className="h-12 px-6 min-w-[100px]"
      >
        Search
      </Button>
    </form>
  );
};
