"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "Shop", href: "#shop" },
  { label: "About", href: "#about" },
  { label: "How It Works", href: "#how-it-works" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 sm:pt-6">
      <nav className="mx-auto flex h-12 w-full max-w-5xl items-center justify-between rounded-full bg-white/70 px-3 backdrop-blur-md sm:h-14 sm:px-4">
        {/* Logo */}
        <Link href="/" className="rounded-full px-3 py-2 text-sm font-extrabold text-[#082033] transition hover:text-[#30BDF7] sm:text-base">
          Snoopy Blue
        </Link>

        {/* Desktop nav links */}
        <div className="hidden items-center gap-0.5 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="rounded-full px-3 py-2 text-sm font-medium text-[#123a55] transition hover:bg-white/50 hover:text-[#30BDF7]"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <Link
          href="#shop"
          className="rounded-full bg-[#30BDF7] px-4 py-2 text-xs font-bold text-white transition hover:bg-[#45B5F5] sm:text-sm"
        >
          Shop Now
        </Link>

        {/* Mobile hamburger */}
        <button
          className="ml-2 flex size-9 items-center justify-center rounded-full bg-white/50 md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="size-5 text-[#082033]" /> : <Menu className="size-5 text-[#082033]" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="mx-auto mt-2 w-full max-w-5xl overflow-hidden rounded-3xl bg-white/90 p-4 backdrop-blur-md md:hidden">
          <div className="flex flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-2xl px-4 py-3 text-sm font-medium text-[#123a55] transition hover:bg-[#e6f7ff]"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="#shop"
              onClick={() => setMobileOpen(false)}
              className="mt-2 rounded-full bg-[#30BDF7] px-4 py-3 text-center text-sm font-bold text-white"
            >
              Shop Now
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
