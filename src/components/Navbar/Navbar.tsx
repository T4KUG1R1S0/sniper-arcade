import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Target, Menu, X, Play, Volume2, VolumeX } from 'lucide-react';
import Button from '@/components/Button/Button';
import { sfx } from '@/utils/audio';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(sfx.getMutedState());
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const handleToggleSound = () => {
    const muted = sfx.toggleMute();
    setIsMuted(muted);
  };

  const navItems = [
    { label: 'ABOUT', path: '/about' },
    { label: 'FEATURES', path: '/#features' },
    { label: 'LEADERBOARD', path: '/leaderboard' },
    { label: 'STATS', path: '/#stats' },
    { label: 'TEAM', path: '/team' },
  ];

  return (
    <>
      <header className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}>
        <div className={styles.container}>
          {/* Logo */}
          <NavLink to="/" className={styles.logo}>
            <Target className={styles.logoIcon} size={28} />
            <span>SNIPER <span className="text-primary">ARCADE</span></span>
          </NavLink>

          {/* Desktop Navigation */}
          <nav>
            <ul className={styles.navLinks}>
              {navItems.map((item) => (
                <li key={item.label}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `${styles.navLink} ${isActive && item.path !== '/#features' && item.path !== '/#stats' ? styles.activeLink : ''}`
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Right side CTA, Sound Toggle & Mobile Toggle */}
          <div className={styles.rightActions} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {/* Audio Mute Toggle Button */}
            <button
              onClick={handleToggleSound}
              aria-label="Toggle Sound Effects"
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                color: isMuted ? 'var(--text-muted)' : 'var(--primary)',
                padding: '0.5rem',
                borderRadius: '6px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s ease',
              }}
            >
              {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>

            <div className={styles.desktopPlayBtn}>
              <Button to="/game" variant="primary" size="sm">
                <Play size={14} fill="currentColor" /> PLAY NOW
              </Button>
            </div>

            <button
              className={styles.hamburger}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className={styles.overlay} onClick={() => setMobileMenuOpen(false)} />
      )}

      <div className={`${styles.mobileMenu} ${mobileMenuOpen ? styles.mobileMenuOpen : ''}`}>
        <div className={styles.mobileMenuHeader}>
          <span className={styles.logo} style={{ fontSize: '1.1rem' }}>
            <Target className={styles.logoIcon} size={22} />
            <span>SNIPER <span className="text-primary">ARCADE</span></span>
          </span>
          <button className={styles.hamburger} onClick={() => setMobileMenuOpen(false)}>
            <X size={24} />
          </button>
        </div>

        <ul className={styles.mobileNavLinks}>
          {navItems.map((item) => (
            <li key={item.label}>
              <NavLink
                to={item.path}
                className={styles.navLink}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <Button to="/game" variant="primary" fullWidth size="md">
            <Play size={16} fill="currentColor" /> PLAY NOW
          </Button>
        </div>
      </div>
    </>
  );
}