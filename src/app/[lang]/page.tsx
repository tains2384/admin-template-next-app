'use client';

import React from 'react';
import { signOut, useSession } from 'next-auth/react';
import { Button } from '~/components/ui/button';
import dayjs from 'dayjs';
import { Header } from '~/components/Header';
import { useTranslations } from 'next-intl';
import Link from 'next-intl/link';
import { useRouter } from 'next-intl/client';

export default function Page() {
  const session = useSession();
  const t = useTranslations();
  const router = useRouter();

  const handleLogout = async () => {
    const result = await signOut({ redirect: false });
    console.log('🚀 ~ handleLogout ~ result:', result);
    router.refresh();
  };

  return (
    <>
      <Header />
      <div className="flex flex-col gap-4 justify-center items-center">
        <pre className="rounded border border-gray-500 p-4">{JSON.stringify(session, null, 4)}</pre>
        <p>{session.data?.expires ? dayjs(session.data.expires).format('YYYY-MM-DD HH:mm:ss') : ''}</p>
        <Link href="/auth/login">{t('auth.sign_in')}</Link>
        <Link href="/form">Form - auth route</Link>
        <Link href="/about">About - public route</Link>
        <Button type="button" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </>
  );
}
