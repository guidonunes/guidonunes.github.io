import * as React from 'react';


interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children}: MainLayoutProps) {
  return(
    <div className = "flex min-h-screen w-full flex-col items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-md md:max-w-7xl">
        {children}
      </div>
    </div>

  );
}
