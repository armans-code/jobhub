'use client';
import React from 'react';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuLink,
} from './ui/navigation-menu';
import Link from 'next/link';

const Header: React.FC = () => {
  return (
    <header className='w-full bg-transparent dark:bg-gray-800 border-b'>
      <div className='container px-4 md:px-6 py-4 md:py-6 flex justify-between items-center'>
        <h1 className='text-3xl font-semibold'>ABC Company</h1>
        <NavigationMenu>
          <NavigationMenuList className='space-x-8'>
            <NavigationMenuItem>
              <Link href='/'>Home</Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href='/benefits'>Benefits</Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href='/jobs'>Jobs</Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
};

export default Header;
