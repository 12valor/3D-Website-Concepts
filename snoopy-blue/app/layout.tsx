import type { Metadata } from "next";
import { Baloo_2, Nunito_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const baloo = Baloo_2({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const nunito = Nunito_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Snoopy Blue",
  description: "A clean, playful blue landing page with a glossy Snoopy Blue mascot.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", baloo.variable, nunito.variable, "font-sans")}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
