import type { ReactNode } from "react";
import type { Locale } from "@/lib/portfolio/content";
import "@/app/globals.css";

const initialPreferences = `(function(){var r=document.documentElement;try{var t=localStorage.getItem('portfolio-theme-v2')||localStorage.getItem('theme');r.dataset.theme=t==='light'?'light':'dark';r.dataset.motion=localStorage.getItem('portfolio-motion')==='off'||matchMedia('(prefers-reduced-motion: reduce)').matches?'off':'on'}catch(e){r.dataset.motion=matchMedia('(prefers-reduced-motion: reduce)').matches?'off':'on'}})()`;
export function RootDocument({
  children,
  lang,
}: {
  children: ReactNode;
  lang: Locale;
}) {
  return (
    <html
      lang={lang === "pt" ? "pt-BR" : "en"}
      data-theme="dark"
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: initialPreferences }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;450;500;550;600;650;700&family=Manrope:wght@400;500;600;650;700;750;800&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
