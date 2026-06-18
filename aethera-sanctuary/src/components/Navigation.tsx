import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

const links = [
  { label: 'Story', href: '#story' },
  { label: 'Studio', href: '#studio' },
  { label: 'Journal', href: '#journal' },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLinkClick = () => setMenuOpen(false);

  return (
    <header
      ref={headerRef}
      className={`nav-header ${scrolled ? 'nav-scrolled' : ''}`}
    >
      <div className="nav-inner">
        <a
          href="#hero"
          aria-label="Aethera home"
          className="nav-logo"
        >
          Aethera
          <sup>®</sup>
        </a>

        <nav aria-label="Primary navigation" className="nav-links">
          {links.map(({ label, href }) => (
            <a key={label} href={href} className="nav-link">
              {label}
            </a>
          ))}
        </nav>

        <Button asChild variant="outline" className="nav-cta border-white/20 hover:border-purple-400 hover:bg-purple-900/30 text-white bg-black/20">
          <a href="#journey">
            Begin Journey
          </a>
        </Button>

        <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
          <SheetTrigger asChild>
            <button
              type="button"
              className={`nav-burger ${menuOpen ? 'nav-menu-open' : ''}`}
              aria-label="Open menu"
            >
              <span />
              <span />
            </button>
          </SheetTrigger>
          <SheetContent side="top" className="h-screen bg-black/95 border-none flex items-center justify-center">
            <VisuallyHidden>
              <SheetTitle>Navigation Menu</SheetTitle>
              <SheetDescription>Main navigation links</SheetDescription>
            </VisuallyHidden>
            <nav className="mobile-menu-nav flex flex-col items-center gap-8">
              {links.map(({ label, href }) => (
                <a key={label} href={href} className="mobile-menu-link text-4xl font-display text-purple-100 hover:text-purple-400 transition-colors" onClick={handleLinkClick}>
                  {label}
                </a>
              ))}
              <Button asChild variant="outline" className="mt-4 border-purple-500/50 hover:bg-purple-900/20 text-purple-100 rounded-full px-8 h-12" onClick={handleLinkClick}>
                <a href="#journey">
                  Begin Journey
                </a>
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
