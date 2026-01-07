import Image from "next/image";
import { SocialDock } from "@/components/social-dock";

export function Hero() {
  return (
    <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">

      {/* --- LEFT COLUMN (Text) --- */}
      {/* flex-1 means: take up available space, but don't shrink too much */}
      <div className="flex-1 space-y-6 text-center md:text-left order-2 md:order-1 min-w-0">
        <div className="space-y-3">
          <h1 className="text-4xl md:text-7xl font-bold tracking-tighter text-slate-900 dark:text-white">
            Guilherme Nunes
          </h1>
          <p className="text-xl md:text-3xl font-medium text-cyan-600 dark:text-cyan-400">
            Software Engineer
          </p>
        </div>

        <p className="text-slate-600 dark:text-slate-400 text-base md:text-xl leading-relaxed max-w-lg mx-auto md:mx-0">
          Building scalable systems with Java & Next.js.
          Focusing on clean architecture, performance, and modern web standards.
        </p>

        {/* Icons Placeholder */}
        <div className="pt-6 flex justify-center md:justify-start">
          <SocialDock />
        </div>
      </div>


      <div className="relative w-full max-w-[960px] md:max-w-[1000px] md:w-1/2 aspect-square order-1 md:order-2 shrink-0 mt-auto">

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
