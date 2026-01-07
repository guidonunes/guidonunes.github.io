import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Guido Nunes | Software Engineer",
  description: "Software Engineer specializing in scalable systems. Experienced in Java, Python, Next.js, and clean architecture. Based in São Paulo.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* 4. Apply the font class to the body so it flows everywhere */}
      <body className={inter.className}>{children}</body>
    </html>
  );
}
