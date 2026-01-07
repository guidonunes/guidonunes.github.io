import * as React from 'react';
import { ThemeToggle } from './theme-toggle';


interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children}: MainLayoutProps) {
  return(
    <div className = "flex min-h-screen w-full flex-col items-center justify-center p-4 sm:p-8">
      <div className="absolute top-4 right-4 z-50">
        <ThemeToggle />
      </div>
      <div className="w-full max-w-md md:max-w-7xl">
        {children}
      </div>
    </div>

  );
}
