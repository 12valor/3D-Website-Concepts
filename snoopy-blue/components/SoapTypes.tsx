"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
}

const categories = [
  {
    name: "Bar Soap",
    count: "3 bars",
    desc: "Classic solid bars for a rich, creamy lather and a fresh daily clean.",
    bg: "bg-[#45B5F5]",
    link: "/shop?category=bar",
  },
  {
    name: "Liquid Soap",
    count: "2 types",
    desc: "Smooth liquid formulas for gentle hand and body washing.",
    bg: "bg-[#30BDF7]",
    link: "/shop?category=liquid",
  },
  {
    name: "Gift Sets",
    count: "2 sets",
    desc: "Cute boxed sets perfect for gifting to friends and loved ones.",
    bg: "bg-[#61C8FA]",
    link: "/shop?category=gift",
  },
];

export default function SoapTypes() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!container.current) return;

    gsap.fromTo(
      container.current.querySelectorAll("[data-category-card]"),
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
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
    <section id="shop" className="bg-white px-5 py-20 sm:px-8 sm:py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-6xl">
        {/* Kick-line header */}
        <div className="mb-12 flex items-center justify-center gap-4 sm:mb-16">
          <div className="h-px w-12 bg-[#30BDF7]/30" />
          <span className="text-xs font-bold uppercase tracking-widest text-[#30BDF7]">Categories</span>
          <div className="h-px w-12 bg-[#30BDF7]/30" />
        </div>

        <h2 className="mb-4 text-center text-[clamp(2rem,5vw,48px)] leading-tight font-black text-[#045f94]">
          Find your soap.
          <br />
          <span className="text-[#30BDF7]">Browse by category.</span>
        </h2>

        <div className="mb-10 flex justify-center sm:mb-14">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 rounded-full border border-[#30BDF7]/30 bg-white px-5 py-2.5 text-sm font-bold text-[#045f94] transition hover:bg-[#e6f7ff]"
          >
            View all products
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>

        <div ref={container} className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8">
          {categories.map((cat, i) => (
            <Link
              key={i}
              href={cat.link}
              data-category-card
              className="group relative overflow-hidden rounded-[20px] transition-transform duration-200 hover:scale-[1.02] md:rounded-[24px]"
            >
              {/* Card image area */}
              <div className={`relative aspect-[16/10] ${cat.bg}`}>
                {/* Decorative bubble */}
                <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full border-2 border-white/20" />
                <div className="absolute bottom-4 left-4 h-12 w-12 rounded-full border-2 border-white/15" />
              </div>

              {/* Overlay bar */}
              <div className="absolute inset-x-0 bottom-0 bg-white/90 px-5 py-4 backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  <span className="text-base font-bold text-[#082033]">{cat.name}</span>
                  <span className="text-xs font-semibold text-[#31566d]">{cat.count}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
