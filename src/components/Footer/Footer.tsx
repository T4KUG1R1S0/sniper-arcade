import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="corner-accent top-left" />
      <div className="corner-accent top-right" />

      <div className={styles.container}>
        {/* Brand Column */}
        <div className={styles.brandCol}>
          <div className={styles.logoText}>
            SNIPER<span className="text-primary glow-text-primary">ARCADE</span>
          </div>
          <p className={styles.brandDesc}>
            High-precision web shooting simulation built for competitive arcade fans and aim training.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className={styles.colTitle}>NAVIGATION</h4>
          <ul className={styles.linkList}>
            <li className={styles.linkItem}><Link to="/">Home</Link></li>
            <li className={styles.linkItem}><Link to="/game">Play Game</Link></li>
            <li className={styles.linkItem}><Link to="/leaderboard">Leaderboard</Link></li>
            <li className={styles.linkItem}><Link to="/about">About Us</Link></li>
            <li className={styles.linkItem}><Link to="/team">Team</Link></li>
          </ul>
        </div>

        {/* Game Modes */}
        <div>
          <h4 className={styles.colTitle}>GAME MODES</h4>
          <ul className={styles.linkList}>
            <li className={styles.linkItem}><Link to="/game">Classic Range</Link></li>
            <li className={styles.linkItem}><Link to="/game">Time Attack</Link></li>
            <li className={styles.linkItem}><Link to="/game">Precision Streak</Link></li>
          </ul>
        </div>

        {/* System Telemetry */}
        <div>
          <h4 className={styles.colTitle}>SYSTEM STATUS</h4>
          <div className={styles.statusCard}>
            <div className={styles.statusHeader}>
              <span className={styles.statusIndicator} />
              <span>TELEMETRY ONLINE</span>
            </div>
            <div className={styles.statusValue}>60 TICK / 100% UP</div>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Shield size={12} color="var(--secondary)" /> Anti-Cheat Active
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className={styles.bottomBar}>
        <div>
          © {new Date().getFullYear()} SNIPER ARCADE. All Rights Reserved.
        </div>
        <div>
          Crafted with <span className={styles.heartText}>♥</span> for High Score Hunters
        </div>
      </div>
    </footer>
  );
}