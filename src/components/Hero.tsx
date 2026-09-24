import Link from "next/link";
import Image from "next/image";
import banner from "../assets/banner.png";

export default function Hero() {
  return (
    <section className="mx-auto max-w-[1440px] px-5 pt-6 sm:px-8 lg:px-12">
      <div className="relative min-h-[430px] overflow-hidden bg-[#15171b]">
        <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-[#ccff00]/5 blur-3xl" />

        <div className="relative grid min-h-[430px] items-center lg:grid-cols-2">
          <div className="z-10 px-6 py-12 sm:px-10 lg:px-16">
            <p className="mb-5 text-xs font-black tracking-[0.25em] text-[#ccff00]">
              WORKOUT LIBRARY
            </p>

            <h1 className="max-w-[650px] text-5xl font-black leading-[0.9] tracking-[-0.06em] text-white sm:text-6xl lg:text-7xl">
              TRAIN WITH
              <br />
              INTENT.
              <br />
              <span className="text-[#ccff00]">LOG EVERY SET.</span>
            </h1>

            <p className="mt-7 max-w-[500px] text-sm leading-6 text-[#8b8f98] sm:text-base">
              FitLog is a dark, non-nonsense gym companion :pick a lift,lock it 
              into todays plan ,and watch the weeks work add up.
            </p>

            <Link
              href="#library"
              className="mt-8 inline-flex items-center gap-3 bg-[#ccff00] px-6 py-3 text-xs font-black tracking-wider text-black transition hover:bg-[#d9ff4d]"
            >
              BROWSE WORKOUTS
              <span className="text-base">→</span>
            </Link>
          </div>

  
          <div className="relative hidden h-full min-h-[430px] lg:block">
            <div className="absolute inset-0 bg-gradient-to-r from-[#15171b] via-transparent to-transparent" />

            <Image
              src={banner}
              alt="Workout"
              fill
              priority
              className="object-cover object-center "
            />
          </div>
        </div>
      </div>
    </section>
  );
}
