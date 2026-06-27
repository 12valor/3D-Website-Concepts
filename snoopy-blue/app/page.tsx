import MascotHero from "@/components/MascotHero";
import AboutSection from "@/components/AboutSection";
import SoapSections from "@/components/SoapSections";

export default function Home() {
  return (
    <main className="min-h-screen min-h-[100dvh] overflow-x-clip bg-[#f4fbff]">
      <MascotHero />
      <AboutSection />
      <SoapSections />
    </main>
  );
}
