import { useEffect, useRef, useState } from 'react';

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

  // Close menu on anchor click
  const handleLinkClick = () => setMenuOpen(false);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      <header
        ref={headerRef}
        className={`nav-header ${scrolled ? 'nav-scrolled' : ''} ${menuOpen ? 'nav-menu-open' : ''}`}
      >
        <div className="nav-inner">
          <a
            href="#hero"
            aria-label="Aethera home"
            className="nav-logo"
            onClick={handleLinkClick}
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

          <a href="#journey" className="nav-cta" onClick={handleLinkClick}>
            Begin Journey
          </a>

          <button
            type="button"
            className="nav-burger"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span />
            <span />
          </button>
        </div>
      </header>

      {/* Mobile overlay menu */}
      <div className={`mobile-menu ${menuOpen ? 'mobile-menu-open' : ''}`}>
        <nav className="mobile-menu-nav">
          {links.map(({ label, href }) => (
            <a key={label} href={href} className="mobile-menu-link" onClick={handleLinkClick}>
              {label}
            </a>
          ))}
          <a href="#journey" className="mobile-menu-cta" onClick={handleLinkClick}>
            Begin Journey
          </a>
        </nav>
      </div>
    </>
  );
}
