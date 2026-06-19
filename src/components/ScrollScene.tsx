import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { VolumeX } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const chapters = ['Arrival', 'The noise', 'The hill', 'The sunset', 'Breathe'];

const noiseFragments = [
  { text: '17 unread', top: '18%', left: '8%', delay: '0s' },
  { text: 'reply?', top: '30%', right: '11%', delay: '-2s' },
  { text: 'keep scrolling', top: '55%', left: '13%', delay: '-4s' },
  { text: 'now • now • now', top: '69%', right: '16%', delay: '-1s' },
  { text: 'typing…', top: '82%', left: '31%', delay: '-3s' },
];

export function ScrollScene() {
  const rootRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const noiseRef = useRef<HTMLDivElement>(null);
  const cloudRef = useRef<HTMLDivElement>(null);
  const foregroundRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const activeChapterRef = useRef(0);
  const [activeChapter, setActiveChapter] = useState(0);
  const [videoFailed, setVideoFailed] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let lenis: Lenis | undefined;
    let animationFrame = 0;

    if (!reduceMotion) {
      lenis = new Lenis({
        duration: 1.35,
        smoothWheel: true,
        wheelMultiplier: 0.82,
        touchMultiplier: 1.1,
      });

      lenis.on('scroll', ScrollTrigger.update);
      const raf = (time: number) => {
        lenis?.raf(time);
        animationFrame = requestAnimationFrame(raf);
      };
      animationFrame = requestAnimationFrame(raf);
    }

    const context = gsap.context(() => {
      const sections = gsap.utils.toArray<HTMLElement>('[data-chapter]');
      const reveals = gsap.utils.toArray<HTMLElement>('[data-reveal]');

      gsap.set(reveals, { autoAlpha: 0, y: 42 });
      gsap.to(reveals[0], {
        autoAlpha: 1,
        y: 0,
        duration: reduceMotion ? 0 : 1.7,
        delay: reduceMotion ? 0 : 0.25,
        ease: 'power3.out',
      });

      reveals.slice(1).forEach((element) => {
        gsap.to(element, {
          autoAlpha: 1,
          y: 0,
          duration: reduceMotion ? 0 : 1.4,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 78%',
            end: 'top 48%',
            scrub: reduceMotion ? false : 1.25,
          },
        });
      });

      if (!reduceMotion) {
        gsap.to(mediaRef.current, {
          scale: 1.13,
          yPercent: -2.5,
          ease: 'none',
          scrollTrigger: {
            trigger: root,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 2.5,
          },
        });

        gsap.to(cloudRef.current, {
          xPercent: 7,
          yPercent: -10,
          ease: 'none',
          scrollTrigger: {
            trigger: root,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 3,
          },
        });

        gsap.to(foregroundRef.current, {
          yPercent: -7,
          ease: 'none',
          scrollTrigger: {
            trigger: root,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 2.2,
          },
        });

        gsap.to(noiseRef.current, {
          autoAlpha: 0,
          scale: 1.04,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sections[2],
            start: 'top 90%',
            end: 'top 35%',
            scrub: 1.7,
          },
        });

        gsap.to(glowRef.current, {
          opacity: 0.72,
          ease: 'none',
          scrollTrigger: {
            trigger: sections[3],
            start: 'top bottom',
            end: 'center center',
            scrub: 2,
          },
        });
      }

      ScrollTrigger.create({
        trigger: root,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self: { progress: number }) => {
          if (progressRef.current) {
            progressRef.current.style.transform = `scaleY(${self.progress})`;
          }
          const nextChapter = Math.min(chapters.length - 1, Math.floor(self.progress * chapters.length));
          if (nextChapter !== activeChapterRef.current) {
            activeChapterRef.current = nextChapter;
            setActiveChapter(nextChapter);
          }
        },
      });
    }, root);

    ScrollTrigger.refresh();

    return () => {
      context.revert();
      lenis?.destroy();
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  const scrollToChapter = (index: number) => {
    document.querySelector<HTMLElement>(`[data-chapter="${index}"]`)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  const restart = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <div ref={rootRef} className="quiet-story">
      <div className="fixed inset-0 overflow-hidden bg-[#160d08]" aria-hidden="true">
        <div ref={mediaRef} className="absolute inset-[-3%] will-change-transform">
          <img
            src="/quiet-place.jpg"
            alt=""
            className="h-full w-full object-cover"
          />
          {!videoFailed ? (
            <video
              ref={videoRef}
              className="absolute inset-0 h-full w-full object-cover"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              poster="/quiet-place.jpg"
              onError={() => setVideoFailed(true)}
            >
              <source src="/watermark-removed-w.mp4" type="video/mp4" />
            </video>
          ) : null}
        </div>

        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(13,8,5,.77)_0%,rgba(13,8,5,.32)_48%,rgba(13,8,5,.12)_72%,rgba(13,8,5,.5)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,5,3,.46)_0%,transparent_38%,rgba(8,5,3,.16)_64%,rgba(8,5,3,.7)_100%)]" />
        <div ref={glowRef} className="sunset-glow absolute inset-0 opacity-20" />
        <div ref={cloudRef} className="cloud-haze absolute inset-[-10%] will-change-transform" />
        <div ref={foregroundRef} className="foreground-vignette absolute inset-0 will-change-transform" />
        <div className="film-grain absolute inset-0 opacity-[0.09]" />
      </div>

      <button
        type="button"
        aria-label="Sound is off"
        className="fixed right-5 top-5 z-40 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/10 text-[#fff2df]/80 backdrop-blur-md sm:right-8 sm:top-8"
      >
        <VolumeX size={16} strokeWidth={1.5} />
      </button>

      <aside className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 items-center gap-4 lg:flex">
        <div className="relative h-36 w-px bg-white/20">
          <div
            ref={progressRef}
            className="absolute inset-0 origin-top bg-[#f6d3a5]"
            style={{ transform: 'scaleY(0)' }}
          />
          <div className="absolute inset-0 flex flex-col justify-between">
            {chapters.map((chapter, index) => (
              <button
                key={chapter}
                type="button"
                onClick={() => scrollToChapter(index)}
                aria-label={`Go to ${chapter}`}
                className={`-ml-[3px] h-[7px] w-[7px] rounded-full border transition-all duration-500 ${
                  index <= activeChapter
                    ? 'scale-100 border-[#f6d3a5] bg-[#f6d3a5]'
                    : 'scale-75 border-white/45 bg-[#26150d]'
                }`}
              />
            ))}
          </div>
        </div>
        <span className="w-5 font-sans text-[9px] tracking-[0.24em] text-white/55 [writing-mode:vertical-rl]">
          0{activeChapter + 1} / 05
        </span>
      </aside>

      <main className="relative z-10">
        <section
          data-chapter="0"
          className="chapter chapter-hero flex min-h-[100svh] items-end px-6 pb-[12vh] pt-28 sm:px-12 lg:px-[9vw]"
        >
          <div data-reveal className="max-w-4xl">
            <h1 className="font-display text-[clamp(4rem,10vw,9.75rem)] font-normal leading-[0.82] tracking-[-0.06em] text-[#fff3df]">
              The Last
              <span className="block italic text-[#efb778]">Quiet Place</span>
            </h1>
            <div className="mt-8 flex max-w-xl flex-col items-start gap-7 border-l border-[#f4cf9c]/45 pl-5 sm:mt-10 sm:pl-7">
              <p className="text-balance text-base font-light leading-relaxed text-[#fff2df]/78 sm:text-lg">
                Sometimes, the world gets too loud. So we find one quiet place.
              </p>
              <button type="button" onClick={() => scrollToChapter(1)} className="story-button">
                <span>Begin the Journey</span>
                <span aria-hidden="true">↓</span>
              </button>
            </div>
          </div>
          <p className="absolute bottom-7 left-1/2 -translate-x-1/2 font-sans text-[9px] uppercase tracking-[0.32em] text-white/45">
            Scroll slowly
          </p>
        </section>

        <section
          data-chapter="1"
          className="chapter relative flex min-h-[120svh] items-center px-6 py-24 sm:px-12 lg:px-[9vw]"
        >
          <div ref={noiseRef} className="pointer-events-none absolute inset-0">
            <div className="noise-lines absolute inset-0" />
            {noiseFragments.map(({ text, delay, ...position }) => (
              <span
                key={text}
                className="noise-fragment absolute font-sans text-[10px] uppercase tracking-[0.24em] text-white/35"
                style={{ ...position, animationDelay: delay }}
              >
                {text}
              </span>
            ))}
          </div>
          <div data-reveal className="relative max-w-4xl">
            <p className="font-sans text-[10px] uppercase tracking-[0.36em] text-[#e7b77d]/70">The noise</p>
            <h2 className="mt-5 max-w-4xl font-display text-[clamp(3.1rem,7.5vw,7.75rem)] leading-[0.95] tracking-[-0.045em] text-[#fff3df]">
              We keep moving.
              <span className="block text-[#fff3df]/58">Scrolling. Replying. Chasing.</span>
            </h2>
          </div>
        </section>

        <section
          data-chapter="2"
          className="chapter flex min-h-[115svh] items-center justify-end px-6 py-24 sm:px-12 lg:px-[12vw]"
        >
          <div data-reveal className="max-w-3xl text-right">
            <p className="font-sans text-[10px] uppercase tracking-[0.36em] text-[#e7b77d]/70">The hill</p>
            <h2 className="mt-5 font-display text-[clamp(3.25rem,7.5vw,7.5rem)] leading-[0.95] tracking-[-0.045em] text-[#fff3df]">
              Above all of it,
              <span className="block italic text-[#efbd82]">there is still silence.</span>
            </h2>
          </div>
        </section>

        <section
          data-chapter="3"
          className="chapter flex min-h-[115svh] items-end px-6 pb-[16vh] pt-24 sm:px-12 lg:px-[9vw]"
        >
          <div data-reveal className="max-w-4xl">
            <p className="font-sans text-[10px] uppercase tracking-[0.36em] text-[#ffd19b]/70">The sunset</p>
            <h2 className="mt-5 font-display text-[clamp(3.5rem,8vw,8rem)] leading-[0.92] tracking-[-0.05em] text-[#fff3df]">
              Not everything
              <span className="block italic text-[#efb778]">needs to be rushed.</span>
            </h2>
          </div>
        </section>

        <section
          data-chapter="4"
          className="chapter flex min-h-[100svh] items-center justify-center px-6 py-24 text-center"
        >
          <div data-reveal className="max-w-4xl">
            <p className="font-display text-[clamp(3.5rem,8vw,8rem)] leading-[0.95] tracking-[-0.045em] text-[#fff3df]">
              Stay for a while.
              <span className="block italic text-[#efb778]">Breathe.</span>
              <span className="block text-[#fff3df]/72">Then continue.</span>
            </p>
            <button type="button" onClick={restart} className="story-button mx-auto mt-12">
              <span>Restart</span>
              <span aria-hidden="true">↑</span>
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
