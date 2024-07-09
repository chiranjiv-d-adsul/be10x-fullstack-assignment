"use client";

import Image from "next/image";
import React from "react";
import Link from "next/link";
// import { Button } from "@/components/ui/button";
import { UserButton, useUser } from "@clerk/nextjs";
import { Button } from "/components/ui/button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin, faVercel } from '@fortawesome/free-brands-svg-icons';
function Hero() {
  const { user, isSignedIn } = useUser();

  return (
    <section className="bg-gray-900 text-white flex items-center flex-col  min-h-screen">
      <div className="mx-auto max-w-screen-xl px-4 py-20 lg:flex lg:h-screen lg:items-center">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl">
            Manage Your Expenses here! <br />
            <span className="sm:block"> Control what you earn </span>
          </h1>

          <p className="mx-auto mt-4 max-w-xl sm:text-xl/relaxed">
            Start creating your budget and manage your expenses with ease.{" "}
            <br />
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            {isSignedIn ? (
              <Link
                href="/dashboard"
                className="block w-full rounded border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
              >
                Dashboard
              </Link>
            ) : (
              <Link
                className="block w-full rounded border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
                href={"/sign-up"}
              >
                Get Started
              </Link>
            )}

            <a
              className="block w-full rounded border border-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring active:bg-blue-500 sm:w-auto"
              href="#"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>

      <Image
        src="/dashboard.png"
        alt="hero"
        width={1000}
        height={700}
        className="rounded-xl border-2 mb-15  hidden md:block"
      />


<div className="flex space-x-4 m-8 justify-center items-center">
      <a href="https://github.com/chiranjiv-d-adsul/be10x-fullstack-assignment.git" target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon icon={faGithub} className="text-gray-600 " size="2x" />
      </a>
      <a href="https://www.linkedin.com/in/chiranjivdadsul/" target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon icon={faLinkedin} className="text-gray-600 " size="2x" />
      </a>

    </div>
    </section>
  );
}

export default Hero;
