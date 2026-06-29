import { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Activity, ArrowUpRight, Check, Clock3, Copy, Download, FolderClosed, Github, Link2, MousePointer2, Package, Pause, Star, Terminal, Twitter } from 'lucide-react';
import { useFramerSmoothScroll } from '../hooks/useFramerSmoothScroll';

gsap.registerPlugin(ScrollTrigger);

const chapters = ['Install', 'Scroll sync', 'Dashboard', 'Variants', 'Quiet'];
const chapterStops = [0, 0.2, 0.42, 0.65, 0.88];

const variants = [
  { name: 'snoopy-sunset', version: '1.4.2', description: 'Warm cinematic sunset mode.', accent: '#efb778' },
  { name: 'snoopy-focus', version: '2.1.0', description: 'Quiet focus with the noise turned down.', accent: '#d9c39f' },
  { name: 'snoopy-dream', version: '0.9.8', description: 'Soft, dreamy parallax for wandering thoughts.', accent: '#d9b7ca' },
  { name: 'snoopy-night', version: '1.2.6', description: 'Darker night calm for the late hours.', accent: '#9da7c7' },
];

const dashboardStats = [
  { label: 'Mood', value: 'Calm', icon: Activity },
  { label: 'Noise', value: 'Low', icon: Pause },
  { label: 'Session', value: '02:48', icon: Clock3 },
  { label: 'Timeline', value: '04:35 / 10:00', icon: MousePointer2 },
];

const workflowSteps = [
  {
    number: '01',
    title: 'Install',
    description: 'Launch the package with one quiet command.',
    command: 'npx snoopy',
    icon: Download,
  },
  {
    number: '02',
    title: 'Bind',
    description: 'Connect the session to a cinematic video element.',
    command: 'scroll.bind(video)',
    icon: Link2,
  },
  {
    number: '03',
    title: 'Scroll',
    description: 'Move to seek. Stop to hold the exact moment.',
    command: 'pauseWhenIdle()',
    icon: MousePointer2,
  },
];

export function ScrollScene() {
  const smoothScrollTo = useFramerSmoothScroll();
  const rootRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const scrollTriggerRef = useRef<ReturnType<typeof ScrollTrigger.create> | null>(null);
  const activeChapterRef = useRef(-1);
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    const stage = stageRef.current;
    const video = videoRef.current;
    if (!root || !stage || !video) return;

    let context: gsap.Context | undefined;
    let initialized = false;
    let targetTime = 0;
    let smoothedTime = 0;
    let rafId = 0;

    video.load();
    video.pause();

    const updateUiProgress = (progress: number) => {
      const active = Math.min(chapters.length - 1, Math.floor(progress * chapters.length));

      if (active !== activeChapterRef.current) {
        activeChapterRef.current = active;
        root.querySelectorAll<HTMLButtonElement>('[data-nav-chapter]').forEach((button) => {
          const isActive = Number(button.dataset.navChapter) === active;
          button.classList.toggle('is-active', isActive);
          if (isActive) button.setAttribute('aria-current', 'true');
          else button.removeAttribute('aria-current');
        });
      }

      if (progressRef.current) {
        progressRef.current.style.transform = `scaleY(${progress})`;
      }

      if (counterRef.current) {
        counterRef.current.textContent = `0${active + 1} / 05`;
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

    const createScrubTimeline = () => {
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
        const scenes = gsap.utils.toArray<HTMLElement>('[data-scene]');
        const panels = gsap.utils.toArray<HTMLElement>('[data-panel]');

        gsap.set(scenes, { autoAlpha: 0, y: 48, pointerEvents: 'none' });
        gsap.set(scenes[0], { autoAlpha: 1, y: 0, pointerEvents: 'auto' });
        gsap.set(panels, { y: 34 });

        const timeline = gsap.timeline({ paused: true, defaults: { ease: 'none' } });
        timelineRef.current = timeline;

        const transitions = [
          { out: 1.2, enter: 1.75 },
          { out: 3.05, enter: 3.6 },
          { out: 4.95, enter: 5.5 },
          { out: 7.05, enter: 7.6 },
        ];

        transitions.forEach(({ out, enter }, index) => {
          timeline
            .to(scenes[index], { autoAlpha: 0, y: -40, duration: 0.55, pointerEvents: 'none' }, out)
            .to(scenes[index + 1], { autoAlpha: 1, y: 0, duration: 0.75, pointerEvents: 'auto' }, enter);
        });

        timeline.to(panels, { y: 0, duration: 0.9, stagger: 0.08 }, 1.85);
        timeline.to('[data-dashboard-panel]', { y: 0, duration: 0.9 }, 3.7);
        timeline.to('[data-variant-card]', { y: 0, duration: 0.9, stagger: 0.08 }, 5.6);
      }, root);

      scrollTriggerRef.current = ScrollTrigger.create({
        trigger: root,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        pin: stage,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onRefresh: (self: { progress: number }) => {
          targetTime = self.progress * video.duration;
          timelineRef.current?.progress(self.progress);
          updateUiProgress(self.progress);
        },
        onUpdate: (self: { progress: number }) => {
          targetTime = self.progress * video.duration;
          timelineRef.current?.progress(self.progress);
          updateUiProgress(self.progress);
        },
      });

      rafId = requestAnimationFrame(smoothSeek);
      ScrollTrigger.refresh();
    };

    if (video.readyState >= 1) {
      createScrubTimeline();
    } else {
      video.addEventListener('loadedmetadata', createScrubTimeline, { once: true });
    }

    return () => {
      cancelAnimationFrame(rafId);
      video.removeEventListener('loadedmetadata', createScrubTimeline);
      scrollTriggerRef.current?.kill();
      scrollTriggerRef.current = null;
      timelineRef.current?.kill();
      timelineRef.current = null;
      context?.revert();
    };
  }, []);

  const scrollToChapter = (index: number) => {
    const trigger = scrollTriggerRef.current;
    if (!trigger) return;
    const target = trigger.start + (trigger.end - trigger.start) * chapterStops[index];
    smoothScrollTo(target);
  };

  const copyCommand = async (command: string) => {
    await navigator.clipboard?.writeText(command);
    setCopiedCommand(command);
    window.setTimeout(() => setCopiedCommand(null), 1600);
  };

  return (
    <section ref={rootRef} className="quiet-story scroll-content">
      <div ref={stageRef} className="scrub-stage video-pin">
        <div className="cinematic-media" aria-hidden="true">
          <video
            ref={videoRef}
            className="cinematic-video"
            muted
            playsInline
            preload="auto"
            poster="/poster.jpg"
            data-testid="scroll-video"
          >
            <source src="/videos/scroll-video.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="cinematic-shade" aria-hidden="true" />
        <div className="sunset-glow" aria-hidden="true" />
        <div className="foreground-layer" aria-hidden="true" />

        <header className="site-header">
          <nav className="theme-navbar" aria-label="Primary navigation">
            <button type="button" onClick={() => scrollToChapter(0)} className="navbar-brand" aria-label="Back to snoopy home">
              <Terminal size={15} strokeWidth={1.6} />
              <span>snoopy</span>
            </button>
            <div className="navbar-links">
              <button type="button" data-nav-chapter="1" onClick={() => scrollToChapter(1)}>Experience</button>
              <button type="button" data-nav-chapter="2" onClick={() => scrollToChapter(2)}>Session</button>
              <button type="button" data-nav-chapter="3" onClick={() => scrollToChapter(3)}>Variants</button>
            </div>
            <div className="navbar-actions">
              <div className="navbar-socials" aria-label="Social links">
                <button type="button" className="navbar-icon-button" aria-label="GitHub">
                  <Github size={14} strokeWidth={1.6} />
                </button>
                <button type="button" className="navbar-icon-button" aria-label="X / Twitter">
                  <Twitter size={14} strokeWidth={1.6} />
                </button>
              </div>
              <button type="button" className="github-stars" aria-label="12,800 GitHub stars">
                <Star size={13} fill="currentColor" strokeWidth={1.4} />
                <span>12.8k</span>
              </button>
            </div>
          </nav>
        </header>

        <main className="scene-stack">
          <section data-scene="hero" className="scene scene--hero">
            <div className="hero-content">
              <button type="button" onClick={() => copyCommand('npx snoopy')} className="terminal-line hero-command" aria-label="Copy npx snoopy command">
                <Terminal size={14} strokeWidth={1.5} />
                <code>npx snoopy</code>
                {copiedCommand === 'npx snoopy' ? <Check size={14} /> : <Copy size={14} />}
              </button>
              <h1 aria-label="Run a quiet place from your browser.">
                Run a quiet place
                <span>from your browser.</span>
              </h1>
              <div className="hero-details">
                <p>A tiny cinematic package that turns scrolling into a calm interactive moment.</p>
                <em>A tiny command for when the world gets too loud.</em>
                <div className="hero-actions">
                  <button type="button" onClick={() => scrollToChapter(1)} className="story-button">
                    <span>Start Session</span><ArrowUpRight size={15} strokeWidth={1.6} />
                  </button>
                  <button type="button" onClick={() => scrollToChapter(3)} className="story-button story-button--ghost">
                    <span>View Packages</span><FolderClosed size={14} strokeWidth={1.5} />
                  </button>
                </div>
              </div>
            </div>
          </section>

          <section data-scene="sync" className="scene scene--split">
            <div className="sync-copy">
              <p className="section-label">Scroll Sync</p>
              <h2 aria-label="The video only moves when you do.">
                The video only moves
                <span>when you do.</span>
              </h2>
              <p className="section-summary">A deterministic cinematic timeline: every gesture maps to the video, and every pause stays perfectly still.</p>
            </div>
            <div data-panel className="code-window">
              <div className="code-window__bar">
                <div aria-hidden="true"><span /><span /><span /></div>
                <span>snoopy.config.js</span>
              </div>
              <pre><code><i>import</i> scroll <i>from</i> <b>'snoopy'</b>{'\n\n'}<i>const</i> video = document.querySelector(<b>'video'</b>){'\n\n'}scroll.bind(video).{'\n'}{'  '}pauseWhenIdle()</code></pre>
              <div className="code-window__footer">
                <Pause size={12} fill="currentColor" />
                Paused on the exact moment
              </div>
            </div>
          </section>

          <section data-scene="dashboard" className="scene scene--dashboard">
            <div data-dashboard-panel className="platform-showcase">
              <div className="platform-upper">
                <aside className="platform-intro">
                  <p className="section-label">Package Dashboard</p>
                  <h2>snoopy <i>/</i> session</h2>
                  <p>A tiny command that turns scrolling into a quiet, cinematic experience.</p>
                  <button type="button" onClick={() => copyCommand('npx snoopy')} className="platform-command">
                    <Terminal size={17} strokeWidth={1.5} />
                    <code>npx snoopy</code>
                    {copiedCommand === 'npx snoopy' ? <Check size={14} /> : <Copy size={14} />}
                  </button>
                  <div className="platform-meta">
                    <span><Package size={13} />version <strong>1.4.2</strong></span>
                    <span>◉ license <strong>MIT</strong></span>
                  </div>
                </aside>

                <div className="dashboard-shell dashboard-shell--platform">
                  <div className="dashboard-topbar">
                    <div className="dashboard-identity">
                      <span className="window-dots"><i /><i /><i /></span>
                      <span className="package-mark__icon">s</span>
                      <span>snoopy</span>
                      <i>/</i>
                      <strong>session</strong>
                    </div>
                    <span className="live-indicator"><i />scroll sync active</span>
                  </div>
                  <div className="dashboard-overview">
                    <div className="environment-card">
                      <div className="environment-card__art"><span /></div>
                      <div>
                        <small>Environment</small>
                        <strong>Sunset Hill</strong>
                        <p>A calm place to think in motion.</p>
                      </div>
                    </div>
                    <div className="dashboard-stats">
                      {dashboardStats.map(({ label, value, icon: Icon }) => (
                        <div key={label} className="stat-card">
                          <span><Icon size={13} strokeWidth={1.5} />{label}</span>
                          <strong>{value}</strong>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="video-timeline">
                    <div className="video-timeline__header"><span>Video timeline</span><code>scroll scrub active</code></div>
                    <div className="video-rail">
                      <span />
                      <i />
                    </div>
                    <div className="video-times"><span>00:00</span><span>02:30</span><span>05:00</span><span>07:30</span><span>10:00</span></div>
                  </div>
                  <div className="dashboard-bottom">
                    <div className="command-history">
                      <span>Command history</span>
                      <code><i>›</i> npx snoopy <small>09:41:12</small></code>
                      <code><i>›</i> npx snoopy --breathe <small>09:43:28</small></code>
                      <code><i>›</i> npx snoopy --dashboard <small>09:44:03</small></code>
                      <code><i>›</i> npx snoopy --variant sunset <small>09:45:11</small></code>
                    </div>
                    <div className="package-summary">
                      <Package size={24} strokeWidth={1.3} />
                      <div><span>Package</span><strong>snoopy</strong><code>1.4.2 · MIT</code></div>
                    </div>
                    <div className="session-status">
                      <span><i />Active</span>
                      <p>Video is paused. Scroll moves the timeline and holds exactly when you stop.</p>
                      <code><Pause size={12} fill="currentColor" />paused on exact moment</code>
                    </div>
                  </div>
                </div>
              </div>

              <div className="platform-workflow">
                <p className="platform-workflow__label">How snoopy works</p>
                <div className="platform-workflow__grid">
                  {workflowSteps.map(({ number, title, description, command, icon: Icon }) => (
                    <article key={number} className={`workflow-card workflow-card--${title.toLowerCase()}`}>
                      <header>
                        <span>{number}</span>
                        <div><h3>{title}</h3><p>{description}</p></div>
                        <Icon size={20} strokeWidth={1.4} />
                      </header>
                      <div className="workflow-illustration">
                        <code>{command}</code>
                        {title === 'Install' ? <small>ready to create quiet moments.</small> : null}
                        {title === 'Bind' ? <div className="bind-graph"><span /><i /></div> : null}
                        {title === 'Scroll' ? <div className="scroll-scrub-meter"><span /><i><Pause size={13} /></i></div> : null}
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section data-scene="variants" className="scene scene--variants">
            <div className="scene-heading">
              <p className="section-label">Snoopy Variants</p>
              <h2 aria-label="Install the kind of quiet you need today.">
                Install the kind of quiet
                <span>you need today.</span>
              </h2>
            </div>
            <div className="variant-grid">
              {variants.map((variant) => {
                const command = `npm install ${variant.name}`;
                return (
                  <article key={variant.name} data-variant-card className="package-card">
                    <div className="package-card__topline">
                      <span className="package-dot" style={{ backgroundColor: variant.accent }} />
                      <span>v{variant.version}</span>
                    </div>
                    <h3>{variant.name}</h3>
                    <p>{variant.description}</p>
                    <button type="button" onClick={() => copyCommand(command)} className="install-command">
                      <code>{command}</code>
                      {copiedCommand === command ? <Check size={14} /> : <Copy size={14} />}
                    </button>
                  </article>
                );
              })}
            </div>
          </section>

          <section data-scene="final" className="scene scene--final">
            <div className="terminal-line">
              <Terminal size={14} strokeWidth={1.5} />
              <code>npx snoopy</code>
            </div>
            <p>
              When the world gets too loud,
              <span>run something quiet.</span>
            </p>
            <button type="button" onClick={() => scrollToChapter(0)} className="story-button">
              <span>Restart Session</span><span aria-hidden="true">↑</span>
            </button>
          </section>
        </main>
      </div>
    </section>
  );
}
