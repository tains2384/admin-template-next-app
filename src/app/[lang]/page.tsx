'use client';

import React from 'react';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { Button } from '~/components/ui/button';

export default function Page() {
  const session = useSession();

  const handleLogout = async () => {
    const result = await signOut({ redirect: false });
    console.log('🚀 ~ handleLogout ~ result:', result);
  };

  return (
    <div className="flex flex-col gap-4 justify-center items-center w-screen h-screen">
      <pre className="rounded border border-gray-500 p-4">{JSON.stringify(session, null, 4)}</pre>
      <Link href="/auth/login">Login</Link>
      <Button type="button" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
}
