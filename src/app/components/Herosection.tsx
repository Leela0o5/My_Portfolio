"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <div
      className="container mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl 
                 items-center justify-center px-4 py-12 md:px-8"
    >
      <div className="grid grid-cols-1 items-center gap-16 md:grid-cols-2">
        <div className="max-w-xl text-white space-y-6 text-center md:text-left order-last md:order-first">
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight">
            Hello Buddy, I'm{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
              Leela M
            </span>
            .
          </h1>
          <p className="text-lg">
            An Aspiring Software Engineer and a Web developer with a passion for
            creating unique products.
          </p>

          <div className="flex space-x-4 justify-center md:justify-start">
            <Link
              href="/contact"
              className="rounded-md bg-yellow-400 px-6 py-3 text-sm font-semibold 
                         text-black shadow-sm transition-all duration-300 
                         hover:bg-yellow-300"
            >
              Get in touch
            </Link>
            <Link
              href="/about"
              className="group flex items-center gap-x-2 rounded-md border 
                         border-yellow-400 px-6 py-3 text-sm font-semibold 
                         text-yellow-400 transition-all duration-300 
                         hover:bg-yellow-400/10"
            >
              Learn more
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        <div className="relative flex items-center justify-center md:justify-end order-first md:order-last">
          <Image
            src="/pic.jpg"
            alt="Leela M"
            className="object-cover 
                       w-full 
                       max-w-[18rem] 
                       sm:max-w-sm 
                       aspect-square 
                       rounded-full border-4 border-yellow-400 
                       shadow-2xl shadow-yellow-400/20"
            width={400}
            height={400}
            priority
          />
        </div>
      </div>
    </div>
  );
}
