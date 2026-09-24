"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import logo from "../assets/logo.png";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="border-b border-[#202226] bg-[#0b0c0e]">
      <div className="mx-auto flex h-[76px] max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12">
       
        <Link href="/" className="flex items-center gap-2">
          <div>
            <Image src={logo} alt="logo" width={32} height={32} />
          </div>
          <span className="text-xl font-black tracking-[-0.04em] text-white">
            FITLOG
          </span>
        </Link>

        
        <nav className="hidden items-center gap-8 md:flex">
          <Link href="/" className="text-sm font-semibold text-[#ccff00]">
            WORKOUTS
          </Link>

          <Link
            href="/my-plan"
            className="text-sm font-semibold text-[#8b8f98] transition hover:text-white"
          >
            MY PLAN
          </Link>
        </nav>

       
        <div className="hidden items-center gap-3 sm:flex">
          <Link
            href="/my-plan"
            className="flex items-center gap-2  px-3 py-2 text-xs font-bold text-[#ccff00]"
          >
            PLAN
            <span className="flex h-5 min-w-5 items-center justify-center bg-[#ccff00] px-1 text-black">
              0
            </span>
          </Link>

          <Link
            href="/my-plan"
            className="flex items-center gap-2  px-3 py-2 text-xs font-bold text-[#8b8f98]"
          >
            SAVED
            <span>0</span>
          </Link>
        </div>

      
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex h-10 w-10 items-center justify-center border border-[#2a2d32] md:hidden"
          aria-label="Toggle menu"
        >
          <span className="text-xl">☰</span>
        </button>
      </div>

      
      {menuOpen && (
        <div className="border-t border-[#202226] px-5 py-5 md:hidden">
          <div className="flex flex-col gap-5">
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className="text-sm font-bold text-[#ccff00]"
            >
              WORKOUT
            </Link>

            <Link
              href="/my-plan"
              onClick={() => setMenuOpen(false)}
              className="text-sm font-bold text-white"
            >
              MY PLAN
            </Link>

            <div className="flex gap-3">
              <Link
                href="/my-plan"
                className="border border-[#ccff00] px-3 py-2 text-xs font-bold text-[#ccff00]"
              >
                PLAN <span className="ml-2">0</span>
              </Link>

              <Link
                href="/my-plan"
                className="border border-[#3a3d42] px-3 py-2 text-xs font-bold text-[#8b8f98]"
              >
                SAVED <span className="ml-2">0</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
