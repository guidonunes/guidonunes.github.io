import type { ReactNode } from "react";
import type { Viewport } from "next";
import { RootDocument } from "@/components/portfolio/root-layout";
export const viewport: Viewport = {
  themeColor: "#17191e",
  width: "device-width",
  initialScale: 1,
};
export default function Layout({ children }: { children: ReactNode }) {
  return <RootDocument lang="en">{children}</RootDocument>;
}
