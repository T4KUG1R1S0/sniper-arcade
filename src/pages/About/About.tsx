import { motion } from 'framer-motion';
import { Target, Cpu, ShieldCheck, Code2 } from 'lucide-react';
import SectionTitle from '@/components/SectionTitle/SectionTitle';
import styles from './About.module.css';

export default function About() {
  const features = [
    {
      icon: <Target size={26} />,
      title: 'Precision Engine',
      desc: 'Built with sub-pixel HTML5 2D Canvas calculation to deliver accurate hitboxes, headshot multipliers, and zero input lag.',
    },
    {
      icon: <Cpu size={26} />,
      title: '60 FPS Performance',
      desc: 'Optimized render loop running smooth frame rates with lightweight asset overhead and pure Web Audio synthesizer SFX.',
    },
    {
      icon: <ShieldCheck size={26} />,
      title: 'Fair Play Telemetry',
      desc: 'Integrates anti-cheat validation and local state checks to ensure high-score integrity across competitive leaderboard sessions.',
    },
  ];

  const techStack = [
    { name: 'React 18', color: '#61dafb' },
    { name: 'TypeScript', color: '#3178c6' },
    { name: 'HTML5 Canvas 2D', color: '#e34f26' },
    { name: 'Framer Motion', color: '#ff0055' },
    { name: 'Web Audio API', color: '#35d6d0' },
  ];

  return (
    <div className={styles.container}>
      {/* Hero Title */}
      <div className={styles.heroSection}>
        <SectionTitle
          title="ABOUT THE PROJECT"
          subtitle="HIGH-PERFORMANCE WEB SHOOTING SIMULATION"
          align="center"
        />
        <p className={styles.subtitle}>
          SNIPER ARCADE was created as an arcade aim trainer designed to test motor skills, flick speed, and reflex precision right inside modern browsers without installing extra plugins.
        </p>
      </div>

      {/* Feature Pillars */}
      <div className={styles.grid}>
        {features.map((item, index) => (
          <motion.div
            key={item.title}
            className={styles.card}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="corner-accent top-left" />
            <div className="corner-accent top-right" />
            <div className={styles.iconWrapper}>{item.icon}</div>
            <h3 className={styles.cardTitle}>{item.title}</h3>
            <p className={styles.cardDesc}>{item.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Core Technology Stack */}
      <div className={styles.techBanner}>
        <div className="corner-accent top-left" />
        <div className="corner-accent top-right" />
        <h3 className={styles.techTitle}>POWERED BY MODERN WEB TECH</h3>
        <div className={styles.techList}>
          {techStack.map((tech) => (
            <div key={tech.name} className={styles.techBadge}>
              <Code2 size={16} color={tech.color} />
              <span>{tech.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}