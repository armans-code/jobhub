import { SearchIcon } from 'lucide-react';
import React from 'react';
import { Input } from '../ui/input';

function AdminHeader() {
  return (
    <header className='flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6'>
      <div className='w-full flex-1'>
        <form>
          <div className='relative'>
            <SearchIcon className='absolute left-2.5 top-2.5 h-4 w-4 text-gray-500' />
            <Input
              className='w-full bg-white shadow-none appearance-none pl-8 md:w-2/3 lg:w-1/3'
              placeholder='Search positions or applicants...'
              type='search'
            />
          </div>
        </form>
      </div>
    </header>
  );
}

export default AdminHeader;
