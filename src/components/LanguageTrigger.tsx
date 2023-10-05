'use client';

import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Button } from './ui/button';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import { useParams } from 'next/navigation';
import { get } from 'lodash';
import { usePathname, useRouter } from 'next-intl/client';

export function LanguageTrigger() {
  const params = useParams();
  const pathname = usePathname();
  const router = useRouter();

  const lang = get(params, 'lang', 'en') as string;

  const handleChangeLanguage = (newLang: string) => {
    router.push(pathname, { locale: newLang });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <ChevronDownIcon className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Languages</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={lang} onValueChange={handleChangeLanguage}>
          <DropdownMenuRadioItem value="en">EN</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="vi">VI</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
