import { MainLayout } from "@/components/main-layout";
import { Card } from "@/components/card";
import { Hero } from "@/components/hero";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <MainLayout>
      {/* 1. NEW: The Ambient Background Layer */}
      {/* This sits behind the card (-z-10) so the glass effect has something to blur. */}
      <div className="fixed inset-0 flex items-center justify-center -z-10">
        <div className="h-[500px] w-[500px] rounded-full bg-gradient-to-tr from-purple-200/40 to-pink-200/40 dark:from-blue-900/20 dark:to-cyan-900/20 blur-[120px]" />
      </div>

      <Card>
        <Hero />
      </Card>
      <Footer />
    </MainLayout>
  );
}
