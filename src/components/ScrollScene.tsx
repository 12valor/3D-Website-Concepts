import { useCallback, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { Check, Copy, Pause, Terminal } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const chapters = ['Install', 'Scroll sync', 'Dashboard', 'Variants', 'Commands', 'Quiet'];

const variants = [
  { name: 'snoopy-sunset', version: '1.4.2', description: 'Warm cinematic sunset mode for slower endings.', accent: '#efb778' },
  { name: 'snoopy-focus', version: '2.1.0', description: 'A quiet focus mode with the noise turned down.', accent: '#d9c39f' },
  { name: 'snoopy-dream', version: '0.9.8', description: 'Soft dreamy parallax for wandering thoughts.', accent: '#d9b7ca' },
  { name: 'snoopy-night', version: '1.2.6', description: 'Darker night calm for the very late hours.', accent: '#9da7c7' },
];

const commands = [
  { command: 'npx snoopy', note: 'Start the default quiet session.' },
  { command: 'npx snoopy --breathe', note: 'Open a guided breathing moment.' },
  { command: 'npx snoopy --dashboard', note: 'View the calm session dashboard.' },
  { command: 'npx snoopy --variant sunset', note: 'Run the warm sunset variant.' },
];

const dashboardStats = [
  { label: 'Mood', value: 'Calm' },
  { label: 'Noise Level', value: 'Low' },
  { label: 'Session Time', value: '02:48' },
  { label: 'Scroll Sync', value: 'Active' },
];

export function ScrollScene() {
  const rootRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const cloudRef = useRef<HTMLDivElement>(null);
  const foregroundRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const activeChapterRef = useRef(0);
  const videoDurationRef = useRef(0);
  const scrollProgressRef = useRef(0);
  const seekFrameRef = useRef(0);
  const [activeChapter, setActiveChapter] = useState(0);
  const [videoFailed, setVideoFailed] = useState(false);
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null);

  const seekVideo = useCallback((progress: number) => {
    scrollProgressRef.current = progress;
    const video = videoRef.current;
    const duration = videoDurationRef.current;
    if (!video || !duration || !Number.isFinite(duration)) return;

    cancelAnimationFrame(seekFrameRef.current);
    seekFrameRef.current = requestAnimationFrame(() => {
      const targetTime = Math.min(duration - 0.04, Math.max(0, progress * duration));
      if (Math.abs(video.currentTime - targetTime) > 0.01) video.currentTime = targetTime;
      video.pause();
    });
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let lenis: Lenis | undefined;
    let animationFrame = 0;

    if (!reduceMotion) {
      lenis = new Lenis({ duration: 1.15, smoothWheel: true, wheelMultiplier: 0.86, touchMultiplier: 1.05 });
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
          scrollTrigger: { trigger: element, start: 'top 82%', end: 'top 54%', scrub: reduceMotion ? false : 1.1 },
        });
      });

      if (!reduceMotion) {
        gsap.to(mediaRef.current, {
          scale: 1.1,
          yPercent: -2,
          ease: 'none',
          scrollTrigger: { trigger: root, start: 'top top', end: 'bottom bottom', scrub: 2.5 },
        });
        gsap.to(cloudRef.current, {
          xPercent: 7,
          yPercent: -10,
          ease: 'none',
          scrollTrigger: { trigger: root, start: 'top top', end: 'bottom bottom', scrub: 3 },
        });
        gsap.to(foregroundRef.current, {
          yPercent: -7,
          ease: 'none',
          scrollTrigger: { trigger: root, start: 'top top', end: 'bottom bottom', scrub: 2.2 },
        });
        gsap.to(glowRef.current, {
          opacity: 0.72,
          ease: 'none',
          scrollTrigger: { trigger: sections[4], start: 'top bottom', end: 'center center', scrub: 2 },
        });
      }

      ScrollTrigger.create({
        trigger: root,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self: { progress: number }) => {
          seekVideo(self.progress);
          if (progressRef.current) progressRef.current.style.transform = `scaleY(${self.progress})`;
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
      cancelAnimationFrame(seekFrameRef.current);
    };
  }, [seekVideo]);

  const scrollToChapter = (index: number) => {
    document.querySelector<HTMLElement>(`[data-chapter="${index}"]`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const copyCommand = async (command: string) => {
    await navigator.clipboard?.writeText(command);
    setCopiedCommand(command);
    window.setTimeout(() => setCopiedCommand(null), 1600);
  };

  const restart = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <div ref={rootRef} className="quiet-story">
      <div className="fixed inset-0 overflow-hidden bg-[#160d08]" aria-hidden="true">
        <div ref={mediaRef} className="absolute inset-[-3%] will-change-transform">
          <img src="/quiet-place.jpg" alt="" className="h-full w-full object-cover" />
          {!videoFailed ? (
            <video
              ref={videoRef}
              className="absolute inset-0 h-full w-full object-cover"
              muted
              playsInline
              preload="auto"
              poster="/quiet-place.jpg"
              onLoadedMetadata={(event) => {
                const video = event.currentTarget;
                video.pause();
                videoDurationRef.current = video.duration;
                seekVideo(scrollProgressRef.current);
              }}
              onPlay={(event) => event.currentTarget.pause()}
              onError={() => setVideoFailed(true)}
              data-testid="scroll-video"
            >
              <source src="/watermark-removed-w.mp4" type="video/mp4" />
            </video>
          ) : null}
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(13,8,5,.78)_0%,rgba(13,8,5,.35)_48%,rgba(13,8,5,.14)_72%,rgba(13,8,5,.55)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,5,3,.48)_0%,transparent_38%,rgba(8,5,3,.18)_64%,rgba(8,5,3,.74)_100%)]" />
        <div ref={glowRef} className="sunset-glow absolute inset-0 opacity-20" />
        <div ref={cloudRef} className="cloud-haze absolute inset-[-10%] will-change-transform" />
        <div ref={foregroundRef} className="foreground-vignette absolute inset-0 will-change-transform" />
        <div className="film-grain absolute inset-0 opacity-[0.09]" />
      </div>

      <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-5 sm:px-9 sm:py-7">
        <button type="button" onClick={restart} className="package-mark" aria-label="Back to snoopy home">
          <span className="package-mark__icon">s</span>
          <span>snoopy</span>
        </button>
        <div className="scroll-status" aria-label="Video is paused and synced to scroll">
          <Pause size={12} fill="currentColor" strokeWidth={1.5} />
          <span>scroll synced</span>
        </div>
      </header>

      <aside className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 items-center gap-4 lg:flex">
        <div className="relative h-44 w-px bg-white/20">
          <div ref={progressRef} className="absolute inset-0 origin-top bg-[#f6d3a5]" style={{ transform: 'scaleY(0)' }} />
          <div className="absolute inset-0 flex flex-col justify-between">
            {chapters.map((chapter, index) => (
              <button
                key={chapter}
                type="button"
                onClick={() => scrollToChapter(index)}
                aria-label={`Go to ${chapter}`}
                className={`-ml-[3px] h-[7px] w-[7px] rounded-full border transition-all duration-500 ${
                  index <= activeChapter ? 'scale-100 border-[#f6d3a5] bg-[#f6d3a5]' : 'scale-75 border-white/45 bg-[#26150d]'
                }`}
              />
            ))}
          </div>
        </div>
        <span className="w-5 font-sans text-[9px] tracking-[0.24em] text-white/55 [writing-mode:vertical-rl]">
          0{activeChapter + 1} / 06
        </span>
      </aside>

      <main className="relative z-10">
        <section data-chapter="0" className="chapter chapter-hero flex min-h-[100svh] items-end px-6 pb-[10vh] pt-28 sm:px-12 lg:px-[9vw]">
          <div data-reveal className="w-full max-w-5xl">
            <div className="terminal-line mb-8 w-fit">
              <Terminal size={14} strokeWidth={1.5} />
              <code>npx snoopy</code>
              <span className="terminal-cursor" aria-hidden="true" />
            </div>
            <h1
              aria-label="Run a quiet place from your browser."
              className="max-w-5xl font-display text-[clamp(3.8rem,8.8vw,9rem)] font-normal leading-[0.86] tracking-[-0.06em] text-[#fff3df]"
            >
              Run a quiet place
              <span className="block italic text-[#efb778]">from your browser.</span>
            </h1>
            <div className="mt-8 flex max-w-2xl flex-col items-start gap-7 border-l border-[#f4cf9c]/45 pl-5 sm:mt-10 sm:pl-7">
              <p className="text-balance text-base font-light leading-relaxed text-[#fff2df]/78 sm:text-lg">
                A tiny cinematic package that turns scrolling into a calm interactive moment.
              </p>
              <p className="font-display text-xl italic text-[#f3c58f]">A tiny command for when the world gets too loud.</p>
              <div className="flex flex-wrap gap-3">
                <button type="button" onClick={() => scrollToChapter(1)} className="story-button">
                  <span>Start Session</span><span aria-hidden="true">↓</span>
                </button>
                <button type="button" onClick={() => scrollToChapter(4)} className="story-button story-button--ghost">
                  <span>View Commands</span><Terminal size={14} strokeWidth={1.5} />
                </button>
              </div>
            </div>
          </div>
          <p className="absolute bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap font-sans text-[9px] uppercase tracking-[0.32em] text-white/45">
            Scroll to move the film
          </p>
        </section>

        <section data-chapter="1" className="chapter flex min-h-[110svh] items-center px-6 py-24 sm:px-12 lg:px-[9vw]">
          <div data-reveal className="grid w-full items-end gap-12 lg:grid-cols-[1.25fr_.75fr]">
            <div className="max-w-4xl">
              <p className="section-label">Scroll-scrubbed experience</p>
              <h2
                aria-label="The video only moves when you do."
                className="mt-5 font-display text-[clamp(3.25rem,7.5vw,7.5rem)] leading-[0.95] tracking-[-0.045em] text-[#fff3df]"
              >
                The video only moves<span className="block italic text-[#efbd82]">when you do.</span>
              </h2>
            </div>
            <div className="code-window">
              <div className="code-window__bar">
                <div className="flex gap-1.5" aria-hidden="true"><span /><span /><span /></div>
                <span>snoopy.config.js</span>
              </div>
              <pre><code><span className="code-muted">import</span> scroll <span className="code-muted">from</span> <span className="code-string">'snoopy'</span>{'\n\n'}scroll.bind(video).{'\n'}{'  '}pauseWhenIdle()</code></pre>
              <div className="code-window__footer"><Pause size={12} fill="currentColor" />Paused on the exact frame</div>
            </div>
          </div>
        </section>

        <section data-chapter="2" className="chapter flex min-h-[115svh] items-center px-6 py-24 sm:px-12 lg:px-[9vw]">
          <div data-reveal className="w-full">
            <div className="mb-10 max-w-3xl">
              <p className="section-label">Snoopy dashboard</p>
              <h2
                aria-label="A small window into your quieter moment."
                className="mt-5 font-display text-[clamp(3.1rem,6.2vw,6.5rem)] leading-[0.95] tracking-[-0.045em] text-[#fff3df]"
              >
                A small window into<span className="block italic text-[#efb778]">your quieter moment.</span>
              </h2>
            </div>
            <div className="dashboard-shell">
              <div className="dashboard-topbar">
                <div className="package-mark"><span className="package-mark__icon">s</span><span>session.local</span></div>
                <span className="live-indicator"><i />listening to scroll</span>
              </div>
              <div className="dashboard-grid">
                <div className="dashboard-scene">
                  <span>Background</span><strong>Sunset Hill</strong>
                  <p>One frame at a time. No autoplay. No hurry.</p>
                  <div className="dashboard-progress"><span style={{ width: '62%' }} /></div>
                </div>
                <div className="dashboard-stats">
                  {dashboardStats.map((stat) => (
                    <div key={stat.label} className="stat-row"><span>{stat.label}</span><strong>{stat.value}</strong></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section data-chapter="3" className="chapter flex min-h-[125svh] items-center px-6 py-24 sm:px-12 lg:px-[9vw]">
          <div data-reveal className="w-full">
            <div className="mb-10 max-w-3xl">
              <p className="section-label">Snoopy variants</p>
              <h2
                aria-label="Install the kind of quiet you need today."
                className="mt-5 font-display text-[clamp(3.1rem,6.8vw,7rem)] leading-[0.95] tracking-[-0.045em] text-[#fff3df]"
              >
                Install the kind of quiet<span className="block italic text-[#efb778]">you need today.</span>
              </h2>
            </div>
            <div className="variant-grid">
              {variants.map((variant) => {
                const command = `npm install ${variant.name}`;
                const isCopied = copiedCommand === command;
                return (
                  <article key={variant.name} className="package-card">
                    <div className="package-card__topline"><span className="package-dot" style={{ backgroundColor: variant.accent }} /><span>v{variant.version}</span></div>
                    <h3>{variant.name}</h3><p>{variant.description}</p>
                    <button type="button" onClick={() => copyCommand(command)} className="install-command">
                      <code>{command}</code>{isCopied ? <Check size={14} /> : <Copy size={14} />}
                    </button>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section data-chapter="4" className="chapter flex min-h-[120svh] items-center px-6 py-24 sm:px-12 lg:px-[9vw]">
          <div data-reveal className="grid w-full gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
            <div className="max-w-2xl">
              <p className="section-label">Commands</p>
              <h2
                aria-label="Quiet, available from the terminal."
                className="mt-5 font-display text-[clamp(3.25rem,6.5vw,6.75rem)] leading-[0.95] tracking-[-0.045em] text-[#fff3df]"
              >
                Quiet, available<span className="block italic text-[#efb778]">from the terminal.</span>
              </h2>
              <p className="mt-7 max-w-md text-base font-light leading-relaxed text-[#fff2df]/65">
                No account, setup ritual, or endless settings. Choose a command and let the page meet you where you are.
              </p>
            </div>
            <div className="commands-panel">
              <div className="commands-panel__header"><span>CLI reference</span><span>snoopy@2.4.8</span></div>
              {commands.map(({ command, note }) => (
                <button key={command} type="button" onClick={() => copyCommand(command)} className="command-row">
                  <span><code><i>$</i> {command}</code><small>{note}</small></span>
                  {copiedCommand === command ? <Check size={15} /> : <Copy size={15} />}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section data-chapter="5" className="chapter flex min-h-[100svh] items-center justify-center px-6 py-24 text-center">
          <div data-reveal className="max-w-5xl">
            <div className="terminal-line mx-auto mb-9 w-fit"><Terminal size={14} strokeWidth={1.5} /><code>npx snoopy</code></div>
            <p className="font-display text-[clamp(3.5rem,8vw,8rem)] leading-[0.95] tracking-[-0.045em] text-[#fff3df]">
              When the world gets too loud,<span className="block italic text-[#efb778]">run something quiet.</span>
            </p>
            <button type="button" onClick={restart} className="story-button mx-auto mt-12"><span>Restart Session</span><span aria-hidden="true">↑</span></button>
          </div>
        </section>
      </main>
    </div>
  );
}
