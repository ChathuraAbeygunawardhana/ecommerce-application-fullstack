import React from 'react';
import { WatchCard } from '@/components/molecules/WatchCard';

interface Watch {
  id?: string;
  watchId?: string;
  makeName: string;
  modelName: string;
  familyName?: string;
  yearProducedName?: string;
  reference?: string;
  movementName?: string;
  priceInEuro?: number;
}

interface WatchGridProps {
  watches: Watch[];
  isLoading: boolean;
  error?: string | null;
  searchTerm: string;
}

export const WatchGrid: React.FC<WatchGridProps> = ({ 
  watches, 
  isLoading, 
  error,
  searchTerm 
}) => {
  if (error) {
    return (
      <div className="w-full p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 text-center text-sm font-medium">
        {error}
      </div>
    );
  }

  if (isLoading && watches.length === 0) {
    return (
      <div className="w-full py-20 flex items-center justify-center">
        <div className="w-10 h-10 rounded-full border-2 border-zinc-200 border-t-zinc-900 dark:border-zinc-800 dark:border-t-white animate-spin" />
      </div>
    );
  }

  if (!isLoading && watches.length === 0) {
    return (
      <div className="w-full py-20 flex flex-col items-center justify-center text-zinc-500 dark:text-zinc-400 space-y-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <p className="text-lg">No watches found for &quot;{searchTerm}&quot;. Try another search.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-in fade-in duration-1000">
      {watches.map((watch) => (
        <WatchCard
          key={watch.id || watch.watchId}
          makeName={watch.makeName}
          modelName={watch.modelName}
          familyName={watch.familyName}
          yearProducedName={watch.yearProducedName}
          reference={watch.reference}
          movementName={watch.movementName}
          priceInEuro={watch.priceInEuro}
        />
      ))}
    </div>
  );
};
