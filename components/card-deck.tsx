"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { NavTabs } from "@/components/nav-tabs";
import { HomeSection } from "@/components/sections/home-section";
import { AboutSection } from "@/components/sections/about-section";
import { ProjectsSection } from "@/components/sections/projects-section";

export function CardDeck() {
  // 1. State: Tracks which card is currently visible
  const [activeTab, setActiveTab] = React.useState("home");

  // 2. Helper to render the correct component
  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return <HomeSection />;
      case "about":
        return <AboutSection />;
      case "projects":
        return <ProjectsSection />;
      default:
        return <HomeSection />;
    }
  };

  return (
    // Relative container to hold the Tabs and the Content
    <div className="relative w-full h-full min-h-[600px] flex flex-col md:flex-row">

      {/* A. The Navigation Buttons (Floating on the right/bottom) */}
      <NavTabs activeTab={activeTab} onChange={setActiveTab} />

      {/* B. The Content Area (Animated) */}
      <div className="flex-1 relative overflow-hidden">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={activeTab} // Key changes trigger the animation

            // Animation States
            initial={{ opacity: 0, x: 100 }} // Start: Invisible & to the right
            animate={{ opacity: 1, x: 0 }}   // End: Visible & centered
            exit={{ opacity: 0, x: -100 }}   // Exit: Invisible & to the left

            // Physics
            transition={{ type: "spring", stiffness: 300, damping: 30 }}

            // Layout
            className="w-full h-full"
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
