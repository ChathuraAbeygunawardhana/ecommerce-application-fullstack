"use client";

import { useRouter } from "next/navigation";
import { useWatchDetails } from "@/lib/hooks/useWatches";
import { Spinner } from "@/components/atoms/Spinner";
import { Button } from "@/components/atoms/Button";
import { Badge } from "@/components/atoms/Badge";

interface WatchDetailViewProps {
  watchId: number;
}

export const WatchDetailView: React.FC<WatchDetailViewProps> = ({ watchId }) => {
  const router = useRouter();
  const { data: watch, isLoading, error, refetch } = useWatchDetails(watchId);

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 space-y-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/20 mb-4">
          <svg
            className="w-8 h-8 text-red-600 dark:text-red-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        
        <div>
          <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">
            Error Loading Watch Details
          </h3>
          <p className="text-zinc-600 dark:text-zinc-400 max-w-md mx-auto">
            {error.message}
          </p>
        </div>

        <div className="flex gap-3 justify-center">
          <Button onClick={() => router.back()} variant="secondary">
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Go Back
          </Button>
          <Button onClick={() => refetch()} variant="primary">
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  if (!watch) {
    return (
      <div className="text-center py-20 space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-zinc-100 dark:bg-zinc-800 mb-4">
          <svg
            className="w-8 h-8 text-zinc-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-zinc-900 dark:text-white">Watch Not Found</h3>
        <p className="text-zinc-600 dark:text-zinc-400">
          The watch you're looking for doesn't exist or has been removed.
        </p>
        <Button onClick={() => router.back()} variant="secondary">
          Go Back
        </Button>
      </div>
    );
  }

  const functions = watch.functions ? watch.functions.split(',').map(f => f.trim()) : [];

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Button onClick={() => router.back()} variant="secondary" className="px-6 flex items-center gap-2">
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back
      </Button>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Image */}
        {watch.image_url && (
          <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-8">
            <div className="aspect-square bg-zinc-100 dark:bg-zinc-800 rounded-xl overflow-hidden">
              <img
                src={watch.image_url}
                alt={`${watch.make_name} ${watch.model_name}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Crect fill="%23e4e4e7" width="400" height="400"/%3E%3Ctext fill="%2371717a" font-family="sans-serif" font-size="24" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle"%3ENo Image%3C/text%3E%3C/svg%3E';
                }}
              />
            </div>
          </div>
        )}

        {/* Header Info */}
        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-8">
          <div className="flex items-start justify-between mb-4">
            <Badge>{watch.make_name}</Badge>
            {watch.year_produced && (
              <span className="text-sm text-zinc-500 dark:text-zinc-400">
                {watch.year_produced}
              </span>
            )}
          </div>
          <h1 className="text-4xl font-bold text-zinc-900 dark:text-white mb-2">
            {watch.model_name}
          </h1>
          {watch.family_name && (
            <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-6">
              {watch.family_name} Family
            </p>
          )}
          
          {watch.description && (
            <p className="text-zinc-600 dark:text-zinc-400 mb-6 leading-relaxed">
              {watch.description}
            </p>
          )}

          <div className="grid grid-cols-2 gap-4 pt-6 border-t border-zinc-200 dark:border-zinc-800">
            {watch.reference && (
              <div>
                <div className="text-sm text-zinc-500 dark:text-zinc-400">Reference</div>
                <div className="font-semibold text-zinc-900 dark:text-white">{watch.reference}</div>
              </div>
            )}
            {watch.limited_edition && (
              <div>
                <div className="text-sm text-zinc-500 dark:text-zinc-400">Limited</div>
                <div className="font-semibold text-zinc-900 dark:text-white">{watch.limited_edition}</div>
              </div>
            )}
            {watch.movement_name && (
              <div>
                <div className="text-sm text-zinc-500 dark:text-zinc-400">Movement</div>
                <div className="font-semibold text-zinc-900 dark:text-white">{watch.movement_name}</div>
              </div>
            )}
            {watch.price_euro && (
              <div>
                <div className="text-sm text-zinc-500 dark:text-zinc-400">Price</div>
                <div className="font-semibold text-zinc-900 dark:text-white">
                  €{Number(watch.price_euro).toLocaleString()}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Functions */}
      {functions.length > 0 && (
        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-8">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">Functions</h2>
          <div className="flex flex-wrap gap-2">
            {functions.map((func, idx) => (
              <span
                key={idx}
                className="px-4 py-2 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white rounded-full text-sm font-medium"
              >
                {func}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        {/* Case Details */}
        {(watch.case_material || watch.case_diameter || watch.water_resistance) && (
          <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-8">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">Case</h2>
            <div className="space-y-3">
              {watch.case_material && (
                <div className="flex justify-between py-2 border-b border-zinc-100 dark:border-zinc-800">
                  <span className="text-zinc-500 dark:text-zinc-400">Material</span>
                  <span className="font-medium text-zinc-900 dark:text-white">{watch.case_material}</span>
                </div>
              )}
              {watch.case_diameter && (
                <div className="flex justify-between py-2 border-b border-zinc-100 dark:border-zinc-800">
                  <span className="text-zinc-500 dark:text-zinc-400">Diameter</span>
                  <span className="font-medium text-zinc-900 dark:text-white">{watch.case_diameter}</span>
                </div>
              )}
              {watch.water_resistance && (
                <div className="flex justify-between py-2 border-b border-zinc-100 dark:border-zinc-800">
                  <span className="text-zinc-500 dark:text-zinc-400">Water Resistance</span>
                  <span className="font-medium text-zinc-900 dark:text-white">{watch.water_resistance}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Dial Details */}
        {watch.dial_color && (
          <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-8">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">Dial</h2>
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b border-zinc-100 dark:border-zinc-800">
                <span className="text-zinc-500 dark:text-zinc-400">Color</span>
                <span className="font-medium text-zinc-900 dark:text-white">{watch.dial_color}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
