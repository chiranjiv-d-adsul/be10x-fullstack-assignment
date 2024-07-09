'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { UserButton, useUser } from '@clerk/nextjs';
import { Button } from '/components/ui/button';

function Header() {
  const { user, isSignedIn } = useUser();

  return (
    <div className="p-5 flex justify-between items-center border shadow-md">
      <div className='flex justify-between items-center gap-3'>

      <Image src="/logo.svg" alt="logo" width={40} height={40} />
      <span className="text-xl font-bold">
        Expense Tracker
        </span>
      </div>
      {/* Conditional rendering based on user sign-in status */}
      {isSignedIn ? (

            <UserButton />
      ) : (
        <Link href="/sign-up">
            <Button className>Get Started</Button>
        </Link>
      )}

      {/* Always show the UserButton if signed in */}
    </div>
  );
}

export default Header;
