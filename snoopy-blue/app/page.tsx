import MascotHero from "@/components/MascotHero";
import SoapSections from "@/components/SoapSections";

export default function Home() {
  return (
    <main className="min-h-screen min-h-[100dvh] overflow-x-clip bg-[#f4fbff]">
      <MascotHero />
      <SoapSections />
    </main>
  );
}
