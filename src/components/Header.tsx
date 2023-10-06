import Image from 'next/image';
import React from 'react';
import { Button } from './ui/button';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import { useParams } from 'next/navigation';
import { LanguageTrigger } from './LanguageTrigger';

export function Header() {
  return (
    <div className="shadow">
      <div className="container flex justify-between items-center py-2">
        <h1>
          <Image src="/next.svg" width={100} height={20} priority alt="Logo" />
        </h1>

        <div className="flex items-center gap-3">
          <LanguageTrigger />
        </div>
      </div>
    </div>
  );
}
