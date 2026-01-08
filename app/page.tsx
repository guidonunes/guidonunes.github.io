"use client";

import * as React from "react";
import { MainLayout } from "@/components/main-layout";
import { Card } from "@/components/card";
import { Footer } from "@/components/footer";
import { CardDeck } from "@/components/card-deck";
import { NavTabs } from "@/components/nav-tabs";

export default function Home() {
  const [activeTab, setActiveTab] = React.useState("home");

  return (
    <MainLayout>
      {/* 1. NEW: The Ambient Background Layer */}
      {/* This sits behind the card (-z-10) so the glass effect has something to blur. */}
      <div className="fixed inset-0 flex items-center justify-center -z-10 pointer-events-none">
        <div className="h-[400px] w-[400px] sm:h-[500px] sm:w-[500px] md:h-[600px] md:w-[600px] lg:h-[700px] lg:w-[700px] rounded-full bg-gradient-to-tr from-purple-400/60 via-pink-300/50 to-pink-400/60 dark:from-blue-600/40 dark:via-cyan-500/35 dark:to-cyan-600/40 blur-[100px] sm:blur-[110px] md:blur-[120px] animate-pulse" />
      </div>

      <div className="flex-1 flex flex-col justify-center w-full mb-6 md:mb-0">
        <Card>
          <CardDeck activeTab={activeTab} onChange={setActiveTab} />
        </Card>
      </div>

      {/* Navigation buttons between card and footer on mobile */}
      <div className="md:hidden w-full flex justify-center py-6 mb-6">
        <NavTabs activeTab={activeTab} onChange={setActiveTab} />
      </div>

      <Footer />
    </MainLayout>
  );
}
