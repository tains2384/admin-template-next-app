import React from 'react';

export default function Layout({ children }: LayoutProps) {
  return <div className="w-screen h-screen flex items-center justify-center">{children}</div>;
}

type LayoutProps = {
  children: React.ReactNode;
};
