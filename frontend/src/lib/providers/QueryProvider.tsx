"use client";

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1 minute
            refetchOnWindowFocus: false,
            retry: (failureCount, error: any) => {
              // Don't retry on 429 (rate limit) errors
              if (error?.message?.includes('429')) {
                return false;
              }
              // Retry up to 2 times for other errors
              return failureCount < 2;
            },
            retryDelay: (attemptIndex) => {
              // Exponential backoff: 1s, 2s, 4s
              return Math.min(1000 * 2 ** attemptIndex, 30000);
            },
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
