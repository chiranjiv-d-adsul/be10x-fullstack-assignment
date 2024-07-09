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
      <Image src="/logo.svg" alt="logo" width={40} height={40} />

      {/* Conditional rendering based on user sign-in status */}
      {isSignedIn ? (
        <Link href="/dashboard">
            <Button>Dashboard</Button>
        </Link>
      ) : (
        <Link href="/sign-up">
            <Button>Get Started</Button>
        </Link>
      )}

      {/* Always show the UserButton if signed in */}
      {isSignedIn && <UserButton />}
    </div>
  );
}

export default Header;
