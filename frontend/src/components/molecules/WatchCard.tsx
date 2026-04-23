import React from 'react';
import { Badge } from '@/components/atoms/Badge';

interface WatchCardProps {
  makeName: string;
  modelName: string;
  familyName?: string;
  yearProducedName?: string;
  reference?: string;
  movementName?: string;
  priceInEuro?: number;
}

export const WatchCard: React.FC<WatchCardProps> = ({
  makeName,
  modelName,
  familyName,
  yearProducedName,
  reference,
  movementName,
  priceInEuro
}) => {
  return (
    <div className="group flex flex-col bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden hover:shadow-xl hover:shadow-zinc-200/50 dark:hover:shadow-black/50 transition-all duration-300 hover:-translate-y-1">
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-4">
          <Badge>{makeName}</Badge>
          {yearProducedName && (
            <span className="text-xs text-zinc-400 font-medium">
              {yearProducedName}
            </span>
          )}
        </div>
        
        <h3 className="text-xl font-bold text-zinc-900 dark:text-white leading-tight mb-2 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors">
          {modelName}
        </h3>
        
        {familyName && (
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6 font-medium">
            {familyName} Family
          </p>
        )}
        
        <div className="mt-auto space-y-3">
          {reference && (
            <div className="flex justify-between items-center text-sm border-t border-zinc-100 dark:border-zinc-800/50 pt-3">
              <span className="text-zinc-500 dark:text-zinc-400">Ref</span>
              <span className="font-medium text-zinc-900 dark:text-zinc-300 truncate max-w-[150px]" title={reference}>
                {reference}
              </span>
            </div>
          )}
          {movementName && (
            <div className="flex justify-between items-center text-sm border-t border-zinc-100 dark:border-zinc-800/50 pt-3">
              <span className="text-zinc-500 dark:text-zinc-400">Movement</span>
              <span className="font-medium text-zinc-900 dark:text-zinc-300 truncate max-w-[150px]" title={movementName}>
                {movementName}
              </span>
            </div>
          )}
          {priceInEuro && (
            <div className="flex justify-between items-center text-sm border-t border-zinc-100 dark:border-zinc-800/50 pt-3">
              <span className="text-zinc-500 dark:text-zinc-400">Price</span>
              <span className="font-bold text-zinc-900 dark:text-white">
                €{Number(priceInEuro).toLocaleString()}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
