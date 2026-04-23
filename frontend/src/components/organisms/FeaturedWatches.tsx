"use client";

import { useRouter } from "next/navigation";
import { useWatchesByMake } from "@/lib/hooks/useWatches";
import { Spinner } from "@/components/atoms/Spinner";

export const FeaturedWatches: React.FC = () => {
  const router = useRouter();
  
  // Fetch some Rolex watches as featured (makeId: 137)
  const { data: watchesData, isLoading, error } = useWatchesByMake(137, 1, 8);

  if (isLoading) {
    return (
      <section className="py-8">
        <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-8">
          Featured Collection
        </h2>
        <div className="flex justify-center py-20">
          <Spinner size="lg" />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-8">
        <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-8">
          Featured Collection
        </h2>
        <div className="text-center py-20 space-y-4">
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
          <h3 className="text-xl font-bold text-zinc-900 dark:text-white">
            {error.message.includes('429') ? 'Rate Limit Reached' : 'Error Loading Watches'}
          </h3>
          <p className="text-zinc-600 dark:text-zinc-400 max-w-md mx-auto">
            {error.message.includes('429')
              ? 'Too many requests. Please wait a moment and refresh the page.'
              : 'Unable to load featured watches at this time.'}
          </p>
        </div>
      </section>
    );
  }

  if (!watchesData || watchesData.watches.length === 0) {
    return null;
  }

  return (
    <section className="py-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">
            Featured Collection
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400">
            Handpicked timepieces from prestigious manufacturers
          </p>
        </div>
        <button
          onClick={() => router.push('/browse')}
          className="hidden md:flex items-center gap-2 px-6 py-3 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-full font-semibold hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors"
        >
          View All
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
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {watchesData.watches.slice(0, 8).map((watch: any) => (
          <button
            key={watch.watchId}
            onClick={() => router.push(`/watch/${watch.watchId}`)}
            className="group text-left bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden hover:shadow-xl hover:shadow-zinc-200/50 dark:hover:shadow-black/50 transition-all duration-300 hover:-translate-y-1"
          >
            {/* Image */}
            <div className="aspect-square bg-zinc-100 dark:bg-zinc-800 overflow-hidden relative">
              {watch.url ? (
                <img
                  src={watch.url}
                  alt={watch.modelName}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <svg
                    className="w-16 h-16 text-zinc-300 dark:text-zinc-700"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              )}
              
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* View Details button on hover */}
              <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="px-4 py-2 bg-white dark:bg-zinc-900 rounded-full text-sm font-semibold text-zinc-900 dark:text-white text-center">
                  View Details
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-5 space-y-2">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white rounded-full text-xs font-semibold">
                  {watch.makeName}
                </span>
                {watch.yearProducedName && (
                  <span className="text-xs text-zinc-400 font-medium">
                    {watch.yearProducedName}
                  </span>
                )}
              </div>

              <h3 className="text-base font-bold text-zinc-900 dark:text-white leading-tight line-clamp-2 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors">
                {watch.modelName}
              </h3>

              {watch.reference && (
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Ref. {watch.reference}
                </p>
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Mobile View All Button */}
      <div className="flex md:hidden justify-center pt-4">
        <button
          onClick={() => router.push('/browse')}
          className="flex items-center gap-2 px-6 py-3 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-full font-semibold hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors"
        >
          View All Watches
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
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </section>
  );
};
