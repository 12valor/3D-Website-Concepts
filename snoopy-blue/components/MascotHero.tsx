"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
}

const navItems = [
  { label: "Home", href: "#home" },
  { label: "Benefits", href: "#benefits" },
  { label: "Products", href: "#products" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
];

export default function MascotHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const mascotRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        toggleActions: "play none none reset",
      }
    });

    tl.fromTo(navRef.current, 
      { opacity: 0, y: 24 }, 
      { opacity: 1, y: 0, duration: 1.1, ease: "power3.out" }
    )
    .fromTo(mascotRef.current,
      { opacity: 0, y: 18, scale: 0.98 },
      { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: "power3.out" },
      "<0.2"
    );
  }, { scope: sectionRef });

  return (
    <section
      id="home"
      ref={sectionRef}
      aria-label="Snoopy Blue landing hero"
      className="relative isolate flex min-h-screen h-[100dvh] w-full overflow-hidden bg-[#30bdf7] text-[#082033]"
    >
      <Image
        src="/newbackground.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-30 object-cover"
      />

      <header className="absolute inset-x-0 top-0 z-30 px-4 pt-4 sm:px-6 sm:pt-6 lg:pt-8">
        <nav
          ref={navRef}
          aria-label="Primary navigation"
          className="mx-auto flex h-12 w-full max-w-4xl items-center justify-between rounded-full bg-white/60 px-3 sm:h-14 sm:px-4 opacity-0"
        >
          <Link
            href="#home"
            className="rounded-full px-3 py-2 text-sm font-extrabold text-[#082033] transition hover:text-sky-700 sm:text-base"
            aria-label="Snoopy Blue home"
          >
            Snoopy Blue
          </Link>

          <div className="hidden md:flex items-center gap-0.5">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="rounded-full px-3 py-2 text-sm font-medium text-[#123a55] transition hover:bg-white/50 hover:text-sky-800"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <Link
            href="#products"
            className="rounded-full bg-white/70 px-4 py-2 text-xs font-bold text-[#045f94] transition hover:bg-white sm:text-sm"
          >
            Shop Now
          </Link>
        </nav>
      </header>



      <div className="pointer-events-none absolute inset-x-0 bottom-[3svh] top-[7svh] z-10 mx-auto flex max-w-[1500px] items-end justify-center px-0 sm:bottom-[2svh] sm:top-[7svh] lg:bottom-[0svh] lg:top-[8svh]">
        <div ref={mascotRef} className="relative aspect-[16/9] w-[250vw] max-w-none shrink-0 sm:w-[118vw] lg:w-[105vw] xl:w-[96vw] 2xl:w-[88vw] opacity-0">
          <Image
            src="/mascot.png"
            alt="Glossy Snoopy Blue mascot"
            fill
            priority
            sizes="(min-width: 1536px) 88vw, (min-width: 1280px) 96vw, (min-width: 1024px) 105vw, (min-width: 640px) 118vw, 250vw"
            className="object-contain drop-shadow-[0_38px_80px_rgba(4,78,130,0.28)]"
          />
        </div>
      </div>
    </section>
  );
}
