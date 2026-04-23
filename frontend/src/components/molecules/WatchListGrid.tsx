import React from "react";
import type { WatchListItem } from "@/lib/types/watch.types";
import { Badge } from "@/components/atoms/Badge";

interface WatchListGridProps {
  watches: WatchListItem[];
  onWatchClick: (watchId: number) => void;
}

export const WatchListGrid: React.FC<WatchListGridProps> = ({
  watches,
  onWatchClick,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {watches.map((watch) => (
        <div
          key={watch.watchId}
          onClick={() => onWatchClick(watch.watchId)}
          className="group cursor-pointer bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden hover:shadow-xl hover:shadow-zinc-200/50 dark:hover:shadow-black/50 transition-all duration-300 hover:-translate-y-1"
        >
          {/* Image */}
          {watch.url && (
            <div className="aspect-square bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
              <img
                src={watch.url}
                alt={watch.modelName}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          )}

          {/* Content */}
          <div className="p-5 space-y-3">
            <div className="flex items-start justify-between gap-2">
              <Badge>{watch.makeName}</Badge>
              {watch.yearProducedName && (
                <span className="text-xs text-zinc-400 font-medium">
                  {watch.yearProducedName}
                </span>
              )}
            </div>

            <h3 className="text-lg font-bold text-zinc-900 dark:text-white leading-tight line-clamp-2 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors">
              {watch.modelName}
            </h3>

            {watch.familyName && (
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                {watch.familyName}
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
              {watch.movementName && (
                <div className="flex justify-between text-xs">
                  <span className="text-zinc-500 dark:text-zinc-400">Movement</span>
                  <span className="font-medium text-zinc-900 dark:text-zinc-300 truncate max-w-[150px]">
                    {watch.movementName}
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
