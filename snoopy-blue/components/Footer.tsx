import Link from "next/link";

const footerNav = [
  {
    title: "Explore",
    links: [
      { label: "Shop", href: "/shop" },
      { label: "About", href: "/about" },
      { label: "How It Works", href: "/#how-it-works" },
    ],
  },
  {
    title: "Get Started",
    links: [
      { label: "Become a Seller", href: "/seller" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Cookie Policy", href: "/cookies" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#082033] px-5 pt-16 pb-8 sm:px-8 md:px-10">
      <div className="mx-auto max-w-6xl">
        {/* Top area */}
        <div className="mb-16 grid grid-cols-1 gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <div className="mb-4 text-xl font-extrabold text-white">Snoopy Blue</div>
            <p className="mb-4 max-w-xs text-sm leading-relaxed text-white/60">
              Find your next fresh bar. Questions? Reach us anytime.
            </p>
            <div className="flex flex-col gap-2 text-sm text-white/60">
              <a href="mailto:hello@snoopyblue.com" className="transition hover:text-white">hello@snoopyblue.com</a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="transition hover:text-white">Facebook</a>
            </div>
          </div>

          {/* Nav columns */}
          {footerNav.map((col) => (
            <div key={col.title}>
              <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-white/40">{col.title}</h3>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="group inline-flex items-center gap-1 text-sm text-white/60 transition hover:text-white"
                    >
                      <span>{link.label}</span>
                      <span className="opacity-0 transition group-hover:opacity-100" aria-hidden="true">&nearr;</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Big watermark letters */}
        <div className="mb-6 flex select-none justify-center overflow-hidden" aria-hidden="true">
          <span className="text-[clamp(4rem,12vw,10rem)] font-black leading-none text-white/[0.04]">
            snoopy blue
          </span>
        </div>

        {/* Bottom */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row">
          <span className="text-xs text-white/40">Copyright © {new Date().getFullYear()} Snoopy Blue</span>
          <span className="text-xs text-white/40">Made with care</span>
        </div>
      </div>
    </footer>
  );
}
