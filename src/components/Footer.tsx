import logo from "../assets/logo.png";
import Link from "next/link";
import Image from "next/image";
export default function Footer() {
  return (
    <footer className="mt-20 border-t border-[#202226] bg-[#090a0c]">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-4 px-5 py-8 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-12">
        <Link href="/" className="flex items-center gap-2">
          <div>
            <Image src={logo} alt="logo" width={32} height={32} />
          </div>
          <span className="text-xl font-black tracking-[-0.04em] text-white">
            FITLOG
          </span>
        </Link>

        <p className="text-xs text-[#656a72]">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}
