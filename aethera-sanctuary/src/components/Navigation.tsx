const links = ['Studio', 'Journal'];

export function Navigation() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-5 sm:px-10">
      <div className="flex items-center gap-8">
        <a
          href="/"
          aria-label="Aethera home"
          className="font-display text-3xl tracking-tight text-white"
        >
          Aethera
          <sup className="ml-0.5 align-super font-body text-[0.34em] font-medium">
            ®
          </sup>
        </a>

        <nav aria-label="Primary navigation" className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="font-body text-sm text-[#c8bfce] transition-colors hover:text-white"
            >
              {link}
            </a>
          ))}
        </nav>
      </div>

      <a
        href="#journey"
        className="rounded-lg border border-white/20 bg-black/20 px-5 py-2.5 font-body text-xs font-medium text-white backdrop-blur-md transition hover:border-[#b98ae8]/70 hover:bg-[#9b62d0]/30 sm:text-sm"
      >
        Begin Journey
      </a>
    </header>
  );
}
