'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import * as z from 'zod';
import { UserForm, userSchema } from '~/components/UserForm';

export default function Page() {
  const t = useTranslations('common');

  const onSubmit = (data: z.infer<typeof userSchema>) => {
    console.log(data);
  };

  return (
    <div className="flex justify-center items-center w-screen h-screen bg-black">
      <UserForm onSubmit={onSubmit} />
    </div>
  );
}
