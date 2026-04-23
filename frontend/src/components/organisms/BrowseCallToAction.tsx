"use client";

import { useRouter } from "next/navigation";

export const BrowseCallToAction: React.FC = () => {
  const router = useRouter();

  return (
    <section className="grid md:grid-cols-2 gap-6">
      {/* Browse by Make */}
      <button
        onClick={() => router.push('/browse')}
        className="group relative overflow-hidden bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 md:p-10 text-left transition-all duration-300 hover:shadow-xl hover:shadow-zinc-200/50 dark:hover:shadow-black/50 hover:-translate-y-1"
      >
        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-zinc-100 dark:bg-zinc-800">
            <svg
              className="w-7 h-7 text-zinc-900 dark:text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
          </div>
          
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white mb-2">
              Browse by Manufacturer
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 text-base md:text-lg">
              Explore watches from 166 prestigious brands including Rolex, Patek Philippe, Audemars Piguet, and more
            </p>
          </div>

          <div className="flex items-center gap-2 text-zinc-900 dark:text-white font-semibold group-hover:gap-4 transition-all">
            <span>Start Browsing</span>
            <svg
              className="w-5 h-5"
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
          </div>
        </div>
      </button>

      {/* Browse by Model */}
      <button
        onClick={() => router.push('/browse?tab=models')}
        className="group relative overflow-hidden bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 md:p-10 text-left transition-all duration-300 hover:shadow-xl hover:shadow-zinc-200/50 dark:hover:shadow-black/50 hover:-translate-y-1"
      >
        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-zinc-100 dark:bg-zinc-800">
            <svg
              className="w-7 h-7 text-zinc-900 dark:text-white"
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
          
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white mb-2">
              Browse by Model
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 text-base md:text-lg">
              Find specific watch models like Submariner, Nautilus, Royal Oak, and thousands more
            </p>
          </div>

          <div className="flex items-center gap-2 text-zinc-900 dark:text-white font-semibold group-hover:gap-4 transition-all">
            <span>Explore Models</span>
            <svg
              className="w-5 h-5"
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
          </div>
        </div>
      </button>
    </section>
  );
};
