import React from 'react';
import Sidebar from '../../../components/admin/Sidebar';
import AdminHeader from '../../../components/admin/AdminHeader';

export default async function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='grid min-h-screen w-full lg:grid-cols-[260px_1fr]'>
      <Sidebar />
      <div className='flex flex-col'>
        <AdminHeader />
        <main className='flex-1'>{children}</main>
      </div>
    </div>
  );
}
