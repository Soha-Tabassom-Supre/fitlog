"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

import logo from "../assets/logo.png";
import { useFavorites } from "@/context/FavoritesContext";
import { usePlan } from "@/context/PlanContext";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const { favorites } = useFavorites();
  const { plan } = usePlan();

  return (
    <header className="border-b border-[#202226] bg-[#0b0c0e]">
      <div className="mx-auto flex h-[76px] max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12">
      
        <Link href="/" className="flex items-center gap-2">
          <Image src={logo} alt="FitLog logo" width={32} height={32} />

          <span className="text-xl font-black tracking-[-0.04em] text-white">
            FITLOG
          </span>
        </Link>

       
        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="/"
            className="text-sm font-semibold text-[#ccff00] transition hover:text-white"
          >
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
            className="flex items-center gap-2 px-3 py-2 text-xs font-bold text-[#ccff00] transition hover:text-white"
          >
            PLAN
            <span className="flex h-5 min-w-5 items-center justify-center bg-[#ccff00] px-1 text-black">
              {plan.length}
            </span>
          </Link>

          <Link
            href="/my-plan"
            className="flex items-center gap-2 px-3 py-2 text-xs font-bold text-[#8b8f98] transition hover:text-white"
          >
            SAVED
            <span className="flex h-5 min-w-5 items-center justify-center bg-[#2a2d32] px-1 text-[#f4f4f0]">
              {favorites.length}
            </span>
          </Link>
        </div>

       
        <button
          onClick={() => setMenuOpen((current) => !current)}
          className="flex h-10 w-10 items-center justify-center border border-[#2a2d32] text-white transition hover:border-[#ccff00] hover:text-[#ccff00] md:hidden"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span className="text-xl">{menuOpen ? "×" : "☰"}</span>
        </button>
      </div>

     
      {menuOpen && (
        <div className="border-t border-[#202226] bg-[#0b0c0e] px-5 py-5 md:hidden">
          <div className="flex flex-col gap-5">
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className="text-sm font-bold text-[#ccff00]"
            >
              WORKOUTS
            </Link>

            <Link
              href="/my-plan"
              onClick={() => setMenuOpen(false)}
              className="text-sm font-bold text-white transition hover:text-[#ccff00]"
            >
              MY PLAN
            </Link>

            <div className="flex gap-3">
              <Link
                href="/my-plan"
                onClick={() => setMenuOpen(false)}
                className="border border-[#ccff00] px-3 py-2 text-xs font-bold text-[#ccff00]"
              >
                PLAN
                <span className="ml-2">{plan.length}</span>
              </Link>

              <Link
                href="/my-plan"
                onClick={() => setMenuOpen(false)}
                className="border border-[#3a3d42] px-3 py-2 text-xs font-bold text-[#8b8f98]"
              >
                SAVED
                <span className="ml-2">{favorites.length}</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
