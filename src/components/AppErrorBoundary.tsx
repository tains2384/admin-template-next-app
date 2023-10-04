'use client';

import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import React from 'react';
import { Button } from './ui/button';
import { ErrorBoundary } from 'react-error-boundary';

export function AppErrorBoundary({ children }: AppErrorBoundaryProps) {
  const { reset } = useQueryErrorResetBoundary();
  return (
    <ErrorBoundary
      onReset={reset}
      fallbackRender={({ resetErrorBoundary }) => (
        <div className="w-screen h-screen flex justify-center items-center gap-4">
          <span>There was an error!</span>
          <Button onClick={() => resetErrorBoundary()}>Try again</Button>
        </div>
      )}
    >
      {children}
    </ErrorBoundary>
  );
}

type AppErrorBoundaryProps = {
  children: React.ReactNode;
};
