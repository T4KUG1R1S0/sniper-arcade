import { motion } from 'framer-motion';
import SectionTitle from '@/components/SectionTitle/SectionTitle';
import styles from './About.module.css';
import { Globe, Share2, Code, ShieldCheck, Cpu } from 'lucide-react';

interface AboutProps {
  showTitle?: boolean;
}

export default function About({ showTitle = true }: AboutProps) {
  const teamMembers = [
    {
      name: 'MBDAY',
      role: 'LEAD DEVELOPER',
      bio: 'Architecting high-performance React applications and game physics engines.',
      initials: 'DAY',
      github: '#',
      linkedin: '#',
    },
    {
      name: 'MBDAY',
      role: 'UI/UX DESIGNER',
      bio: 'Crafting dark cyberpunk visual aesthetic, HUD interfaces, and fluid interactions.',
      initials: 'DAY',
      github: '#',
      linkedin: '#',
    },
    {
      name: 'ARDA',
      role: 'GAME MECHANICS',
      bio: 'Designing target recoil, scoring algorithms, and combo multiplier systems.',
      initials: 'NH',
      github: '#',
      linkedin: '#',
    },
  ];

  return (
    <section id="about" className={styles.section}>
      {showTitle && (
        <SectionTitle
          subtitle="BEHIND THE SCOPE"
          title="ABOUT THE"
          highlightTitle="PROJECT."
          description="Built for fast-paced precision shooting enthusiasts using modern web technologies."
        />
      )}

      {/* Story & Tech Spec Banner */}
      <motion.div 
        className={styles.storyBanner}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="corner-accent top-left" />
        <div className="corner-accent top-right" />
        <div className="corner-accent bottom-left" />
        <div className="corner-accent bottom-right" />

        <div className={styles.storyContent}>
          <h3>PRECISION ENGINE OVERVIEW</h3>
          <p>
            SNIPER ARCADE is a modern web-based shooting simulation designed to deliver 60 FPS responsive arcade action directly in the browser.
          </p>
          <p>
            Every shot calculation, hit detection, and score multiplier is processed in real time with zero input lag.
          </p>

          <div className={styles.techStack}>
            <span className={styles.techTag}>REACT 18</span>
            <span className={styles.techTag}>TYPESCRIPT</span>
            <span className={styles.techTag}>VITE</span>
            <span className={styles.techTag}>FRAMER MOTION</span>
            <span className={styles.techTag}>CSS MODULES</span>
          </div>
        </div>

        <div className={styles.storyVisual}>
          <div className={styles.specRow}>
            <span className={styles.specLabel} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Cpu size={14} color="var(--secondary)" /> ENGINE
            </span>
            <span className={styles.specValue}>CANVAS 2D / REACT</span>
          </div>
          <div className={styles.specRow}>
            <span className={styles.specLabel} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Code size={14} color="var(--primary)" /> TARGET REFRESH
            </span>
            <span className={styles.specValue}>60 TICK RATE</span>
          </div>
          <div className={styles.specRow}>
            <span className={styles.specLabel} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <ShieldCheck size={14} color="var(--gold)" /> SECURITY
            </span>
            <span className={styles.specValue}>CLIENT VERIFIED</span>
          </div>
        </div>
      </motion.div>

      {/* Subtitle Team */}
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <h3 style={{ fontSize: '1.5rem', color: 'var(--text-main)', letterSpacing: '0.05em' }}>
          DEVELOPMENT <span className="text-secondary glow-text-secondary">TEAM</span>
        </h3>
      </div>

      {/* Team Grid Cards */}
      <div className={styles.teamGrid}>
        {teamMembers.map((member, index) => (
          <motion.div
            key={member.name}
            className={styles.teamCard}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <div className="corner-accent top-left" />
            <div className="corner-accent top-right" />

            <div className={styles.avatarWrapper}>
              <div className={styles.avatarImg}>{member.initials}</div>
            </div>

            <h4 className={styles.memberName}>{member.name}</h4>
            <div className={styles.memberRole}>{member.role}</div>
            <p className={styles.memberBio}>{member.bio}</p>

            <div className={styles.socialLinks}>
              <a href={member.github} className={styles.socialIcon} aria-label="GitHub">
                <Globe size={18} />
              </a>
              <a href={member.linkedin} className={styles.socialIcon} aria-label="LinkedIn">
                 <Share2 size={18} />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}