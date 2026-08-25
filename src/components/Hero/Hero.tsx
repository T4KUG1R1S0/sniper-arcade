import { motion } from 'framer-motion';
import { Play, Trophy, Crosshair, Zap, ShieldAlert } from 'lucide-react';
import Button from '@/components/Button/Button';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.heroSection}>
      <div className={styles.grid}>
        {/* Left Column: Title & Actions */}
        <motion.div 
          className={styles.leftContent}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className={styles.badge}>
            <span className={styles.pulseDot} />
            <span>ARCADE SHOOTER EXPERIENCE</span>
          </div>

          <h1 className={styles.title}>
            SNIPER <br />
            <span className="text-primary glow-text-primary">ARCADE</span> <br />
            SHOOTER
          </h1>

          <p className={styles.description}>
            An arcade sniper experience built for precision, speed and competition. 
            Lock your target, hit consecutive headshots, and dominate the leaderboard.
          </p>

          <div className={styles.actionButtons}>
            <Button to="/game" variant="primary" size="lg">
              <Play size={20} fill="currentColor" /> PLAY GAME
            </Button>
            <Button to="/leaderboard" variant="outline" size="lg">
              <Trophy size={20} className="text-gold" /> VIEW LEADERBOARD
            </Button>
          </div>
        </motion.div>

        {/* Right Column: Interactive Sniper HUD Visual */}
        <motion.div 
          className={styles.visualContainer}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Cyberpunk Scope Frame */}
          <div className={styles.scopeFrame}>
            <div className="corner-accent top-left" />
            <div className="corner-accent top-right" />
            <div className="corner-accent bottom-left" />
            <div className="corner-accent bottom-right" />

            <div className={styles.crosshairCenter}>
              <div className={styles.crosshairLineH} />
              <div className={styles.crosshairLineV} />
              <Crosshair size={48} color="var(--secondary)" style={{ opacity: 0.6 }} />
              
              {/* Moving Target Animation */}
              <div className={styles.targetDot} />
            </div>
          </div>

          {/* Floating HUD Badges */}
          <motion.div 
            className={`${styles.hudCard} ${styles.hudCardTopRight}`}
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Zap size={18} color="var(--secondary)" />
            <div>
              <div className="text-muted" style={{ fontSize: '0.7rem' }}>WIND SPEED</div>
              <div className={styles.hudValue}>2.4 MPH <span className="text-secondary">NNE</span></div>
            </div>
          </motion.div>

          <motion.div 
            className={`${styles.hudCard} ${styles.hudCardBottomLeft}`}
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          >
            <ShieldAlert size={18} color="var(--primary)" />
            <div>
              <div className="text-muted" style={{ fontSize: '0.7rem' }}>TARGET DISTANCE</div>
              <div className={styles.hudValue}>450m <span className="text-primary">LOCKED</span></div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}