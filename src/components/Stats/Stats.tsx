import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Users, Crosshair, Target, Award, Zap } from 'lucide-react';
import SectionTitle from '@/components/SectionTitle/SectionTitle';
import styles from './Stats.module.css';

// Component for Counter Animation
interface CounterProps {
  from?: number;
  to: number;
  duration?: number;
  suffix?: string;
}

function AnimatedCounter({ from = 0, to, duration = 2, suffix = '' }: CounterProps) {
  const [count, setCount] = useState(from);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      
      // Easing function (easeOutExpo)
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = Math.floor(easeProgress * (to - from) + from);
      
      setCount(current);

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  }, [isInView, from, to, duration]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}{suffix}
    </span>
  );
}

export default function Stats() {
  const statsData = [
    {
      icon: <Users size={22} />,
      label: 'TOTAL PLAYERS',
      value: 12480,
      suffix: '+',
      color: 'var(--secondary)',
    },
    {
      icon: <Crosshair size={22} />,
      label: 'TOTAL SHOTS',
      value: 854200,
      suffix: '',
      color: 'var(--primary)',
    },
    {
      icon: <Target size={22} />,
      label: 'TOTAL HITS',
      value: 792150,
      suffix: '',
      color: 'var(--secondary)',
    },
    {
      icon: <Award size={22} />,
      label: 'BEST SCORE',
      value: 15800,
      suffix: ' PTS',
      color: 'var(--gold)',
    },
    {
      icon: <Zap size={22} />,
      label: 'BEST ACCURACY',
      value: 99,
      suffix: '%',
      color: 'var(--secondary)',
    },
  ];

  return (
    <section id="stats" className={styles.section}>
      <SectionTitle
        subtitle="COMMUNITY METRICS"
        title="PLAYER"
        highlightTitle="PERFORMANCE."
        description="Real-time arcade telemetry tracking total sniper engagements and global precision ratings."
      />

      <div className={styles.statsGrid}>
        {statsData.map((stat, index) => (
          <motion.div
            key={stat.label}
            className={styles.statCard}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <div className="corner-accent top-left" />
            <div className="corner-accent top-right" />

            <div className={styles.iconBox} style={{ color: stat.color, borderColor: stat.color }}>
              {stat.icon}
            </div>

            <div className={styles.value} style={{ color: stat.color }}>
              <AnimatedCounter to={stat.value} suffix={stat.suffix} />
            </div>

            <div className={styles.label}>{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}