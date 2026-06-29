import { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown, ArrowUp } from 'lucide-react';

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
    heading: 'The air opens.',
    accent: 'Everything below starts to soften.',
    align: 'left',
    showFragments: true,
  },
  {
    title: 'The Ascent',
    heading: 'We move higher,',
    accent: 'toward the calm.',
    align: 'right',
  },
  {
    title: 'Still Above',
    heading: 'A place suspended,',
    accent: 'bright enough to pause.',
    align: 'left',
  },
  {
    title: 'Second Light',
    heading: 'The world changes color.',
    accent: 'Another horizon begins to breathe.',
    align: 'right',
  },
  {
    title: 'The Passage',
    heading: 'We cross through brightness,',
    accent: 'slow enough to feel it pass.',
    align: 'left',
  },
  {
    title: 'Beyond the Rise',
    heading: 'Past the first quiet,',
    accent: 'there is more sky.',
    align: 'right',
  },
  {
    title: 'Return',
    heading: 'Stay in the light.',
    accent: 'Then return when you are ready.',
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

export function HeavenneScrollScene() {
  const rootRef = useRef<HTMLElement | null>(null);
  const pinRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);
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
    let targetTime = 0;
    let smoothedTime = 0;
    let rafId = 0;

    video.pause();

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

    const smoothSeek = () => {
      if (!video.duration || !Number.isFinite(video.duration)) {
        rafId = requestAnimationFrame(smoothSeek);
        return;
      }

      smoothedTime += (targetTime - smoothedTime) * 0.12;

      if (Math.abs(video.currentTime - smoothedTime) > 0.025) {
        video.currentTime = smoothedTime;
      }

      rafId = requestAnimationFrame(smoothSeek);
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
      targetTime = 0;
      smoothedTime = 0;

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
          targetTime = self.progress * video.duration;
          textTimelineRef.current?.progress(self.progress);
          updateChapterProgress(self.progress);
        },
      });

      rafId = requestAnimationFrame(smoothSeek);
      ScrollTrigger.refresh();
    };

    if (video.readyState >= 1) {
      setupScrollVideo();
    } else {
      video.addEventListener('loadedmetadata', setupScrollVideo, { once: true });
    }

    return () => {
      cancelAnimationFrame(rafId);
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

  const restart = () => scrollToChapter(0);
  const progressLabel = `${String(activeChapter + 1).padStart(2, '0')} / ${String(chapters.length).padStart(2, '0')}`;

  return (
    <section ref={rootRef} className="heavenne-story scroll-content relative min-h-[650vh] overflow-hidden bg-[#090b10]">
      <div ref={pinRef} className="video-pin relative h-screen overflow-hidden bg-[#090b10]">
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          muted
          playsInline
          preload="auto"
          poster="/poster.jpg"
        >
          <source src="/videos/scroll-video.mp4" type="video/mp4" />
        </video>

        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(4,6,10,.76)_0%,rgba(4,7,12,.35)_47%,rgba(4,7,12,.13)_72%,rgba(4,6,10,.5)_100%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(4,6,10,.42)_0%,transparent_38%,rgba(5,7,12,.18)_64%,rgba(4,6,10,.74)_100%)]" />
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
          <span className="w-5 font-sans text-[9px] uppercase tracking-[0.24em] text-white/55 [writing-mode:vertical-rl]">
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
                        className="light-fragment absolute font-sans text-[10px] uppercase tracking-[0.24em] text-white/38"
                        style={{ ...position, animationDelay: delay }}
                      >
                        {text}
                      </span>
                    ))}
                  </div>
                ) : null}

                {chapter.isHero ? (
                  <div className="max-w-4xl">
                    <h1 className="font-display text-[clamp(4.15rem,11vw,10.5rem)] font-normal leading-[0.82] tracking-[-0.055em] text-[#f8f4eb]">
                      {chapter.heading}
                    </h1>
                    <div className="mt-8 flex max-w-xl flex-col items-start gap-7 border-l border-[#d9f0ff]/45 pl-5 sm:mt-10 sm:pl-7">
                      <p className="text-balance text-base font-light leading-relaxed text-[#f6f2e8]/78 sm:text-lg">
                        A video-led ascent through a quiet world above the noise.
                      </p>
                      <button type="button" onClick={() => scrollToChapter(1)} className="story-button">
                        <span>Begin the Journey</span>
                        <ArrowDown size={15} strokeWidth={1.5} aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                ) : chapter.isFinal ? (
                  <div className="max-w-4xl">
                    <p className="font-display text-[clamp(3.5rem,8vw,8rem)] leading-[0.95] tracking-[-0.045em] text-[#f8f4eb]">
                      {chapter.heading}
                      <span className="block italic text-[#d9f0ff]">{chapter.accent}</span>
                      <span className="block text-[#f8f4eb]/72">The second light is now part of the path.</span>
                    </p>
                    <button type="button" onClick={restart} className="story-button mx-auto mt-12">
                      <span>Restart</span>
                      <ArrowUp size={15} strokeWidth={1.5} aria-hidden="true" />
                    </button>
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
                  <p className="absolute bottom-7 left-1/2 -translate-x-1/2 font-sans text-[9px] uppercase tracking-[0.32em] text-white/45">
                    Scroll to move the scene
                  </p>
                ) : null}
              </section>
            );
          })}
        </main>
      </div>
    </section>
  );
}

