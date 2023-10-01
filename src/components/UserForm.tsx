'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Label } from '~/components/ui/label';
import { Input } from '~/components/ui/input';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

export const userSchema = z.object({
  name: z.string().min(1),
  email: z.string().email().min(1),
});

export function UserForm({ onSubmit }: UserFormProps) {
  const t = useTranslations('common');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
  });

  return (
    <form className="space-y-4 p-5 bg-white rounded" onSubmit={handleSubmit(onSubmit)}>
      <div className="">
        <Label htmlFor="name">{t('name')}</Label>
        <Input id="name" type="text" placeholder="Qui quis ut ullamco" />
      </div>

      <div className="">
        <Label htmlFor="email">{t('email')}</Label>
        <Input id="email" type="email" placeholder="quiquis@ut.ullamco" />
      </div>
    </form>
  );
}

type UserFormProps = {
  onSubmit: SubmitHandler<z.infer<typeof userSchema>>;
};
