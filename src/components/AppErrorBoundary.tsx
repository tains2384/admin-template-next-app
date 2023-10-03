'use client';

import { QueryClient, QueryClientProvider, useQueryErrorResetBoundary } from '@tanstack/react-query';
import React from 'react';
import { Button } from './ui/button';
import { ErrorBoundary } from 'react-error-boundary';

const queryClient = new QueryClient();

export function AppErrorBoundary({ children }: AppErrorBoundaryProps) {
  const { reset } = useQueryErrorResetBoundary();
  return (
    <ErrorBoundary
      onReset={reset}
      fallbackRender={({ resetErrorBoundary }) => (
        <div>
          There was an error!
          <Button onClick={() => resetErrorBoundary()}>Try again</Button>
        </div>
      )}
    >
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </ErrorBoundary>
  );
}

type AppErrorBoundaryProps = {
  children: React.ReactNode;
};
