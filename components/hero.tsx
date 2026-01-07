import Image from "next/image";
import { SocialDock } from "@/components/social-dock";

export function Hero() {
  return (
    <div className="flex flex-col md:flex-row items-center gap-6 sm:gap-8 md:gap-12 lg:gap-16">

      {/* --- LEFT COLUMN (Text) --- */}
      {/* flex-1 means: take up available space, but don't shrink too much */}
      <div className="flex-1 space-y-4 sm:space-y-5 md:space-y-6 text-center md:text-left order-2 md:order-1 min-w-0 w-full">
        <div className="space-y-2 sm:space-y-3">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tighter text-slate-900 dark:text-white">
            Guilherme Nunes
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium text-cyan-600 dark:text-cyan-400">
            Software Engineer
          </p>
        </div>

        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed max-w-lg mx-auto md:mx-0 px-2 sm:px-0">
          Building scalable systems with Java & Next.js.
          Focusing on clean architecture, performance, and modern web standards.
        </p>

        {/* Icons Placeholder */}
        <div className="pt-4 sm:pt-5 md:pt-6 flex justify-center md:justify-start">
          <SocialDock />
        </div>
      </div>


      <div className="relative w-full max-w-[280px] sm:max-w-[320px] md:max-w-[550px] lg:max-w-[500px] xl:max-w-[600px] md:w-1/2 aspect-square order-1 md:order-2 shrink-0 md:-mb-8 md:-mr-8 lg:-mb-12 lg:-mr-12 xl:mb-0 xl:mr-0">

        {/* The Glow */}
        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/30 to-purple-500/30 blur-3xl opacity-50 -z-10 rounded-full" />

        <Image
          src="/profile.png"
          alt="Guido Nunes"
          fill
          className="object-contain drop-shadow-2xl"
          priority
        />
      </div>
    </div>
  );
}
