import React from 'react';
import { Badge } from '@/components/atoms/Badge';
import type { Watch } from '@/lib/types/watch.types';

interface WatchCardProps {
  watch: Watch;
  onClick?: () => void;
}

export const WatchCard: React.FC<WatchCardProps> = ({ watch, onClick }) => {
  const {
    make_name,
    model_name,
    family_name,
    year_produced,
    reference,
    movement_name,
    price_euro,
    image_url,
  } = watch;

  return (
    <div 
      onClick={onClick}
      className="group flex flex-col bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden hover:shadow-xl hover:shadow-zinc-200/50 dark:hover:shadow-black/50 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
    >
      {/* Image */}
      {image_url && (
        <div className="relative w-full aspect-square bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
          <img
            src={image_url}
            alt={`${make_name} ${model_name}`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Crect fill="%23e4e4e7" width="400" height="400"/%3E%3Ctext fill="%2371717a" font-family="sans-serif" font-size="24" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle"%3ENo Image%3C/text%3E%3C/svg%3E';
            }}
          />
        </div>
      )}
      
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-4">
          <Badge>{make_name}</Badge>
          {year_produced && (
            <span className="text-xs text-zinc-400 font-medium">
              {year_produced}
            </span>
          )}
        </div>
        
        <h3 className="text-xl font-bold text-zinc-900 dark:text-white leading-tight mb-2 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors">
          {model_name}
        </h3>
        
        {family_name && (
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6 font-medium">
            {family_name} Family
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
          {movement_name && (
            <div className="flex justify-between items-center text-sm border-t border-zinc-100 dark:border-zinc-800/50 pt-3">
              <span className="text-zinc-500 dark:text-zinc-400">Movement</span>
              <span className="font-medium text-zinc-900 dark:text-zinc-300 truncate max-w-[150px]" title={movement_name}>
                {movement_name}
              </span>
            </div>
          )}
          {price_euro && (
            <div className="flex justify-between items-center text-sm border-t border-zinc-100 dark:border-zinc-800/50 pt-3">
              <span className="text-zinc-500 dark:text-zinc-400">Price</span>
              <span className="font-bold text-zinc-900 dark:text-white">
                €{Number(price_euro).toLocaleString()}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
