import * as React from 'react';
import { ThemeToggle } from './theme-toggle';
import { Footer } from './footer';


interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children}: MainLayoutProps) {
  return(
    <div className="relative z-10 flex min-h-screen w-full flex-col items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-50">
        <ThemeToggle />
      </div>
      <div className="w-full max-w-full sm:max-w-lg md:max-w-4xl lg:max-w-6xl xl:max-w-7xl px-2 sm:px-4">
        {children}
      </div>
      <Footer />
    </div>
  );
}
