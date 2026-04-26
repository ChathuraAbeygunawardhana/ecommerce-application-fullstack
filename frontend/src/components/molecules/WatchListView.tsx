import React from "react";
import type { Watch } from "@/lib/types/watch.types";
import { Badge } from "@/components/atoms/Badge";

interface WatchListViewProps {
  watches: Watch[];
  onWatchClick: (watchId: number) => void;
}

export const WatchListView: React.FC<WatchListViewProps> = ({
  watches,
  onWatchClick,
}) => {
  return (
    <div className="space-y-4 w-full">
      {watches.map((watch) => (
        <div
          key={watch.id}
          onClick={() => onWatchClick(watch.id)}
          className="group cursor-pointer bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden hover:shadow-lg hover:shadow-zinc-200/50 dark:hover:shadow-black/50 transition-all duration-300 hover:border-zinc-300 dark:hover:border-zinc-700"
        >
          <div className="flex flex-col sm:flex-row gap-4 p-4">
            {/* Image */}
            {watch.image_url && (
              <div className="w-full sm:w-32 h-32 flex-shrink-0 bg-zinc-100 dark:bg-zinc-800 rounded-lg overflow-hidden">
                <img
                  src={watch.image_url}
                  alt={`${watch.make_name} ${watch.model_name}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="128" height="128"%3E%3Crect fill="%23e4e4e7" width="128" height="128"/%3E%3Ctext fill="%2371717a" font-family="sans-serif" font-size="12" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle"%3ENo Image%3C/text%3E%3C/svg%3E';
                  }}
                />
              </div>
            )}

            {/* Content */}
            <div className="flex-1 min-w-0 flex flex-col justify-between">
              {/* Header */}
              <div>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge>{watch.make_name}</Badge>
                    {watch.year_produced && (
                      <span className="text-xs text-zinc-400 font-medium">
                        {watch.year_produced}
                      </span>
                    )}
                  </div>
                  {watch.price_euro && (
                    <span className="text-lg font-bold text-zinc-900 dark:text-white flex-shrink-0">
                      €{Number(watch.price_euro).toLocaleString()}
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-bold text-zinc-900 dark:text-white leading-tight mb-1 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors">
                  {watch.model_name}
                </h3>

                {watch.family_name && (
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-3">
                    {watch.family_name} Family
                  </p>
                )}
              </div>

              {/* Details */}
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
                {watch.reference && (
                  <div className="flex items-center gap-2">
                    <span className="text-zinc-500 dark:text-zinc-400">Reference:</span>
                    <span className="font-medium text-zinc-900 dark:text-zinc-300">
                      {watch.reference}
                    </span>
                  </div>
                )}
                {watch.movement_name && (
                  <div className="flex items-center gap-2">
                    <span className="text-zinc-500 dark:text-zinc-400">Movement:</span>
                    <span className="font-medium text-zinc-900 dark:text-zinc-300">
                      {watch.movement_name}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
