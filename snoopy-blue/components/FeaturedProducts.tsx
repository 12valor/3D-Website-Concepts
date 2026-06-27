"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
}

const products = [
  {
    badge: "Best Seller",
    name: "Blue Fresh Bar",
    desc: "Refreshing everyday soap with a clean cool scent.",
    price: "$12.00",
    bg: "bg-[#b3e5fc]",
  },
  {
    badge: "New",
    name: "Milky Cloud Bar",
    desc: "Soft moisturizing soap for a gentle bath routine.",
    price: "$14.00",
    bg: "bg-[#e1f5fe]",
  },
  {
    badge: "Popular",
    name: "Citrus Splash Bar",
    desc: "Bright and fresh soap with a light citrus scent.",
    price: "$12.00",
    bg: "bg-[#81d4fa]",
  },
  {
    badge: "Limited",
    name: "Calm Lavender Bar",
    desc: "Relaxing soap for night routines and self-care.",
    price: "$14.00",
    bg: "bg-[#b3e5fc]",
  },
];

export default function FeaturedProducts() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!container.current) return;

    gsap.fromTo(
      container.current.querySelectorAll("[data-product-card]"),
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
    <section className="bg-[#f4fbff] px-5 py-20 sm:px-8 sm:py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-6xl">
        {/* Kick-line header */}
        <div className="mb-12 flex items-center justify-center gap-4 sm:mb-16">
          <div className="h-px w-12 bg-[#30BDF7]/30" />
          <span className="text-xs font-bold uppercase tracking-widest text-[#30BDF7]">New on Snoopy Blue</span>
          <div className="h-px w-12 bg-[#30BDF7]/30" />
        </div>

        <h2 className="mb-4 text-center text-[clamp(2rem,5vw,48px)] leading-tight font-black text-[#045f94]">
          The latest soaps
          <br />
          <span className="text-[#30BDF7]">listed on Snoopy Blue.</span>
        </h2>

        <div ref={container} className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4 lg:gap-7">
          {products.map((product, i) => (
            <div
              key={i}
              data-product-card
              className="group overflow-hidden rounded-[20px] bg-white shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-1 md:rounded-[24px]"
            >
              {/* Image */}
              <div className={`relative aspect-square ${product.bg}`}>
                {/* Badge */}
                <div className="absolute left-3 top-3 rounded-full bg-white/80 px-3 py-1 text-xs font-bold text-[#045f94] backdrop-blur-sm">
                  {product.badge}
                </div>
                {/* Decorative bubbles */}
                <div className="absolute -right-4 -top-4 h-16 w-16 rounded-full border-2 border-white/25" />
                <div className="absolute bottom-6 right-6 h-10 w-10 rounded-full border-2 border-white/20" />
              </div>

              {/* Body */}
              <div className="p-4 sm:p-5">
                <h3 className="mb-1 text-base font-bold text-[#082033]">{product.name}</h3>
                <p className="mb-3 text-sm text-[#31566d]">{product.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#30BDF7]">{product.price}</span>
                  <button className="rounded-full bg-[#045f94] px-4 py-1.5 text-xs font-bold text-white transition hover:bg-[#034d78]">
                    Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
