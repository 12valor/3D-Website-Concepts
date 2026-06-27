import Image from "next/image";
import Link from "next/link";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "Features", href: "#features" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

export default function MascotHero() {
  return (
    <section
      id="home"
      aria-label="Snoopy Blue landing hero"
      className="relative isolate flex min-h-screen h-[100dvh] w-full overflow-hidden bg-[#30bdf7] text-[#082033]"
    >
      <Image
        src="/newbackground.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-30 object-cover"
      />


      <header className="absolute inset-x-0 top-0 z-30 px-4 pt-4 sm:px-6 sm:pt-6 lg:pt-8">
        <nav
          aria-label="Primary navigation"
          className="hero-enter-soft mx-auto flex h-14 w-full max-w-4xl items-center justify-between rounded-full border border-white/70 bg-white/48 px-2.5 shadow-[0_18px_50px_rgba(8,91,153,0.18),inset_0_1px_0_rgba(255,255,255,0.72)] backdrop-blur-2xl sm:h-16 sm:px-4"
        >
          <Link
            href="#home"
            className="group flex items-center gap-2 rounded-full px-2.5 py-2 text-sm font-extrabold text-[#082033] transition hover:text-sky-700 sm:text-base"
            aria-label="Snoopy Blue home"
          >
            <span className="relative grid size-8 place-items-center rounded-full bg-white/80 shadow-inner ring-1 ring-sky-200/80 sm:size-9">
              <span className="absolute left-2.5 top-2 size-1.5 rounded-full bg-sky-500 sm:left-3 sm:top-2.5" />
              <span className="absolute right-2.5 top-2 size-1.5 rounded-full bg-[#082033] sm:right-3 sm:top-2.5" />
              <span className="mt-2 h-2 w-3.5 rounded-b-full border-b-2 border-[#082033]" />
            </span>
            <span>Snoopy Blue</span>
          </Link>

          <div className="hidden items-center gap-1 rounded-full bg-white/24 p-1 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="rounded-full px-4 py-2 text-sm font-semibold text-[#123a55] transition hover:bg-white/70 hover:text-sky-800"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <Link
            href="#features"
            className="rounded-full border border-sky-200 bg-white/88 px-5 py-2.5 text-sm font-bold text-[#045f94] shadow-[0_12px_28px_rgba(48,189,247,0.22)] transition hover:-translate-y-0.5 hover:bg-[#e6f7ff] focus:outline-none focus:ring-2 focus:ring-white/90 focus:ring-offset-2 focus:ring-offset-sky-300 sm:px-6"
          >
            Start
          </Link>
        </nav>
      </header>

      <div className="pointer-events-none absolute inset-x-0 bottom-[3svh] top-[7svh] z-10 mx-auto flex max-w-[1500px] items-end justify-center px-0 sm:bottom-[2svh] sm:top-[7svh] lg:bottom-[0svh] lg:top-[8svh]">
        <div className="hero-enter relative aspect-[16/9] w-[250vw] max-w-none shrink-0 sm:w-[118vw] lg:w-[105vw] xl:w-[96vw] 2xl:w-[88vw]">
          <Image
            src="/mascot.png"
            alt="Glossy Snoopy Blue mascot"
            fill
            priority
            sizes="(min-width: 1536px) 88vw, (min-width: 1280px) 96vw, (min-width: 1024px) 105vw, (min-width: 640px) 118vw, 250vw"
            className="object-contain drop-shadow-[0_38px_80px_rgba(4,78,130,0.28)]"
          />
        </div>
      </div>
    </section>
  );
}
