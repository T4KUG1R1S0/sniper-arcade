import { motion } from 'framer-motion';
import { Play, Crosshair, Zap, Timer, Award } from 'lucide-react';
import SectionTitle from '@/components/SectionTitle/SectionTitle';
import Button from '@/components/Button/Button';
import styles from './GamePreview.module.css';

export default function GamePreview() {
  return (
    <section className={styles.previewSection}>
      <SectionTitle
        subtitle="GAMEPLAY MOCKUP"
        title="ENTER THE"
        highlightTitle="RANGE."
        description="Experience the high-contrast HUD and responsive controls built for instant tactical awareness."
      />

      <motion.div 
        className={styles.mockupContainer}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="corner-accent top-left" />
        <div className="corner-accent top-right" />
        <div className="corner-accent bottom-left" />
        <div className="corner-accent bottom-right" />

        {/* Viewport Screen Simulation */}
        <div className={styles.viewport}>
          <div className={styles.rangeGrid} />

          {/* HUD Top Bar Overlay */}
          <div className={styles.hudTopBar}>
            <div className={styles.hudStatBox}>
              <span className={styles.hudLabel} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Award size={12} color="var(--gold)" /> SCORE
              </span>
              <span className={styles.hudValue} style={{ color: 'var(--gold)' }}>14,250</span>
            </div>

            <div className={styles.hudStatBox}>
              <span className={styles.hudLabel} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Crosshair size={12} color="var(--secondary)" /> ACCURACY
              </span>
              <span className={styles.hudValue} style={{ color: 'var(--secondary)' }}>98.4%</span>
            </div>

            <div className={styles.hudStatBox}>
              <span className={styles.hudLabel} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Timer size={12} color="var(--text-muted)" /> TIME
              </span>
              <span className={styles.hudValue}>00:45</span>
            </div>

            <div className={styles.hudStatBox}>
              <span className={styles.hudLabel} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Zap size={12} color="var(--primary)" /> COMBO
              </span>
              <span className={styles.hudValue} style={{ color: 'var(--primary)' }}>7X STREAK</span>
            </div>
          </div>

          {/* Center Sniper Scope HUD Target */}
          <div className={styles.scopeContainer}>
            <div className={styles.crosshairHairH} />
            <div className={styles.crosshairHairV} />
            
            <div className={styles.dummyTarget}>
              <div className={styles.dummyTargetCenter} />
            </div>
          </div>
        </div>

        {/* Bottom CTA Control Bar */}
        <div className={styles.bottomAction}>
          <span className={styles.actionText}>
            Ready to test your precision against the global leaderboard?
          </span>
          <Button to="/game" variant="primary" size="md">
            <Play size={16} fill="currentColor" /> PLAY THE GAME
          </Button>
        </div>
      </motion.div>
    </section>
  );
}