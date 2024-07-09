"use client";
import React, { useState } from "react";
import Image from "next/image";
import {
  LayoutGrid,
  PiggyBank,
  ReceiptText,
  Settings,
  ShieldCheck,
} from "lucide-react";
import { SignOutButton, UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";

function SideNav() {
  const [isOpen, setIsOpen] = useState(false);
  const path = usePathname();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const menuList = [
    {
      id: 1,
      name: "Dashboard",
      icon: LayoutGrid,
      link: "/dashboard",
    },
    // {
    //   id: 2,
    //   name: "Expenses",
    //   icon: ReceiptText,
    //   link: "/dashboard/expenses",
    // },
    {
      id: 3,
      name: "Budget",
      icon: PiggyBank,
      link: "/dashboard/budgets",
    },
    // {
    //   id: 4,
    //   name: "Upgrade",
    //   icon: ShieldCheck,
    //   link: "/dashboard/upgrade",
    // },
    {
      name: "Settings",
      icon: Settings,
      link: "/dashboard/settings",
    },
  ];

  return (
    <div className="h-screen p-5 border shadow-md">
      <div className="flex justify-between items-center">
        <div className="flex gap-3 items-center">
          <Image src="/logo.svg" alt="logo" width={40} height={40} />
          <h1 className="text-2xl font-mono text-stone-800">Tracker</h1>
        </div>
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-gray-500 hover:text-black focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      <div className={`md:flex md:flex-col ${isOpen ? "block" : "hidden"}`}>
        <div className="flex flex-col justify-center items-start mt-10 gap-2">
          {menuList.map((menu, index) => (
            <h2
              key={menu.id}
              className={`text-gray-500 text-l hover:text-black hover:bg-slate-200 hover:w-[100%] flex items-center space-x-2 p-2 rounded-md ${
                path == menu.link && "text-xl bg-slate-200 text-black w-[100%]"
              }`}
            >
              <menu.icon size={24} />
              <a className="" href={menu.link}>
                {menu.name}
              </a>
            </h2>
          ))}
        </div>
        <div className="hover:text-black rounded-xl ml-7 text-red-800 fixed bottom-10 p-5 flex gap-4 border shadow-md justify-center items-center">
          <UserButton />
          <SignOutButton />
        </div>
      </div>
    </div>
  );
}

export default SideNav;
