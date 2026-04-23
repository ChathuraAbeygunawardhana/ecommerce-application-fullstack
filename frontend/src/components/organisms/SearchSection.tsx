import React from 'react';
import { SearchBar } from '@/components/molecules/SearchBar';

interface SearchSectionProps {
  title: string;
  subtitle: string;
  searchValue: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  placeholder?: string;
  isLoading?: boolean;
}

export const SearchSection: React.FC<SearchSectionProps> = ({
  title,
  subtitle,
  searchValue,
  onSearchChange,
  onSearchSubmit,
  placeholder,
  isLoading = false
}) => {
  return (
    <section className="w-full max-w-2xl mx-auto space-y-6 text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="space-y-2">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
          {title}
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400 text-lg">
          {subtitle}
        </p>
      </div>

      <SearchBar
        value={searchValue}
        onChange={onSearchChange}
        onSubmit={onSearchSubmit}
        placeholder={placeholder}
        isLoading={isLoading}
      />
    </section>
  );
};
