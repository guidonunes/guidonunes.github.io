import Image from "next/image";
import { SocialDock } from "@/components/social-dock";

export function HomeSectionsh() {
  return (
    // 1. CHANGED: Removed 'items-center'.
    // This allows the children to stretch to the full height of the card.
    <div className="flex flex-col md:flex-row h-full">

      {/* --- LEFT COLUMN (Text) --- */}
      {/* 2. ADDED: 'flex flex-col justify-center'
          This forces the text to stay vertically centered, even though the parent isn't. */}
      <div className="flex-1 flex flex-col justify-center py-8 px-8 pl-12 md:py-12 md:px-12 md:pl-16 lg:pl-20 space-y-6 text-center md:text-left order-1 z-10">
        <div className="space-y-3">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-slate-900 dark:text-white">
            Guilherme Nunes
          </h1>
          <p className="text-xl md:text-2xl lg:text-3xl font-medium text-cyan-600 dark:text-cyan-400">
            Software Engineer
          </p>
        </div>

        <p className="text-slate-600 dark:text-slate-400 text-base md:text-lg lg:text-xl leading-relaxed max-w-lg mx-auto md:mx-0">
          Building scalable systems with Java & Next.js.
          Focusing on clean architecture, performance, and modern web standards.
        </p>

        <div className="pt-6 flex justify-center md:justify-start">
           <SocialDock />
        </div>
      </div>

      {/* --- RIGHT COLUMN (Photo) --- */}
      {/* 3. Photo appears at bottom on mobile, right side on desktop */}
      <div className="relative w-full max-w-[350px] sm:max-w-[400px] md:max-w-[600px] lg:max-w-[650px] xl:max-w-[700px] md:w-[55%] lg:w-[60%] aspect-square order-2 shrink-0 md:mt-auto mx-auto md:mx-0">

        {/* Glow effect */}
        <div className="absolute bottom-0 right-0 w-[80%] h-[80%] bg-gradient-to-tr from-cyan-500/30 to-purple-500/30 blur-3xl opacity-40 -z-10 rounded-full" />

        <Image
          src="/profile.png"
          alt="Guido Nunes"
          fill
          // 4. VERIFIED: 'object-bottom' anchors the image to the bottom line.
          className="object-contain object-bottom drop-shadow-2xl"
          priority
        />
      </div>
    </div>
  );
}
