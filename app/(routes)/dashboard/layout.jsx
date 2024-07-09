'use client';

import React, { useEffect, useState } from 'react';
import SideNav from './_components/SideNav';
import DashboardHeader from './_components/DashboardHeader';
import { useUser } from '@clerk/nextjs';
import { eq } from 'drizzle-orm';
import { db } from '../../../utils/dbConfig';
import { Budgets } from '../../../utils/schema';
import { useRouter, usePathname } from 'next/navigation';

function DashboardLayout({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [routeName, setRouteName] = useState('Dashboard');
  const path = usePathname();
  const { user } = useUser();
  const router = useRouter();

  const menuList = [
    { name: 'Dashboard', link: '/dashboard' },
    { name: 'Budget', link: '/dashboard/budgets' },
    { name: 'Settings', link: '/dashboard/settings' },
  ];

  useEffect(() => {
    const currentMenu = menuList.find((menu) => menu.link === path);
    if (currentMenu) {
      setRouteName(currentMenu.name);
    }
  }, [path]);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (user) {
      checkUserBudgets();
    }
  }, [user]);

  const checkUserBudgets = async () => {
    const result = await db
      .select()
      .from(Budgets)
      .where(eq(Budgets.createBy, user?.primaryEmailAddress?.emailAddress));
    if (result?.length === 0) {
      router.replace('/dashboard/budgets');
    }
  };

  return (
    <div className="flex">
      <div className={`fixed md:w-64 z-10 ${isOpen ? 'block' : 'hidden'} md:block`}>
        <SideNav isOpen={isOpen} toggleSidebar={toggleSidebar} updateRouteName={setRouteName} />
      </div>
      <div className="flex-1 md:ml-64">
        <DashboardHeader toggleSidebar={toggleSidebar} routeName={routeName} />
        <div className="">{children}</div>
      </div>
    </div>
  );
}

export default DashboardLayout;
