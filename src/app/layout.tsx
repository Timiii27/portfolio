import type { Metadata, Viewport } from "next";
import "@fontsource-variable/archivo/wdth.css";
import "@fontsource-variable/jetbrains-mono";
import "lenis/dist/lenis.css";
import "./globals.css";
import { profile } from "@/data/profile";
import SmoothScroll from "@/components/SmoothScroll";

const fullName = `${profile.name.first} ${profile.name.last}`;

export const metadata: Metadata = {
  title: `${fullName} — ${profile.role}`,
  description: profile.tagline,
  openGraph: {
    title: `${fullName} — ${profile.role}`,
    description: profile.tagline,
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#ecebe4",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
