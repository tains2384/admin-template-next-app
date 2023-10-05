import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React from 'react';
import { nextAuthConfig } from '~/nextAuth';

export default async function Layout({ children }: React.PropsWithChildren) {
  const session = await getServerSession(nextAuthConfig);
  console.log('🚀 ~ Layout ~ session:', session);

  if (session?.user) {
    redirect('/form');
    return;
  }

  return <>{children}</>;
}
