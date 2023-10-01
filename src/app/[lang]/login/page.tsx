import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Label } from '~/components/ui/label';
import { Input } from '~/components/ui/input';
import { Checkbox } from '~/components/ui/checkbox';
import { Button } from '~/components/ui/button';
import Link from 'next/link';

import { BeakerIcon } from '@heroicons/react/24/solid';

export default function Page() {
  const t = useTranslations('auth');

  return (
    <div className="flex items-center justify-center p-10">
      <div>
        <Image src="/next.svg" width={100} height={100} alt="" />
        <h2 className="mt-3 text-lg font-semibold">{t('welcome_to', { name: 'AdminTemplate' })}</h2>
        <h3 className="">{t('sign_in_guide')}</h3>

        <div className="mt-6">
          <Label htmlFor="username">{t('username')}</Label>
          <Input id="username" type="text" placeholder="Email" />
        </div>

        <div className="mt-4">
          <Label htmlFor="password" className="inline-flex justify-between w-full">
            <span>{t('password')}</span>
            {t.rich('forget_password', {
              a: (chunks) => <Link href="/forget-password">{chunks}</Link>,
            })}
          </Label>
          <Input id="password" type="password" placeholder="******" />
        </div>

        <div className="flex items-center space-x-2 mt-4">
          <Checkbox id="rememberLogin" />
          <label
            htmlFor="rememberLogin"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {t('remember_login')}
          </label>
        </div>

        <Button className="mt-5 w-full">{t('sign_in')}</Button>

        <p className="text-center mt-3">
          {t.rich('new_user_guide', {
            a: (chunks) => <Link href="/register">{chunks}</Link>,
          })}
        </p>

        <fieldset className="border-t border-t-slate-800 mt-8">
          <legend className="text-center px-3 leading-none">{t('or')}</legend>
        </fieldset>

        <div className="flex justify-center mt-4 gap-2">
          <Button variant="outline" size="icon">
            <BeakerIcon className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <BeakerIcon className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <BeakerIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
