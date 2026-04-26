import React from "react";
import type { Watch } from "@/lib/types/watch.types";
import { Badge } from "@/components/atoms/Badge";

interface WatchListGridProps {
  watches: Watch[];
  onWatchClick: (watchId: number) => void;
}

export const WatchListGrid: React.FC<WatchListGridProps> = ({
  watches,
  onWatchClick,
}) => {
  const truncateName = (name: string, maxLength: number = 15) => {
    if (name.length <= maxLength) return name;
    return name.substring(0, maxLength) + '...';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
      {watches.map((watch) => (
        <div
          key={watch.id}
          onClick={() => onWatchClick(watch.id)}
          className="group cursor-pointer bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden hover:shadow-xl hover:shadow-zinc-200/50 dark:hover:shadow-black/50 transition-all duration-300 hover:-translate-y-1 w-full"
        >
          {/* Image */}
          {watch.image_url && (
            <div className="aspect-square bg-zinc-100 dark:bg-zinc-800 overflow-hidden w-full">
              <img
                src={watch.image_url}
                alt={`${watch.make_name} ${watch.model_name}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Crect fill="%23e4e4e7" width="400" height="400"/%3E%3Ctext fill="%2371717a" font-family="sans-serif" font-size="24" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle"%3ENo Image%3C/text%3E%3C/svg%3E';
                }}
              />
            </div>
          )}

          {/* Content */}
          <div className="p-5 space-y-3 w-full">
            <div className="flex items-start justify-between gap-2">
              <Badge>
                <span className="truncate block max-w-[120px]" title={watch.make_name}>
                  {truncateName(watch.make_name, 15)}
                </span>
              </Badge>
              {watch.year_produced && (
                <span className="text-xs text-zinc-400 font-medium flex-shrink-0">
                  {watch.year_produced}
                </span>
              )}
            </div>

            <h3 className="text-lg font-bold text-zinc-900 dark:text-white leading-tight line-clamp-2 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors">
              {watch.model_name}
            </h3>

            {watch.family_name && (
              <p className="text-sm text-zinc-500 dark:text-zinc-400 truncate" title={watch.family_name}>
                {watch.family_name}
              </p>
            )}

            <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 space-y-2">
              {watch.reference && (
                <div className="flex justify-between text-xs">
                  <span className="text-zinc-500 dark:text-zinc-400">Ref</span>
                  <span className="font-medium text-zinc-900 dark:text-zinc-300 truncate max-w-[150px]">
                    {watch.reference}
                  </span>
                </div>
              )}
              {watch.movement_name && (
                <div className="flex justify-between text-xs">
                  <span className="text-zinc-500 dark:text-zinc-400">Movement</span>
                  <span className="font-medium text-zinc-900 dark:text-zinc-300 truncate max-w-[150px]">
                    {watch.movement_name}
                  </span>
                </div>
              )}
              {watch.price_euro && (
                <div className="flex justify-between text-xs pt-2 border-t border-zinc-100 dark:border-zinc-800">
                  <span className="text-zinc-500 dark:text-zinc-400">Price</span>
                  <span className="font-bold text-zinc-900 dark:text-white">
                    €{Number(watch.price_euro).toLocaleString()}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
