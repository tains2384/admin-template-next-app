import React from 'react';
import { Header } from '~/components/Header';

export default function Layout({ children }: LayoutProps) {
  return (
    <div>
      <Header />
      <div className="flex items-center justify-center">{children}</div>;
    </div>
  );
}

type LayoutProps = {
  children: React.ReactNode;
};
