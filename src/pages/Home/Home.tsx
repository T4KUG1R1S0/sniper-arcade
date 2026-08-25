import Hero from '@/components/Hero/Hero';
import Features from '@/components/Features/Features';
import GamePreview from '@/components/GamePreview/GamePreview';
import Leaderboard from '@/components/Leaderboard/Leaderboard';
import Stats from '@/components/Stats/Stats';
import About from '@/components/About/About';

export default function Home() {
  return (
    <div>
      <Hero />
      <Features />
      <GamePreview />
      <Leaderboard />
      <Stats />
      <About />
    </div>
  );
}