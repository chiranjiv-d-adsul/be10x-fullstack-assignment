import React from 'react';
import { UserButton } from '@clerk/nextjs';
import { Menu } from 'lucide-react';

function DashboardHeader({ toggleSidebar, routeName }) {
  return (
    <div className='p-5 shadow-sm border-b flex justify-between items-center'>
      <h1 className='text-xl text-amber-900 hidden md:block'>{routeName}</h1>
      <div className='md:hidden'>
        <button onClick={toggleSidebar} className='text-gray-500 hover:text-black focus:outline-none'>
          <Menu size={24} />
        </button>
      </div>
      <div className='hidden md:block'>
        <UserButton />
      </div>
    </div>
  );
}

export default DashboardHeader;
