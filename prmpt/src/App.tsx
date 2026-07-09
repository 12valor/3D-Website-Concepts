import { useEffect, useRef, useCallback } from "react";
import { motion } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { VIDEO_LEFT, VIDEO_RIGHT, GALLERY_IMAGES, CIRCLE_SYMBOLS } from "./constants";

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------------ */
/*  LAYOUT HELPERS                                                     */
/* ------------------------------------------------------------------ */

function buildLayout(count: number, cols: number): number[][] {
  const rows: number[][] = [];
  let placed = 0;
  let r = 0;
  while (placed < count) {
    const row = new Array(cols).fill(-1);
    const a = (r * 2 + (r % 2)) % cols;
    row[a] = placed++;
    if (r % 3 === 0 && placed < count) {
      let b = (a + 2) % cols;
      if (b === a) b = (a + 1) % cols;
      row[b] = placed++;
    }
    rows.push(row);
    r++;
  }
  return rows;
}

function getColumns(w: number) {
  if (w < 640) return 2;
  if (w < 1024) return 3;
  return 4;
}

function isTouchDevice() {
  return "ontouchstart" in window || navigator.maxTouchPoints > 0;
}

/* ------------------------------------------------------------------ */
/*  SVG COMPONENTS                                                     */
/* ------------------------------------------------------------------ */

function LogoSVG() {
  return (
    <svg viewBox="0 0 440 110" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
      {/* P */}
      <path d="M0 110V0H40.5C58.5 0 71.5 13 71.5 31.5C71.5 50 58.5 63 40.5 63H22V110H0ZM22 44H37C44.5 44 49.5 39 49.5 31.5C49.5 24 44.5 19 37 19H22V44Z" fill="white"/>
      {/* R */}
      <path d="M80 110V0H120C137.5 0 150 12.5 150 30.5C150 43.5 142.5 54 131 58.5L155 110H130L108.5 62H102V110H80ZM102 44H116.5C124 44 128 39 128 31C128 23 124 18.5 116.5 18.5H102V44Z" fill="white"/>
      {/* M */}
      <path d="M163 110V0H202L222 72H222.5L242.5 0H282V110H261V30H260.5L238 110H206.5L184 30H183.5V110H163Z" fill="white"/>
      {/* P */}
      <path d="M297 110V0H337.5C355.5 0 368.5 13 368.5 31.5C368.5 50 355.5 63 337.5 63H319V110H297ZM319 44H334C341.5 44 346.5 39 346.5 31.5C346.5 24 341.5 19 334 19H319V44Z" fill="white"/>
      {/* T */}
      <path d="M370 0H440V19H416V110H394V19H370V0Z" fill="white"/>
      {/* Circled R mark */}
      <circle cx="355" cy="15" r="11" stroke="white" strokeWidth="1.5" fill="none"/>
      <text x="355" y="19.5" textAnchor="middle" fill="white" fontSize="14" fontFamily="Inter Tight, sans-serif" fontWeight="500">R</text>
    </svg>
  );
}

function CursorSVG() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="24" cy="24" r="22.75" stroke="white" strokeWidth="2.5" />
      <path
        d="M24 14C24 14 20 18 20 24C20 30 24 34 24 34C24 34 28 30 28 24C28 18 24 14 24 14Z"
        fill="white"
      />
      <path
        d="M14 24C14 24 18 20 24 20C30 20 34 24 34 24C34 24 30 28 24 28C18 28 14 24 14 24Z"
        fill="white"
      />
    </svg>
  );
}

function HamburgerSVG({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <line x1="0" y1="14" x2="40" y2="14" stroke="white" strokeWidth="2.5" />
      <line x1="0" y1="26" x2="40" y2="26" stroke="white" strokeWidth="2.5" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  MAIN APP                                                           */
/* ------------------------------------------------------------------ */

export default function App() {
  const spacerRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const leftVideoRef = useRef<HTMLVideoElement>(null);
  const rightVideoRef = useRef<HTMLVideoElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const buyRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const circleSymbolRef = useRef<HTMLSpanElement>(null);

  const activeSideRef = useRef<"left" | "right">("right");
  const videosLoadedRef = useRef({ left: false, right: false });
  const lastSymbolTime = useRef(0);

  /* ---- isTouchRef ---- */
  const touchRef = useRef(false);

  /* ---- build grid data ---- */
  const cols = typeof window !== "undefined" ? getColumns(window.innerWidth) : 4;
  const gridData = buildLayout(GALLERY_IMAGES.length, cols);

  /* ---- cursor handler ---- */
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (cursorRef.current) {
      cursorRef.current.style.left = `${e.clientX}px`;
      cursorRef.current.style.top = `${e.clientY}px`;
    }
  }, []);

  /* ---- RAF loop ---- */
  useEffect(() => {
    touchRef.current = isTouchDevice();

    /* cursor */
    if (!touchRef.current) {
      window.addEventListener("mousemove", handleMouseMove);
    }

    /* video canplay */
    const lv = leftVideoRef.current!;
    const rv = rightVideoRef.current!;

    const checkLoaded = () => {
      if (videosLoadedRef.current.left && videosLoadedRef.current.right && canvasRef.current) {
        canvasRef.current.style.opacity = "1";
      }
    };
    const onLeftReady = () => { videosLoadedRef.current.left = true; checkLoaded(); };
    const onRightReady = () => { videosLoadedRef.current.right = true; checkLoaded(); };

    lv.addEventListener("canplaythrough", onLeftReady);
    rv.addEventListener("canplaythrough", onRightReady);
    if (lv.readyState >= 4) onLeftReady();
    if (rv.readyState >= 4) onRightReady();

    /* Mobile auto-play */
    if (touchRef.current) {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (!prefersReduced) {
        rv.style.display = "block";
        lv.style.display = "none";
        activeSideRef.current = "right";

        const playNext = (current: "left" | "right") => {
          if (current === "right") {
            rv.style.display = "none";
            lv.style.display = "block";
            lv.currentTime = 0;
            lv.play().catch(() => {});
            activeSideRef.current = "left";
          } else {
            lv.style.display = "none";
            rv.style.display = "block";
            rv.currentTime = 0;
            rv.play().catch(() => {});
            activeSideRef.current = "right";
          }
        };

        rv.addEventListener("ended", () => playNext("right"));
        lv.addEventListener("ended", () => playNext("left"));

        rv.play().catch(() => {});
      }
    }

    /* GSAP ScrollTrigger — panel slide up */
    const panel = panelRef.current!;
    gsap.set(panel, { y: "100vh" });

    gsap.to(panel, {
      y: 0,
      ease: "none",
      scrollTrigger: {
        trigger: spacerRef.current,
        start: "top top",
        end: "+=100vh",
        scrub: true,
      },
    });

    /* ---- RAF loop ---- */
    let rafId: number;
    const vh = () => window.innerHeight;

    const tick = () => {
      const scrollY = window.scrollY;
      const h = vh();

      /* ---- VIDEO SCRUB (desktop) ---- */
      if (!touchRef.current && lv && rv) {
        const w = window.innerWidth;
        const deadZone = Math.max(30, w * 0.05);
        const cx = w / 2;

        // Get current mouse position from cursor element
        const cursorEl = cursorRef.current;
        if (cursorEl) {
          const mouseX = parseFloat(cursorEl.style.left) || cx;

          if (mouseX < cx - deadZone) {
            // Left side of screen → show RIGHT video
            if (activeSideRef.current !== "right") {
              activeSideRef.current = "right";
              rv.style.display = "block";
              lv.style.display = "none";
            }
            const range = cx - deadZone;
            const dist = cx - deadZone - mouseX;
            const progress = Math.min(1, dist / range);
            if (!rv.seeking && rv.duration) {
              rv.currentTime = progress * rv.duration;
            }
          } else if (mouseX > cx + deadZone) {
            // Right side of screen → show LEFT video
            if (activeSideRef.current !== "left") {
              activeSideRef.current = "left";
              lv.style.display = "block";
              rv.style.display = "none";
            }
            const range = w - (cx + deadZone);
            const dist = mouseX - (cx + deadZone);
            const progress = Math.min(1, dist / range);
            if (!lv.seeking && lv.duration) {
              lv.currentTime = progress * lv.duration;
            }
          } else {
            // Dead zone — keep currentTime at 0
            const active = activeSideRef.current === "left" ? lv : rv;
            if (!active.seeking && active.duration) {
              active.currentTime = 0;
            }
          }
        }
      }

      /* ---- Hide video after first vh ---- */
      if (canvasRef.current) {
        canvasRef.current.style.visibility = scrollY > h ? "hidden" : "visible";
      }

      /* ---- CARD SCALING ---- */
      const cards = document.querySelectorAll<HTMLElement>(".bp-card");
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const top = rect.top;
        const bottom = rect.bottom;

        if (bottom <= 0 || top >= h) {
          card.style.transform = "scale(0)";
          return;
        }
        const enter = Math.min(1, (h - top) / (h * 0.6));
        const exit = Math.min(1, bottom / (h * 0.4));
        const s = Math.max(0, Math.min(enter, exit));
        card.style.transform = `scale(${s})`;
      });

      /* ---- GALLERY SCROLL ---- */
      const wrap = wrapRef.current;
      if (wrap) {
        const wrapHeight = wrap.scrollHeight;
        const maxScroll = wrapHeight - h;

        // Update spacer height
        if (spacerRef.current) {
          const totalHeight = h + maxScroll + 2 * h;
          spacerRef.current.style.height = `${totalHeight}px`;
        }

        if (scrollY > h) {
          const phase2scroll = scrollY - h;
          wrap.style.transform = `translateY(${-Math.min(phase2scroll, maxScroll)}px)`;

          /* ---- OUTRO ---- */
          const outroStart = h + maxScroll;
          if (scrollY > outroStart) {
            const outroProgress = Math.min(1, (scrollY - outroStart) / (h - 100));

            // White overlay
            if (overlayRef.current) overlayRef.current.style.opacity = `${outroProgress}`;

            // Product info slide up
            if (infoRef.current) {
              const offset = parseInt(infoRef.current.dataset.outroOffset || "166");
              infoRef.current.style.transform = `translateY(${-outroProgress * offset}px)`;
            }

            // Buy button scale
            if (buyRef.current) buyRef.current.style.transform = `scale(${outroProgress})`;

            // Footer
            if (footerRef.current) footerRef.current.style.opacity = `${outroProgress}`;
          } else {
            if (overlayRef.current) overlayRef.current.style.opacity = "0";
            if (infoRef.current) infoRef.current.style.transform = "translateY(0)";
            if (buyRef.current) buyRef.current.style.transform = "scale(0)";
            if (footerRef.current) footerRef.current.style.opacity = "0";
          }
        } else {
          wrap.style.transform = "translateY(0)";
        }
      }

      /* ---- CIRCLE SYMBOL ---- */
      if (circleSymbolRef.current) {
        const now = performance.now();
        if (now - lastSymbolTime.current > 80 && scrollY > 0) {
          lastSymbolTime.current = now;
          circleSymbolRef.current.textContent =
            CIRCLE_SYMBOLS[Math.floor(Math.random() * CIRCLE_SYMBOLS.length)];
        }
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", handleMouseMove);
      lv.removeEventListener("canplaythrough", onLeftReady);
      rv.removeEventListener("canplaythrough", onRightReady);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [handleMouseMove]);

  /* ------------------------------------------------------------------ */
  /*  RENDER                                                             */
  /* ------------------------------------------------------------------ */

  const ease = [0.25, 0.1, 0.25, 1] as const;

  return (
    <div
      id="scroll-spacer"
      ref={spacerRef}
      className="relative select-none bg-white"
      style={{
        height: "500vh",
        cursor: typeof window !== "undefined" && !isTouchDevice() ? "none" : "default",
        fontFamily: "'Inter Tight', sans-serif",
      }}
    >
      {/* ---- CUSTOM CURSOR ---- */}
      <div
        ref={cursorRef}
        className="fixed pointer-events-none z-50 mix-blend-exclusion hidden lg:block"
        style={{ transform: "translate(-50%, -50%)", left: "-100px", top: "-100px" }}
      >
        <CursorSVG />
      </div>

      {/* ---- LOGO ---- */}
      <motion.div
        className="fixed pointer-events-none z-20 mix-blend-exclusion"
        style={{
          width: "clamp(124px, 30vw, 355px)",
          top: "clamp(16px, 2vw, 32px)",
          left: "clamp(16px, 2vw, 32px)",
        }}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [...ease], delay: 0 }}
      >
        <LogoSVG />
      </motion.div>

      {/* ---- CAPTION ---- */}
      <motion.div
        className="fixed pointer-events-none z-20 mix-blend-exclusion text-white"
        style={{
          left: "clamp(16px, 2vw, 32px)",
          top: "clamp(118px, 20vw, 244px)",
          width: "clamp(calc(100vw - 32px), 50vw, 692px)",
          fontSize: "12px",
          lineHeight: "140%",
          letterSpacing: "-0.04em",
          fontWeight: 500,
        }}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [...ease], delay: 0.3 }}
      >
        When switching between videos near the center, do not reset currentTime to 0 abruptly.
        Add a small dead zone: if cursor is within +/-50px of center, keep both videos at
        currentTime = 0 and show whichever was last active.
      </motion.div>

      {/* ---- HEADER NAV ---- */}
      <motion.div
        className="fixed z-20 pointer-events-none mix-blend-exclusion flex items-center justify-between"
        style={{
          top: "clamp(16px, 2vw, 32px)",
          right: "clamp(16px, 2vw, 32px)",
          width: "clamp(auto, 20vw, 330px)",
          height: "30px",
        }}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [...ease], delay: 0.15 }}
      >
        <span
          className="hidden lg:block text-white uppercase"
          style={{ fontSize: "15px", fontWeight: 500, letterSpacing: "-0.02em" }}
        >
          ABOUT
        </span>
        <div className="flex items-center gap-5 lg:gap-[50px]">
          <HamburgerSVG className="w-6 h-6 lg:w-[30px] lg:h-[30px]" />
          <span
            className="text-white"
            style={{ fontSize: "clamp(13px, 1.2vw, 15px)", fontWeight: 500 }}
          >
            [ CART ]
          </span>
        </div>
      </motion.div>

      {/* ---- PRODUCT INFO ---- */}
      <motion.div
        id="outro-info"
        ref={infoRef}
        className="fixed pointer-events-none z-20 mix-blend-exclusion flex flex-col items-center"
        data-outro-offset="166"
        style={{
          right: "32px",
          bottom: "80px",
          width: "330px",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: [...ease], delay: 0.45 }}
      >
        {/* mobile override via media queries handled inline */}
        <div className="flex flex-col items-start w-full mb-8">
          {/* Circle icon */}
          <div className="relative" style={{ width: "30px", height: "30px" }}>
            <svg width="40" height="40" viewBox="0 0 40 40" className="absolute inset-0 w-full h-full">
              <circle cx="20" cy="20" r="18.75" stroke="white" strokeWidth="2.5" fill="none" />
            </svg>
            <span
              ref={circleSymbolRef}
              id="circle-symbol"
              className="absolute inset-0 flex items-center justify-center text-white uppercase"
              style={{ fontSize: "15px", fontWeight: 500, letterSpacing: "-0.04em" }}
            >
              8
            </span>
          </div>
          {/* Collection label */}
          <p
            className="text-white uppercase text-center mt-3"
            style={{
              fontSize: "clamp(20px, 2.5vw, 30px)",
              lineHeight: "100%",
              letterSpacing: "-0.04em",
              fontWeight: 500,
            }}
          >
            ARCHIVE COLLECTION
            <br />
            &ldquo;PROMPT&rdquo;
          </p>
        </div>
        {/* Price */}
        <p
          className="text-white text-center"
          style={{
            fontSize: "clamp(60px, 7vw, 80px)",
            lineHeight: "100%",
            letterSpacing: "-0.04em",
            fontWeight: 500,
          }}
        >
          $97,33
        </p>
      </motion.div>

      {/* ---- VIEW BUTTON ---- */}
      <div
        id="outro-buy"
        ref={buyRef}
        className="fixed pointer-events-none z-20 mix-blend-exclusion flex items-center justify-center"
        style={{
          right: "32px",
          bottom: "32px",
          width: "330px",
          height: "174px",
          background: "#fff",
          borderRadius: "1335px",
          transformOrigin: "right bottom",
          transform: "scale(0)",
        }}
      >
        <span
          className="mix-blend-exclusion text-white"
          style={{
            fontSize: "clamp(72px, 9vw, 110px)",
            fontWeight: 500,
            letterSpacing: "-0.04em",
          }}
        >
          view
        </span>
      </div>

      {/* ---- VIDEO CONTAINER ---- */}
      <div
        id="main-canvas"
        ref={canvasRef}
        className="fixed pointer-events-none overflow-hidden"
        style={{
          inset: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
          opacity: 0,
          transition: "opacity 0.3s ease",
        }}
      >
        <video
          ref={leftVideoRef}
          src={VIDEO_LEFT}
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ display: "none" }}
        />
        <video
          ref={rightVideoRef}
          src={VIDEO_RIGHT}
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ display: "block" }}
        />
      </div>

      {/* ---- WHITE OVERLAY ---- */}
      <div
        id="outro-overlay"
        ref={overlayRef}
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 12, background: "#fff", opacity: 0 }}
      />

      {/* ---- FOOTER ---- */}
      <div
        id="outro-footer"
        ref={footerRef}
        className="fixed pointer-events-none mix-blend-exclusion flex gap-20"
        style={{
          left: "16px",
          bottom: "clamp(24px, 3vw, 32px)",
          opacity: 0,
          zIndex: 20,
        }}
      >
        <span
          className="text-white uppercase"
          style={{ fontSize: "clamp(11px, 1vw, 13px)", fontWeight: 500, letterSpacing: "-0.02em" }}
        >
          PRMPT (R) 2026
        </span>
        <span
          className="text-white uppercase"
          style={{ fontSize: "clamp(11px, 1vw, 13px)", fontWeight: 500, letterSpacing: "-0.02em" }}
        >
          PRIVACY POLICY
        </span>
      </div>

      {/* ---- BLACK PANEL (GALLERY) ---- */}
      <div
        ref={panelRef}
        className="fixed inset-0"
        style={{ background: "#000", zIndex: 10, transform: "translateY(100vh)" }}
      >
        <div
          ref={wrapRef}
          style={{ width: "100%", paddingTop: "min(400px, 40vh)" }}
        >
          {/* Grid */}
          <div
            className="w-full"
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${cols}, 1fr)`,
              gap: 0,
            }}
          >
            {gridData.flatMap((row, ri) =>
              row.map((imgIndex, ci) => {
                const isLeft = ci < cols / 2;
                if (imgIndex === -1) {
                  return (
                    <div
                      key={`empty-${ri}-${ci}`}
                      style={{ aspectRatio: "2/3" }}
                    />
                  );
                }
                return (
                  <div
                    key={`card-${imgIndex}`}
                    className="bp-card"
                    style={{
                      aspectRatio: "2/3",
                      transformOrigin: isLeft ? "right bottom" : "left bottom",
                      transform: "scale(0)",
                      overflow: "hidden",
                    }}
                  >
                    <img
                      src={GALLERY_IMAGES[imgIndex]}
                      alt={`Archive piece ${imgIndex + 1}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                );
              })
            )}
          </div>

          {/* Extra space at bottom for outro scroll room */}
          <div style={{ height: "100vh" }} />
        </div>
      </div>
    </div>
  );
}
