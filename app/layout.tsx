import type { Metadata } from "next";
import { Inter } from "next/font/google"; // 1. Import the professional font
import "./globals.css";

// 2. Configure the font (subsets: 'latin' reduces file size)
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Guilherme Nunes | Software Engineer",
  description: "Software Engineer specializing in scalable systems. Experienced in Java, Ruby, Python, Next.js, and clean architecture. Based in São Paulo.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* 3. Apply the font class to the body */}
      <body className={inter.className}>{children}</body>
    </html>
  );
}
