import MascotHero from "@/components/MascotHero";
import PortfolioSections from "@/components/PortfolioSections";

export default function Home() {
  return (
    <main className="min-h-screen min-h-[100dvh] overflow-x-clip bg-[#f4fbff]">
      <MascotHero />
      <PortfolioSections />
    </main>
  );
}
