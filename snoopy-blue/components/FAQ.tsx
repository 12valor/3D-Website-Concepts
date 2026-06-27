"use client";

import { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
}

const faqs = [
  {
    q: "What is Snoopy Blue Soap?",
    a: "Snoopy Blue Soap is a fresh, gentle, and playful soap brand made for everyday cleaning. With soft scents, clean ingredients, and a cute blue mascot identity, every bar is designed to make washing feel simple, refreshing, and fun.",
  },
  {
    q: "Is it safe for sensitive skin?",
    a: "Yes. Our soap is formulated to be gentle on skin. We use clean ingredients without harsh chemicals, so it's suitable for daily use even on sensitive skin.",
  },
  {
    q: "What scents are available?",
    a: "We offer a range of fresh scents including Blue Fresh, Milky Cloud, Citrus Splash, and Calm Lavender. Each scent is designed to be light and refreshing without being overpowering.",
  },
  {
    q: "Can I gift Snoopy Blue Soap?",
    a: "Absolutely. Our gift sets come in cute, gift-ready packaging. They make perfect presents for friends, family, or anyone who enjoys a fresh bath routine.",
  },
  {
    q: "Where can I buy Snoopy Blue Soap?",
    a: "You can order directly from our website. We deliver across the Philippines with straightforward shipping and secure payment options.",
  },
  {
    q: "How long does each bar last?",
    a: "Each bar is designed to last for regular daily use. With proper care (keeping it dry between uses), you can expect each bar to last several weeks.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);
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
    <section id="faq" className="bg-[#f4fbff] px-5 py-20 sm:px-8 sm:py-24 md:px-10 md:py-32">
      <div ref={container} className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:items-start">
          {/* Left column */}
          <div>
            <div className="mb-8 flex items-center gap-4">
              <div className="h-px w-12 bg-[#30BDF7]/30" />
              <span className="text-xs font-bold uppercase tracking-widest text-[#30BDF7]">FAQ</span>
              <div className="h-px w-12 bg-[#30BDF7]/30" />
            </div>
            <h2 className="mb-6 text-[clamp(2rem,5vw,40px)] leading-tight font-black text-[#045f94]">
              Frequently Asked
              <br />
              <span className="text-[#30BDF7]">Questions</span>
            </h2>
            <a
              href="mailto:hello@snoopyblue.com"
              className="inline-flex items-center gap-2 rounded-full border border-[#30BDF7]/30 bg-white px-5 py-2.5 text-sm font-bold text-[#045f94] transition hover:bg-[#e6f7ff]"
            >
              Email Us
              <span aria-hidden="true">&rarr;</span>
            </a>
          </div>

          {/* Right column - Accordion */}
          <div className="flex flex-col gap-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className={`overflow-hidden rounded-2xl border transition-colors ${
                  openIndex === i
                    ? "border-[#30BDF7]/30 bg-white"
                    : "border-[#30BDF7]/10 bg-white/60"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6"
                >
                  <span className="text-sm font-bold text-[#082033] sm:text-base">{faq.q}</span>
                  <ChevronDown
                    className={`size-5 shrink-0 text-[#30BDF7] transition-transform duration-200 ${
                      openIndex === i ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`grid transition-all duration-200 ${
                    openIndex === i ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-4 text-sm leading-relaxed text-[#31566d] sm:px-6 sm:pb-5 sm:text-base">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
