import React from 'react';
import Image from 'next/image';

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <div className="hidden lg:flex items-center justify-center bg-gray-200 w-7/12 h-full">
        <Image src="/next.svg" width={500} height={500} alt="" />
      </div>
      <div className="lg:w-5/12">{children}</div>
    </div>
  );
}

type LayoutProps = {
  children: React.ReactNode;
};
