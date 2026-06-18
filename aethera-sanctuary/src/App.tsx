import { Navigation } from './components/Navigation';
import { ParticleField } from './components/ParticleField';
import { HeroScene } from './components/HeroScene';
import { ScrollScene } from './components/ScrollScene';
import { StudioSection } from './components/StudioSection';
import { JournalSection } from './components/JournalSection';
import { FinaleSection } from './components/FinaleSection';

function App() {
  return (
    <main className="relative bg-black text-white">
      <ParticleField />
      <Navigation />
      <HeroScene />
      <ScrollScene />
      <StudioSection />
      <JournalSection />
      <FinaleSection />
    </main>
  );
}

export default App;
