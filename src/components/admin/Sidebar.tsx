'use client';
import Link from 'next/link';
import React from 'react';
import {
  BriefcaseIcon,
  BuildingIcon,
  HomeIcon,
  UsersRoundIcon,
} from 'lucide-react';
import { usePathname } from 'next/navigation';

function Sidebar() {
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
    <div className='hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40'>
      <div className='flex h-full max-h-screen flex-col gap-2'>
        <div className='flex h-[60px] items-center border-b px-6'>
          <Link className='flex items-center gap-2 font-semibold' href='#'>
            <BuildingIcon className='h-6 w-6' />
            <span className=''>Admin Dashboard</span>
          </Link>
        </div>
        <div className='flex-1 overflow-auto py-2'>
          <nav className='grid items-start px-4 text-sm font-medium'>
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
          </nav>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
