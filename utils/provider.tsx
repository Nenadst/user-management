'use client';

import React from 'react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { DEFAULT_STALE_TIME } from './constants';

function Providers({ children }: React.PropsWithChildren) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: DEFAULT_STALE_TIME,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default Providers;
