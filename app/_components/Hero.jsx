import Image from "next/image";
import React from "react";
import Link from "next/link";
// import { Button } from "@/components/ui/button";
function Hero() {
  return (
    <section className="bg-gray-900 text-white flex items-center flex-col  min-h-screen">
      <div className="mx-auto max-w-screen-xl px-4 py-28 lg:flex lg:h-screen lg:items-center">
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
            <Link
              className="block w-full rounded border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
              href={"/sign-up"}
            >
              Get Started
            </Link>

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
        className="rounded-xl border-2 mb-10  hidden md:block"
      />
    </section>
  );
}

export default Hero;
