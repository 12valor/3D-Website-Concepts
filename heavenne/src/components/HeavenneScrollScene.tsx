import { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown, ArrowRight, ArrowUp, Compass, Flame, PenLine, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

type Chapter = {
  title: string;
  heading: string;
  accent: string;
  align: 'left' | 'right' | 'center';
  showFragments?: boolean;
  isHero?: boolean;
  isFinal?: boolean;
};

const chapters: Chapter[] = [
  {
    title: 'Heavenne',
    heading: 'Heavenne',
    accent: '',
    align: 'left',
    isHero: true,
  },
  {
    title: 'First Light',
    heading: 'Step into the hush.',
    accent: 'The world below begins to soften.',
    align: 'left',
    showFragments: true,
  },
  {
    title: 'The Ascent',
    heading: 'Rise through light,',
    accent: 'one breath at a time.',
    align: 'right',
  },
  {
    title: 'The Candle',
    heading: 'Leave a small flame,',
    accent: 'for someone you carry.',
    align: 'left',
  },
  {
    title: 'The Reflection',
    heading: 'Name what is heavy.',
    accent: 'Let the light hold it gently.',
    align: 'right',
  },
  {
    title: 'The Garden',
    heading: 'Move through the quiet,',
    accent: 'until the sky feels near.',
    align: 'left',
  },
  {
    title: 'The Gate',
    heading: 'A sanctuary opens,',
    accent: 'soft enough to enter.',
    align: 'right',
  },
  {
    title: 'Enter',
    heading: 'Begin inside the light.',
    accent: 'The first sanctuary is ready.',
    align: 'center',
    isFinal: true,
  },
];

const lightFragments = [
  { text: 'soft horizon', top: '18%', left: '8%', delay: '0s' },
  { text: 'hold still', top: '32%', right: '12%', delay: '-2s' },
  { text: 'rise slowly', top: '56%', left: '13%', delay: '-4s' },
  { text: 'above the noise', top: '70%', right: '15%', delay: '-1s' },
  { text: 'breathe here', top: '82%', left: '31%', delay: '-3s' },
];

const mvpFeatures = [
  {
    title: 'Light a Candle',
    description: 'Create a small glowing tribute that stays visible in the sanctuary.',
    icon: Flame,
  },
  {
    title: 'Leave a Reflection',
    description: 'Write a private message, prayer, memory, or thought without leaving the page.',
    icon: PenLine,
  },
  {
    title: 'Guided Ascent',
    description: 'Move through a short calming journey that pairs motion, light, and gentle prompts.',
    icon: Compass,
  },
];

export function HeavenneScrollScene() {
  const rootRef = useRef<HTMLElement | null>(null);
  const pinRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);
  const mvpRef = useRef<HTMLElement | null>(null);
  const activeChapterRef = useRef(0);
  const scrollTriggerRef = useRef<ReturnType<typeof ScrollTrigger.create> | null>(null);
  const textTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const [activeChapter, setActiveChapter] = useState(0);

  useLayoutEffect(() => {
    const root = rootRef.current;
    const pin = pinRef.current;
    const video = videoRef.current;
    if (!root || !pin || !video) return;

    let context: gsap.Context | undefined;
    let initialized = false;
    let pauseTimer = window.setTimeout(() => undefined, 0);

    video.pause();

    const pauseScrollVideo = () => {
      window.clearTimeout(pauseTimer);
      video.pause();
    };

    const playScrollVideo = () => {
      window.clearTimeout(pauseTimer);

      if (video.ended || (video.duration && video.currentTime >= video.duration - 0.08)) {
        video.currentTime = 0;
      }

      if (video.paused) {
        video.play().catch(() => {
          video.pause();
        });
      }

      pauseTimer = window.setTimeout(() => {
        video.pause();
      }, 220);
    };

    const updateChapterProgress = (progress: number) => {
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleY(${progress})`;
      }

      const nextChapter = Math.min(
        chapters.length - 1,
        Math.floor(progress * chapters.length),
      );

      if (nextChapter !== activeChapterRef.current) {
        activeChapterRef.current = nextChapter;
        setActiveChapter(nextChapter);
      }
    };

    const setupScrollVideo = () => {
      if (
        initialized ||
        video.readyState < 1 ||
        !Number.isFinite(video.duration) ||
        video.duration <= 0
      ) return;

      initialized = true;
      video.pause();
      video.currentTime = 0;

      context = gsap.context(() => {
        const sceneTexts = gsap.utils.toArray<HTMLElement>('[data-chapter-scene]');
        const textTimeline = gsap.timeline({ paused: true, defaults: { ease: 'power2.out' } });

        gsap.set(sceneTexts, { autoAlpha: 0, y: 44, pointerEvents: 'none' });
        gsap.set(sceneTexts[0], { autoAlpha: 1, y: 0, pointerEvents: 'auto' });

        sceneTexts.forEach((scene, index) => {
          if (index === 0) return;

          textTimeline
            .to(sceneTexts[index - 1], { autoAlpha: 0, y: -40, duration: 0.45, pointerEvents: 'none' }, index - 0.55)
            .to(scene, { autoAlpha: 1, y: 0, duration: 0.6, pointerEvents: 'auto' }, index - 0.25);
        });

        textTimelineRef.current = textTimeline;
      }, root);

      scrollTriggerRef.current = ScrollTrigger.create({
        trigger: root,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        pin,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self: { progress: number }) => {
          textTimelineRef.current?.progress(self.progress);
          updateChapterProgress(self.progress);
          playScrollVideo();
        },
        onLeave: pauseScrollVideo,
        onLeaveBack: () => {
          video.currentTime = 0;
          pauseScrollVideo();
          textTimelineRef.current?.progress(0);
          updateChapterProgress(0);
        },
      });

      ScrollTrigger.refresh();
    };

    if (video.readyState >= 1) {
      setupScrollVideo();
    } else {
      video.addEventListener('loadedmetadata', setupScrollVideo, { once: true });
    }

    return () => {
      window.clearTimeout(pauseTimer);
      video.pause();
      video.removeEventListener('loadedmetadata', setupScrollVideo);
      scrollTriggerRef.current?.kill();
      scrollTriggerRef.current = null;
      textTimelineRef.current?.kill();
      textTimelineRef.current = null;
      context?.revert();
    };
  }, []);

  const scrollToChapter = (index: number) => {
    const trigger = scrollTriggerRef.current;
    if (!trigger) return;

    const progress = chapters.length <= 1 ? 0 : index / (chapters.length - 1);
    const target = trigger.start + (trigger.end - trigger.start) * progress;
    window.scrollTo({ top: target, behavior: 'smooth' });
  };

  const restart = () => {
    const video = videoRef.current;
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
    scrollToChapter(0);
  };

  const scrollToMvp = () => {
    mvpRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const progressLabel = `${String(activeChapter + 1).padStart(2, '0')} / ${String(chapters.length).padStart(2, '0')}`;

  return (
    <>
      <section ref={rootRef} className="heavenne-story scroll-content relative min-h-[650vh] overflow-hidden bg-[#090b10]">
        <div ref={pinRef} className="video-pin relative h-screen overflow-hidden bg-[#090b10]">
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover"
            muted
            loop
            playsInline
            preload="auto"
            poster="/poster.jpg"
          >
            <source src="/videos/scroll-video.mp4" type="video/mp4" />
          </video>

          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(4,6,10,.72)_0%,rgba(4,7,12,.34)_48%,rgba(4,7,12,.1)_72%,rgba(4,6,10,.52)_100%)]" />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(4,6,10,.4)_0%,transparent_38%,rgba(5,7,12,.16)_64%,rgba(4,6,10,.78)_100%)]" />
          <div className="heavenne-glow pointer-events-none absolute inset-0 opacity-25" />
          <div className="heavenne-haze pointer-events-none absolute inset-0" />
          <div className="heavenne-vignette pointer-events-none absolute inset-0" />
          <div className="film-grain pointer-events-none absolute inset-0 opacity-[0.08]" />

          <aside className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 items-center gap-4 lg:flex">
            <div className="relative h-44 w-px bg-white/20">
              <div
                ref={progressRef}
                className="absolute inset-0 origin-top bg-[#d9f0ff]"
                style={{ transform: 'scaleY(0)' }}
              />
              <div className="absolute inset-0 flex flex-col justify-between">
                {chapters.map((chapter, index) => (
                  <button
                    key={chapter.title}
                    type="button"
                    onClick={() => scrollToChapter(index)}
                    aria-label={`Go to ${chapter.title}`}
                    className={`-ml-[3px] h-[7px] w-[7px] rounded-full border transition-all duration-500 ${
                      index <= activeChapter
                        ? 'scale-100 border-[#d9f0ff] bg-[#d9f0ff]'
                        : 'scale-75 border-white/45 bg-[#0e121b]'
                    }`}
                  />
                ))}
              </div>
            </div>
            <span className="w-5 font-sans text-[9px] uppercase text-white/55 [writing-mode:vertical-rl]">
              {progressLabel}
            </span>
          </aside>

          <main className="relative z-10 h-full">
            {chapters.map((chapter, index) => {
              const alignClass = chapter.align === 'right'
                ? 'items-center justify-end text-right lg:px-[12vw]'
                : chapter.align === 'center'
                  ? 'items-center justify-center text-center'
                  : 'items-center justify-start text-left lg:px-[9vw]';
              const heroClass = chapter.isHero ? 'chapter-hero items-end pb-[12vh] pt-28 lg:px-[9vw]' : `${alignClass} py-24`;

              return (
                <section
                  key={chapter.title}
                  data-chapter-scene={index}
                  className={`chapter scene-text absolute inset-0 flex px-6 sm:px-12 ${heroClass}`}
                >
                  {chapter.showFragments ? (
                    <div className="pointer-events-none absolute inset-0">
                      <div className="light-lines absolute inset-0" />
                      {lightFragments.map(({ text, delay, ...position }) => (
                        <span
                          key={text}
                          className="light-fragment absolute font-sans text-[10px] uppercase text-white/38"
                          style={{ ...position, animationDelay: delay }}
                        >
                          {text}
                        </span>
                      ))}
                    </div>
                  ) : null}

                  {chapter.isHero ? (
                    <div className="max-w-4xl">
                      <h1 className="hero-title font-display font-normal text-[#f8f4eb]">
                        {chapter.heading}
                      </h1>
                      <div className="mt-8 flex max-w-xl flex-col items-start gap-7 border-l border-[#d9f0ff]/45 pl-5 sm:mt-10 sm:pl-7">
                        <p className="text-balance text-base font-light leading-relaxed text-[#f6f2e8]/78 sm:text-lg">
                          A cinematic digital sanctuary for lighting a candle, leaving a reflection, and moving through calm.
                        </p>
                        <div className="flex flex-col gap-3 sm:flex-row">
                          <button type="button" onClick={() => scrollToChapter(1)} className="story-button">
                            <span>Begin the Journey</span>
                            <ArrowDown size={15} strokeWidth={1.5} aria-hidden="true" />
                          </button>
                          <button type="button" onClick={scrollToMvp} className="story-button story-button--warm">
                            <span>View MVP</span>
                            <Sparkles size={15} strokeWidth={1.5} aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : chapter.isFinal ? (
                    <div className="max-w-4xl">
                      <p className="final-heading font-display text-[#f8f4eb]">
                        {chapter.heading}
                        <span className="block italic text-[#d9f0ff]">{chapter.accent}</span>
                        <span className="block text-[#f8f4eb]/72">Continue into the MVP sanctuary below.</span>
                      </p>
                      <div className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row">
                        <button type="button" onClick={scrollToMvp} className="story-button">
                          <span>Enter the Sanctuary</span>
                          <ArrowDown size={15} strokeWidth={1.5} aria-hidden="true" />
                        </button>
                        <button type="button" onClick={restart} className="story-button story-button--ghost">
                          <span>Restart</span>
                          <ArrowUp size={15} strokeWidth={1.5} aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="relative max-w-4xl">
                      <p className="chapter-label">{chapter.title}</p>
                      <h2 className="chapter-heading">
                        {chapter.heading}
                        <span className={`block ${chapter.align === 'right' || index >= 4 ? 'italic text-[#d9f0ff]' : 'text-[#f8f4eb]/58'}`}>
                          {chapter.accent}
                        </span>
                      </h2>
                    </div>
                  )}

                  {chapter.isHero ? (
                    <p className="absolute bottom-7 left-1/2 -translate-x-1/2 font-sans text-[9px] uppercase text-white/45">
                      Scroll to play the scene
                    </p>
                  ) : null}
                </section>
              );
            })}
          </main>
        </div>
      </section>

      <section ref={mvpRef} id="mvp" className="mvp-section">
        <div className="mvp-shell">
          <div className="mvp-preview" aria-label="Heavenne sanctuary preview">
            <video
              className="mvp-preview__video"
              muted
              loop
              playsInline
              autoPlay
              preload="metadata"
              poster="/poster.jpg"
            >
              <source src="/videos/scroll-video.mp4" type="video/mp4" />
            </video>
            <div className="mvp-preview__shade" aria-hidden="true" />
            <div className="mvp-preview__content">
              <Sparkles size={18} strokeWidth={1.4} aria-hidden="true" />
              <span>Sanctuary preview</span>
            </div>
            <div className="candle-field" aria-hidden="true">
              <span />
              <span />
              <span />
              <span />
            </div>
          </div>

          <div className="mvp-content">
            <p className="mvp-label">MVP</p>
            <h2>A small sanctuary people can feel in one visit.</h2>
            <p className="mvp-summary">
              Heavenne starts with a focused emotional loop: arrive, slow down, leave something gentle, and continue lighter than before.
            </p>

            <div className="mvp-feature-list">
              {mvpFeatures.map(({ title, description, icon: Icon }) => (
                <article key={title} className="mvp-feature">
                  <span className="mvp-feature__icon">
                    <Icon size={20} strokeWidth={1.35} aria-hidden="true" />
                  </span>
                  <div>
                    <h3>{title}</h3>
                    <p>{description}</p>
                  </div>
                </article>
              ))}
            </div>

            <button type="button" onClick={restart} className="mvp-cta">
              <span>Enter the Sanctuary</span>
              <ArrowRight size={16} strokeWidth={1.5} aria-hidden="true" />
            </button>
          </div>
        </div>
      </section>
    </>
  );
}