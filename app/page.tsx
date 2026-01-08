import { MainLayout } from "@/components/main-layout";
import { Card } from "@/components/card";
import { Hero } from "@/components/hero";
import { Footer } from "@/components/footer";
import { CardDeck } from "@/components/card-deck";

export default function Home() {
  return (
    <MainLayout>
      {/* 1. NEW: The Ambient Background Layer */}
      {/* This sits behind the card (-z-10) so the glass effect has something to blur. */}
      <div className="fixed inset-0 flex items-center justify-center -z-10 pointer-events-none">
        <div className="h-[400px] w-[400px] sm:h-[500px] sm:w-[500px] md:h-[600px] md:w-[600px] lg:h-[700px] lg:w-[700px] rounded-full bg-gradient-to-tr from-purple-400/60 via-pink-300/50 to-pink-400/60 dark:from-blue-600/40 dark:via-cyan-500/35 dark:to-cyan-600/40 blur-[100px] sm:blur-[110px] md:blur-[120px] animate-pulse" />
      </div>

      <div className="flex-1 flex flex-col justify-center w-full">
        <Card>
          <CardDeck />
        </Card>
      </div>

      <Footer />
    </MainLayout>
  );
}
