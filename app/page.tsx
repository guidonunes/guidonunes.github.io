import { MainLayout } from "@/components/main-layout";
import { Card } from "@/components/card";
import { Hero } from "@/components/hero";

export default function Home() {
  return (
    <MainLayout>
      {/* 1. NEW: The Ambient Background Layer */}
      {/* This sits behind the card (-z-10) so the glass effect has something to blur. */}
      <div className="fixed inset-0 flex items-center justify-center -z-10 pointer-events-none">
        <div className="h-[600px] w-[600px] rounded-full bg-gradient-to-tr from-purple-400/60 via-pink-300/50 to-pink-400/60 dark:from-blue-600/40 dark:via-cyan-500/35 dark:to-cyan-600/40 blur-[120px] animate-pulse" />
      </div>

      <Card>
        <Hero />
      </Card>
    </MainLayout>
  );
}
