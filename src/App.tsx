import { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUp, Menu, X } from 'lucide-react';
import { AboutSection } from './components/sections/AboutSection';
import { ContactSection } from './components/sections/ContactSection';
import { Footer } from './components/sections/Footer';
import { PricingSection } from './components/sections/PricingSection';
import { FAQSection } from './components/sections/FAQSection';
import { ServicesSection } from './components/sections/ServicesSection';
import { TestimonialsSection } from './components/sections/TestimonialsSection';
import { FloatingProjectStatsCard } from './components/ui/FloatingProjectStatsCard';

const BG_IMAGE_1 = '/images/foundation-base.png';
const BG_IMAGE_2 = '/images/finished-house-reveal.png';

const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));
const easeInOut = (value: number) => value * value * (3 - 2 * value);
const range = (progress: number, start: number, end: number) => clamp((progress - start) / (end - start));
const NAV_SAMPLE_Y = 72;

const isLightSurfaceAtNav = () => {
  const surfaces = Array.from(document.querySelectorAll<HTMLElement>('main, section'));
  const activeSurface = surfaces.reverse().find((surface) => {
    const rect = surface.getBoundingClientRect();
    return rect.top <= NAV_SAMPLE_Y && rect.bottom >= NAV_SAMPLE_Y;
  });

  if (!activeSurface) {
    return false;
  }

  const color = window.getComputedStyle(activeSurface).backgroundColor;
  const match = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);

  if (!match) {
    return false;
  }

  const [, red, green, blue] = match.map(Number);
  const luminance = (0.2126 * red + 0.7152 * green + 0.0722 * blue) / 255;

  return luminance > 0.62;
};

function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('Home');
  const [isLightSurface, setIsLightSurface] = useState(false);

  const navItems = [
    { name: 'Home', href: '#' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => item.href.substring(1)).filter(Boolean);
      let current = 'Home';

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && window.scrollY >= (element.offsetTop - 300)) {
          current = navItems.find(item => item.href === `#${section}`)?.name || 'Home';
        }
      }
      if (window.scrollY < 100) {
        current = 'Home';
      }
      setActiveSection(current);
      setIsLightSurface(isLightSurfaceAtNav());
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string, name: string) => {
    e.preventDefault();
    setIsOpen(false);
    setActiveSection(name);
    
    if (href === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between p-4 sm:p-5">
      <div className="flex items-center gap-3 relative z-50">
        <span
          className={`text-xl sm:text-2xl font-display font-semibold tracking-[-0.04em] transition-colors duration-300 ${
            isLightSurface ? 'text-[#111111]' : 'text-white'
          }`}
        >
          Valor
        </span>
      </div>

      <div
        className={`hidden md:flex absolute left-1/2 -translate-x-1/2 backdrop-blur-md border rounded-full px-2 py-2 items-center gap-1 z-50 transition-colors duration-300 ${
          isLightSurface ? 'bg-white/80 border-[#111111]/10 shadow-lg shadow-black/5' : 'bg-white/15 border-white/25'
        }`}
      >
        {navItems.map((item) => (
          <a
            key={item.name}
            href={item.href}
            onClick={(e) => handleScrollTo(e, item.href, item.name)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              activeSection === item.name
                ? isLightSurface
                  ? 'bg-[#111111] text-white'
                  : 'bg-white text-gray-900'
                : isLightSurface
                  ? 'text-[#111111]/75 hover:bg-[#111111]/10 hover:text-[#111111]'
                  : 'text-white/80 hover:bg-white/20 hover:text-white'
            }`}
          >
            {item.name}
          </a>
        ))}
      </div>

      <a
        href="#contact"
        onClick={(e) => handleScrollTo(e, '#contact', 'Contact')}
        className={`hidden md:block relative z-50 text-sm font-semibold px-6 py-2.5 rounded-full transition-colors ${
          isLightSurface
            ? 'bg-[#111111] text-white hover:bg-[#2a2a2a]'
            : 'bg-white text-gray-900 hover:bg-gray-100'
        }`}
      >
        Get Estimate
      </a>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`md:hidden relative z-50 flex h-10 w-10 items-center justify-center rounded-full border backdrop-blur-md transition-colors ${
          isLightSurface ? 'bg-white/85 border-[#111111]/10 text-[#111111]' : 'bg-white/15 border-white/25 text-white'
        }`}
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      <div
        className={`fixed inset-0 bg-black/95 backdrop-blur-xl z-40 transition-opacity duration-300 md:hidden ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={(e) => handleScrollTo(e, item.href, item.name)}
              className={`text-3xl font-display font-semibold transition-colors ${
                activeSection === item.name ? 'text-white' : 'text-white/80 hover:text-white'
              }`}
            >
              {item.name}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => handleScrollTo(e, '#contact', 'Contact')}
            className="mt-4 bg-white text-gray-900 text-lg font-semibold px-8 py-3 rounded-full hover:bg-gray-100 transition-colors"
          >
            Get Estimate
          </a>
        </div>
      </div>
    </nav>
  );
}

function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [isLightSurface, setIsLightSurface] = useState(false);

  useEffect(() => {
    const updateVisibility = () => {
      setIsVisible(window.scrollY > window.innerHeight * 0.8);
      setIsLightSurface(isLightSurfaceAtNav());
    };

    updateVisibility();
    window.addEventListener('scroll', updateVisibility, { passive: true });
    window.addEventListener('resize', updateVisibility);
    return () => {
      window.removeEventListener('scroll', updateVisibility);
      window.removeEventListener('resize', updateVisibility);
    };
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Back to top"
      className={`fixed bottom-5 right-5 sm:bottom-7 sm:right-7 z-[110] flex h-11 w-11 items-center justify-center rounded-full border backdrop-blur-md shadow-lg transition-all duration-300 ${
        isVisible ? 'translate-y-0 opacity-100 pointer-events-auto' : 'translate-y-3 opacity-0 pointer-events-none'
      } ${
        isLightSurface
          ? 'bg-[#111111] border-[#111111] text-white shadow-black/15 hover:bg-[#2a2a2a]'
          : 'bg-white/15 border-white/25 text-white shadow-black/25 hover:bg-white/25'
      }`}
    >
      <ArrowUp className="h-[18px] w-[18px]" />
    </button>
  );
}

export default function App() {
  const revealSceneRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const smoothScrollRafRef = useRef<number | null>(null);
  const targetProgress = useRef(0);
  const smoothProgress = useRef(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined;
    }

    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      wheelMultiplier: 0.9,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const raf = (time: number) => {
      lenis.raf(time);
      smoothScrollRafRef.current = requestAnimationFrame(raf);
    };

    smoothScrollRafRef.current = requestAnimationFrame(raf);

    return () => {
      if (smoothScrollRafRef.current !== null) {
        cancelAnimationFrame(smoothScrollRafRef.current);
      }
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const updateTargetProgress = () => {
      const scene = revealSceneRef.current;
      if (!scene) {
        return;
      }

      const rect = scene.getBoundingClientRect();
      const scrollableDistance = scene.offsetHeight - window.innerHeight;
      targetProgress.current = clamp(-rect.top / Math.max(scrollableDistance, 1));
    };

    const animate = () => {
      smoothProgress.current += (targetProgress.current - smoothProgress.current) * 0.075;
      setScrollProgress(smoothProgress.current);
      rafRef.current = requestAnimationFrame(animate);
    };

    updateTargetProgress();
    window.addEventListener('scroll', updateTargetProgress, { passive: true });
    window.addEventListener('resize', updateTargetProgress);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('scroll', updateTargetProgress);
      window.removeEventListener('resize', updateTargetProgress);
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  const cinematicProgress = easeInOut(scrollProgress);
  const revealProgress = easeInOut(range(scrollProgress, 0.22, 0.92));
  const revealHeight = revealProgress * 112;
  const revealEdge = Math.max(0, revealHeight - 12);
  const revealMask = `linear-gradient(to top, rgba(255,255,255,1) 0%, rgba(255,255,255,1) ${revealEdge}%, rgba(255,255,255,0.72) ${revealHeight}%, rgba(255,255,255,0) ${Math.min(100, revealHeight + 8)}%)`;
  const revealOpacity = 0.05 + range(scrollProgress, 0.16, 0.48) * 0.95;
  const baseScale = 1.06 - cinematicProgress * 0.035;
  const revealScale = 1.075 - cinematicProgress * 0.045;
  const overlayOpacity = 0.72 - range(scrollProgress, 0.35, 0.95) * 0.2;

  return (
    <div className="min-h-screen bg-white tracking-[-0.02em]" style={{ fontFamily: "'Manrope', sans-serif" }}>
      <Navigation />
      <BackToTopButton />

      <main ref={revealSceneRef} className="relative h-[320vh] bg-[#0C0C0C]">
        <section className="sticky top-0 relative w-full overflow-hidden h-screen bg-[#0C0C0C]" style={{ height: '100dvh' }}>
          <div
            className="absolute inset-0 bg-center bg-cover bg-no-repeat z-10 will-change-transform"
            style={{
              backgroundImage: `url(${BG_IMAGE_1})`,
              transform: `scale(${baseScale}) translateY(${-cinematicProgress * 10}px)`,
            }}
          />

          <div
            className="absolute inset-0 bg-center bg-cover bg-no-repeat z-30 pointer-events-none will-change-transform"
            style={{
              backgroundImage: `url(${BG_IMAGE_2})`,
              opacity: revealOpacity,
              transform: `scale(${revealScale}) translateY(${-cinematicProgress * 16}px)`,
              maskImage: revealMask,
              WebkitMaskImage: revealMask,
              maskSize: '100% 100%',
              WebkitMaskSize: '100% 100%',
              maskRepeat: 'no-repeat',
              WebkitMaskRepeat: 'no-repeat',
            }}
          />

          <div className="absolute inset-x-0 bottom-0 z-[35] h-40 bg-gradient-to-t from-white/18 via-white/7 to-transparent blur-sm pointer-events-none" />
          <div className="absolute inset-0 z-40 bg-black/30 pointer-events-none" style={{ opacity: overlayOpacity }} />
          <div
            className="absolute inset-0 z-40 bg-gradient-to-t from-black/70 via-black/20 to-black/10 pointer-events-none"
            style={{ opacity: overlayOpacity }}
          />
          <div className="absolute inset-x-0 -bottom-px z-40 h-24 bg-gradient-to-t from-[#0C0C0C] via-[#0C0C0C]/45 to-transparent pointer-events-none" />

          <div
            className="absolute top-[14%] left-0 right-0 z-50 flex flex-col items-center text-center px-5 pointer-events-none"
          >
            <h1 className="w-full max-w-[92vw] text-white leading-[0.96] font-display">
              <span
                className="block font-semibold text-[clamp(2.35rem,5vw,5.75rem)]"
                style={{ letterSpacing: '-0.055em' }}
              >
                From Foundation
              </span>
              <span
                className="block font-semibold text-[clamp(2.35rem,5vw,5.75rem)] -mt-1"
                style={{ letterSpacing: '-0.06em', wordSpacing: '0.12em' }}
              >
                to Future
              </span>
            </h1>
            <p className="mt-5 w-full max-w-[34rem] text-sm sm:text-base text-white/80 leading-relaxed">
              We build modern residential and commercial spaces with precision, durability, and clean architectural
              execution from the ground up.
            </p>
            <FloatingProjectStatsCard />
          </div>

        <div
          className="hidden sm:block absolute bottom-14 left-10 md:left-14 max-w-[290px] z-50"
        >
          <p className="text-sm text-white/80 leading-relaxed">
            Every strong structure starts with a reliable foundation. Our process combines planning, engineering, and
            craftsmanship to bring each project to life.
          </p>
        </div>

        <div
          className="absolute bottom-10 sm:bottom-14 left-5 right-5 sm:left-auto sm:right-10 md:right-14 max-w-full sm:max-w-[300px] z-50 flex flex-col items-start gap-4 sm:gap-5"
        >
          <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
            Scroll to watch the finished build rise from the foundation stage.
          </p>
          <button className="bg-[#d97706] hover:bg-[#b96305] text-white text-sm font-semibold px-7 py-3 rounded-full transition-all hover:scale-[1.03] active:scale-95 hover:shadow-lg hover:shadow-[#d97706]/30 pointer-events-auto">
            Start Your Project
          </button>
        </div>

        </section>
      </main>

      <AboutSection />
      <ServicesSection />
      <TestimonialsSection />
      <PricingSection />
      <FAQSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
