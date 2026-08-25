import { motion } from 'framer-motion';
import { Target, Flame, Trophy, Gamepad2 } from 'lucide-react';
import SectionTitle from '@/components/SectionTitle/SectionTitle';
import GameCard from '@/components/GameCard/GameCard';

export default function Features() {
  const featureList = [
    {
      icon: <Target size={26} />,
      title: 'PRECISION',
      description: 'Hit your targets with perfect accuracy and claim maximum points per shot.',
    },
    {
      icon: <Flame size={26} />,
      title: 'COMBO',
      description: 'Build your streak with consecutive headshots and multiply your final score.',
    },
    {
      icon: <Trophy size={26} />,
      title: 'LEADERBOARD',
      description: 'Compete for the highest score against players worldwide in real-time.',
    },
    {
      icon: <Gamepad2 size={26} />,
      title: 'ARCADE',
      description: 'Fast-paced arcade shooting experience with instant feedback and intense HUD.',
    },
  ];

  return (
    <section id="features" style={{ padding: '5rem 2rem', maxWidth: '1280px', margin: '0 auto' }}>
      <SectionTitle
        subtitle="CORE MECHANICS"
        title="PRECISION. SPEED."
        highlightTitle="SCORE."
        description="Master the sniper mechanics designed to test your reaction time, precision aim, and streak potential."
      />

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', 
        gap: '1.5rem' 
      }}>
        {featureList.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <GameCard
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}