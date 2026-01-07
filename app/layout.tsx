import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"; // 1. Import this

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Guido Nunes | Software Engineer",
  description: "Software Engineer specializing in scalable systems. Experienced in Java, Next.js, and clean architecture. Based in São Paulo.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* Note: suppressHydrationWarning prevents a small warning about dark mode matching server/client */}
      <body className={inter.className}>
        {/* 2. Wrap the children with the ThemeProvider */}
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
