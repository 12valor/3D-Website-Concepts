import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "Benefits", href: "#benefits" },
  { label: "Products", href: "#products" },
  { label: "Reviews", href: "#reviews" },
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
            <span>Snoopy Blue Soap</span>
          </Link>

          <NavigationMenu className="hidden md:flex rounded-full bg-white/24 p-1">
            <NavigationMenuList className="space-x-1">
              {navItems.map((item) => (
                <NavigationMenuItem key={item.label}>
                  <Link href={item.href} legacyBehavior passHref>
                    <NavigationMenuLink
                      className={`${navigationMenuTriggerStyle()} h-9 rounded-full bg-transparent px-4 py-2 text-sm font-semibold text-[#123a55] hover:bg-white/70 hover:text-sky-800 focus:bg-white/70 focus:text-sky-800`}
                    >
                      {item.label}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          <Button
            asChild
            variant="outline"
            className="h-auto rounded-full border-sky-200 bg-white/88 px-5 py-2.5 text-sm font-bold text-[#045f94] shadow-[0_12px_28px_rgba(48,189,247,0.22)] transition hover:-translate-y-0.5 hover:bg-[#e6f7ff] sm:px-6"
          >
            <Link href="#products">Shop Now</Link>
          </Button>
        </nav>
      </header>

      {/* Floating Bubbles */}
      <div className="hero-enter absolute left-[15%] top-[25%] z-20 size-8 rounded-full border border-white/40 bg-white/10 shadow-sm backdrop-blur-sm sm:size-12" />
      <div className="hero-enter absolute right-[20%] top-[30%] z-20 size-12 rounded-full border border-white/40 bg-white/10 shadow-sm backdrop-blur-sm sm:size-16" style={{ animationDelay: "150ms" }} />
      <div className="hero-enter absolute left-[30%] top-[45%] z-20 size-6 rounded-full border border-white/40 bg-white/10 shadow-sm backdrop-blur-sm sm:size-8" style={{ animationDelay: "300ms" }} />
      <div className="hero-enter absolute right-[25%] top-[50%] z-20 size-10 rounded-full border border-white/40 bg-white/10 shadow-sm backdrop-blur-sm sm:size-14" style={{ animationDelay: "450ms" }} />

      <div className="hero-enter relative z-20 mx-auto mt-[16vh] flex max-w-4xl flex-col items-center justify-center px-4 text-center sm:mt-[20vh]">
        <span className="mb-4 inline-block rounded-full bg-white/20 px-4 py-1.5 text-xs font-bold tracking-widest text-white shadow-sm backdrop-blur-md sm:text-sm">
          GENTLE HANDMADE SOAP
        </span>
        <h1 className="mb-6 max-w-3xl text-[clamp(2.5rem,6vw,5.5rem)] leading-[1.1] font-black text-white drop-shadow-md">
          Fresh skin starts with a clean little ritual.
        </h1>
        <p className="mb-8 max-w-2xl text-lg font-medium text-white/90 drop-shadow sm:text-xl">
          Soft, refreshing, and skin-friendly soaps made for everyday use with a playful blue brand identity.
        </p>
        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <Button
            asChild
            className="h-auto rounded-full bg-white px-8 py-3.5 text-sm font-bold uppercase tracking-widest text-[#045f94] shadow-lg transition hover:-translate-y-0.5 hover:bg-[#e6f7ff] sm:px-10 sm:py-4 sm:text-base"
          >
            <Link href="#products">Shop Soap</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="h-auto rounded-full border-2 border-white/80 bg-transparent px-8 py-3.5 text-sm font-bold uppercase tracking-widest text-white shadow-lg backdrop-blur-sm transition hover:-translate-y-0.5 hover:bg-white/20 sm:px-10 sm:py-4 sm:text-base"
          >
            <Link href="#products">View Collection</Link>
          </Button>
        </div>
      </div>

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
