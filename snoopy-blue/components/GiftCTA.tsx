"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
}

export default function GiftCTA() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!container.current) return;

    gsap.fromTo(
      container.current,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: container.current,
          start: "top 82%",
          toggleActions: "play none none none",
        },
      }
    );
  }, { scope: container });

  return (
    <section className="bg-white px-5 py-20 sm:px-8 sm:py-24 md:px-10 md:py-32">
      <div ref={container} className="mx-auto max-w-5xl">
        <div className="relative flex flex-col items-center gap-10 md:flex-row md:gap-16">
          {/* Left decorative images */}
          <div className="pointer-events-none absolute -left-8 top-0 hidden md:block">
            <div className="mb-4 size-28 rounded-full bg-[#e6f7ff] sm:size-36" />
            <div className="ml-8 size-20 rounded-full bg-[#b3e5fc] sm:size-24" />
          </div>

          {/* Center content */}
          <div className="relative z-10 max-w-xl text-center md:text-left">
            <div className="mb-4 inline-flex rounded-full border border-[#30BDF7]/20 bg-[#e6f7ff] px-4 py-1.5 text-xs font-bold text-[#045f94]">
              Gift with love
            </div>
            <h2 className="mb-4 text-[clamp(2rem,5vw,40px)] leading-tight font-black text-[#045f94]">
              Gift Snoopy Blue
            </h2>
            <p className="mb-8 text-base font-medium leading-relaxed text-[#31566d] sm:text-lg">
              Share the freshness with someone special. Our gift sets come in
              cute, ready-to-give packaging — perfect for birthdays, holidays,
              or just because.
            </p>
            <div className="flex flex-col items-center gap-3 sm:flex-row md:justify-start">
              <Link
                href="/shop?category=gift"
                className="inline-flex items-center justify-center rounded-full bg-[#30BDF7] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#45B5F5]"
              >
                Shop Gift Sets
                <span className="ml-2" aria-hidden="true">&rarr;</span>
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center rounded-full border border-[#30BDF7]/30 bg-white px-6 py-3 text-sm font-bold text-[#045f94] transition hover:bg-[#e6f7ff]"
              >
                Learn More
              </Link>
            </div>
          </div>

          {/* Right decorative images */}
          <div className="pointer-events-none absolute -right-8 bottom-0 hidden md:block">
            <div className="mb-4 ml-auto size-24 rounded-full bg-[#b3e5fc] sm:size-32" />
            <div className="size-16 rounded-full bg-[#e6f7ff] sm:size-20" />
          </div>
        </div>
      </div>
    </section>
  );
}
