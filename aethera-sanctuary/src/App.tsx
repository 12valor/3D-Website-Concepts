import { Navigation } from './components/Navigation';
import { ParticleField } from './components/ParticleField';
import { ScrollScene } from './components/ScrollScene';

function App() {
  return (
    <main className="relative bg-black text-white">
      <ParticleField />
      <Navigation />
      <ScrollScene />

      <section id="journey" className="story-resolution">
        <p>Aethera Eternal</p>
        <h2>What opens can never return unchanged.</h2>
        <a href="#story">Experience it again</a>
      </section>
    </main>
  );
}

export default App;
