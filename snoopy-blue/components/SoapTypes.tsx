"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import Image from "next/image";
import { Bath, Droplets, Gift } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
}

const categories = [
  {
    num: "01",
    icon: Bath,
    name: "Bar Soap",
    count: "3 bars",
    desc: "Classic solid bars for a rich, creamy lather and a fresh daily clean.",
    variant: "bg-[#30BDF7]",
    image: "/images/bar-soap-1.jpg",
    link: "/shop?category=bar",
  },
  {
    num: "02",
    icon: Droplets,
    name: "Liquid Soap",
    count: "2 types",
    desc: "Smooth liquid formulas for gentle hand and body washing.",
    variant: "bg-[#45B5F5]",
    image: "/images/liquid-soap.jpg",
    link: "/shop?category=liquid",
  },
  {
    num: "03",
    icon: Gift,
    name: "Gift Sets",
    count: "2 sets",
    desc: "Cute boxed sets perfect for gifting to friends and loved ones.",
    variant: "bg-[#61C8FA]",
    image: "/images/gift-set.jpg",
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

        <div ref={container} className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3 lg:gap-10">
          {categories.map((cat, i) => (
            <div
              key={i}
              data-category-card
              className="group relative"
            >
              <Link
                href={cat.link}
                className="block overflow-hidden rounded-[20px] bg-[#eaf4ff] transition-transform duration-200 hover:scale-[1.02] md:rounded-[24px]"
              >
                {/* Card image */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>

                {/* Text content */}
                <div className="relative p-7 pb-8 pt-6 sm:p-8 sm:pt-7">
                  {/* Faded number */}
                  <span className="pointer-events-none absolute right-4 top-1 text-[100px] font-black leading-none text-[#30BDF7]/8 select-none sm:right-6 sm:text-[120px]">
                    {cat.num}
                  </span>

                  <div className="relative z-10">
                    <h3 className="mb-2 text-lg font-bold text-[#082033] sm:text-xl">
                      {cat.name}
                    </h3>
                    <p className="text-sm font-medium leading-relaxed text-[#31566d] sm:text-base">
                      {cat.desc}
                    </p>
                  </div>
                </div>
              </Link>

              {/* Icon badge with curved notch - positioned outside and overlapping */}
              <div className="absolute -top-3.5 left-5 z-20 sm:left-7">
                {/* Curved notch background - matches card bg */}
                <div className="absolute -left-3 -top-3 size-[52px] rounded-full bg-[#eaf4ff] sm:-left-4 sm:-top-4 sm:size-[60px]" />
                {/* Icon circle */}
                <div className={`relative flex size-12 items-center justify-center rounded-full ${cat.variant} shadow-md sm:size-14`}>
                  <cat.icon className="size-5 text-white sm:size-6" strokeWidth={2.5} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
