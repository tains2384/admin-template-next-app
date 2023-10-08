'use client';

import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Label } from '~/components/ui/label';
import { Input } from '~/components/ui/input';
import { Checkbox } from '~/components/ui/checkbox';
import { Button } from '~/components/ui/button';
import Link from 'next-intl/link';

import { BeakerIcon } from '@heroicons/react/24/solid';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { FormField, FormItem, FormMessage } from '~/components/ui/form';
import { signIn } from 'next-auth/react';
import { useParams, useSearchParams } from 'next/navigation';
import { useRouter } from 'next-intl/client';
import { locales } from '../../../../../locales';
import { get } from 'lodash';

const formSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

export default function Page() {
  const t = useTranslations('auth');

  const methods = useForm<LoginPayload>({
    defaultValues: {
      username: 'admin',
      password: '123',
    },
    resolver: zodResolver(formSchema),
  });

  const { control, handleSubmit, formState } = methods;

  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useParams();

  const onSubmit = async (data: LoginPayload) => {
    const result = await signIn('credentials', {
      username: data.username,
      password: data.password,
      redirect: false,
    });
    console.log('🚀 ~ onSubmit ~ result:', result);

    if (result?.ok) {
      let callbackUrl = searchParams.get('callbackUrl') || '/';

      const localeDetect = RegExp(`^(/(${locales.join('|')}))`, 'i');
      const hasLocaleInUrl = localeDetect.test(callbackUrl);
      if (hasLocaleInUrl) callbackUrl = callbackUrl.slice(3);
      const lang = get(params, 'lang', 'en') as string;

      router.refresh();
      return router.replace(callbackUrl, { locale: lang });
    }

    console.log('Login fail:', result?.error);
  };

  return (
    <div className="flex items-center justify-center p-10">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Image src="/next.svg" width={100} height={20} alt="" />
          <h2 className="mt-3 text-lg font-semibold">{t('welcome_to', { name: 'AdminTemplate' })}</h2>
          <h3 className="">{t('sign_in_guide')}</h3>

          <FormField
            control={control}
            name={`username`}
            render={({ field }) => (
              <FormItem className="mt-6">
                <Label>{t('username')}</Label>
                <Input type="text" onChange={field.onChange} defaultValue={field.value} />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name={`password`}
            render={({ field }) => (
              <FormItem className="mt-4">
                <Label htmlFor="password" className="inline-flex justify-between w-full">
                  <span>{t('password')}</span>
                  {t.rich('forget_password', {
                    a: (chunks) => <Link href="/forget-password">{chunks}</Link>,
                  })}
                </Label>
                <Input type="password" onChange={field.onChange} defaultValue={field.value} />
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-center space-x-2 mt-4">
            <Checkbox id="rememberLogin" />
            <label
              htmlFor="rememberLogin"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {t('remember_login')}
            </label>
          </div>

          <Button disabled={formState.isSubmitting} className="mt-5 w-full">
            {t('sign_in')}
          </Button>

          <p className="text-center mt-3">
            {t.rich('new_user_guide', {
              a: (chunks) => <Link href="/register">{chunks}</Link>,
            })}
          </p>

          <fieldset className="border-t border-t-slate-800 mt-8">
            <legend className="text-center px-3 leading-none">{t('or')}</legend>
          </fieldset>

          <div className="flex justify-center mt-4 gap-2">
            <Button type="button" variant="outline" size="icon">
              <BeakerIcon className="h-4 w-4" />
            </Button>
            <Button type="button" variant="outline" size="icon">
              <BeakerIcon className="h-4 w-4" />
            </Button>
            <Button type="button" variant="outline" size="icon">
              <BeakerIcon className="h-4 w-4" />
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}

type LoginPayload = {
  username: string;
  password: string;
};
