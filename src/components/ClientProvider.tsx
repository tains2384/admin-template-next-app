'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import React from 'react';

const queryClient = new QueryClient();

export function ClientProvider({ children, session }: React.PropsWithChildren & { session: Session | null }) {
  return (
    <SessionProvider session={session} basePath={process.env.NEXTAUTH_URL}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </SessionProvider>
  );
}
