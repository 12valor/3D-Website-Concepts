import Navbar from "@/components/Navbar";
import MascotHero from "@/components/MascotHero";
import SoapTypes from "@/components/SoapTypes";
import FeaturedProducts from "@/components/FeaturedProducts";
import HowItWorks from "@/components/HowItWorks";
import FAQ from "@/components/FAQ";
import GiftCTA from "@/components/GiftCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen min-h-[100dvh] overflow-x-clip">
      <Navbar />
      <MascotHero />
      <SoapTypes />
      <FeaturedProducts />
      <HowItWorks />
      <FAQ />
      <GiftCTA />
      <Footer />
    </main>
  );
}
