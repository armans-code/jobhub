'use client';
import Link from 'next/link';
import React from 'react';
import { BriefcaseIcon, HomeIcon, UsersRoundIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';

function AdminHeader() {
  const pathname = usePathname();
  const ROUTES = [
    {
      name: 'Dashboard',
      path: '',
      icon: <HomeIcon className='h-4 w-4' />,
    },
    {
      name: 'Jobs',
      path: '/jobs',
      icon: <BriefcaseIcon className='h-4 w-4' />,
    },
    {
      name: 'Applicants',
      path: '/applicants',
      icon: <UsersRoundIcon className='h-4 w-4' />,
    },
  ];
  return (
    <header className='flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6'>
      <div className='w-full flex-1 flex lg:hidden'>
        {ROUTES.map((route) => (
          <Link
            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 ${
              pathname === `/admin${route.path}`
                ? 'bg-gray-100 text-gray-900'
                : ''
            }`}
            href={`/admin/${route.path}`}
            key={route.name}
          >
            {route.icon}
            {route.name}
          </Link>
        ))}
      </div>
    </header>
  );
}

export default AdminHeader;
