import React from 'react';
import Sidebar from '../../../components/admin/Sidebar';

export default async function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='grid min-h-screen w-full lg:grid-cols-[260px_1fr]'>
      <Sidebar />
      <main className='flex-1'>{children}</main>
    </div>
  );
}
