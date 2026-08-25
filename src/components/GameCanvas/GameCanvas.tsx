import { saveScoreToLeaderboard } from '@/utils/leaderboardData';
import { useRef, useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Play, RotateCcw, Target, Trophy, Zap, Timer, UserCheck } from 'lucide-react';
import Button from '@/components/Button/Button';
import { sfx } from '@/utils/audio';
import styles from './GameCanvas.module.css';

export type TargetType = 'STANDARD' | 'GOLDEN' | 'BOMB';

interface TargetObject {
  id: number;
  x: number;
  y: number;
  radius: number;
  dx: number;
  dy: number;
  type: TargetType;
  points: number;
  spawnTime: number;
  duration: number;
}

interface FloatingText {
  id: number;
  text: string;
  x: number;
  y: number;
  color: string;
  alpha: number;
}

const AVATAR_OPTIONS = ['🎯', '🥷', '👾', '⚡', '💀', '🤖'];

export default function GameCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [gameState, setGameState] = useState<'IDLE' | 'PLAYING' | 'GAMEOVER'>('IDLE');

  // Game Stats
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [shotsFired, setShotsFired] = useState(0);
  const [shotsHit, setShotsHit] = useState(0);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);

  // User Profile Form State
  const [playerName, setPlayerName] = useState('Agent_Ghost');
  const [selectedAvatar, setSelectedAvatar] = useState('🎯');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Mutable Game Loop References
  const targetsRef = useRef<TargetObject[]>([]);
  const floatingTextsRef = useRef<FloatingText[]>([]);
  const mousePosRef = useRef({ x: -100, y: -100 });
  const shakeRef = useRef(0);
  const animationFrameRef = useRef<number>(0);

  // Perhitungan Akurasi
  const accuracy = shotsFired > 0 ? Math.round((shotsHit / shotsFired) * 100) : 0;

  // Spawner Target Acak
  const spawnTarget = useCallback((width: number, height: number): TargetObject => {
    const margin = 60;
    const x = Math.random() * (width - margin * 2) + margin;
    const y = Math.random() * (height - margin * 2) + margin;

    const rand = Math.random();
    let type: TargetType = 'STANDARD';
    let radius = Math.floor(Math.random() * 10) + 24;
    let points = 100;
    let speedMult = 1;

    if (rand > 0.85) {
      type = 'GOLDEN';
      radius = 18;
      points = 500;
      speedMult = 1.8;
    } else if (rand > 0.70) {
      type = 'BOMB';
      radius = 22;
      points = -300;
      speedMult = 0.5;
    }

    const dx = (Math.random() - 0.5) * 3 * speedMult;
    const dy = (Math.random() - 0.5) * 3 * speedMult;

    return {
      id: Math.random(),
      x,
      y,
      radius,
      dx,
      dy,
      type,
      points,
      spawnTime: Date.now(),
      duration: type === 'GOLDEN' ? 3000 : 5000,
    };
  }, []);

  // Memulai Permainan
  const startGame = () => {
    setScore(0);
    setTimeLeft(60);
    setShotsFired(0);
    setShotsHit(0);
    setCombo(0);
    setMaxCombo(0);
    setIsSubmitted(false);
    floatingTextsRef.current = [];

    const canvas = canvasRef.current;
    if (canvas) {
      targetsRef.current = Array.from({ length: 4 }, () => spawnTarget(canvas.width, canvas.height));
    }

    setGameState('PLAYING');
  };

  // Timer Countdown 60 detik
  useEffect(() => {
    if (gameState !== 'PLAYING') return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setGameState('GAMEOVER');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState]);

  // Submit Skor ke Leaderboard
  const handleSubmitScore = (e: React.FormEvent) => {
    e.preventDefault();
    if (!playerName.trim() || isSubmitted) return;

    saveScoreToLeaderboard({
      username: playerName.trim(),
      score,
      accuracy,
      maxCombo,
      mode: 'classic',
      avatar: selectedAvatar,
    });

    setIsSubmitted(true);
  };

  // Handle Event Klik / Tembak
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (gameState !== 'PLAYING') return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const clickX = (e.clientX - rect.left) * scaleX;
    const clickY = (e.clientY - rect.top) * scaleY;

    sfx.playGunshot();
    shakeRef.current = 8;
    setShotsFired((prev) => prev + 1);

    let hit = false;
    const newTargets: TargetObject[] = [];

    targetsRef.current.forEach((target) => {
      const dist = Math.hypot(clickX - target.x, clickY - target.y);

      if (dist <= target.radius) {
        hit = true;

        if (target.type === 'BOMB') {
          setScore((s) => Math.max(0, s + target.points));
          setCombo(0);
          sfx.playHitSound(false);

          floatingTextsRef.current.push({
            id: Math.random(),
            text: '-300 BOMB!',
            x: target.x,
            y: target.y,
            color: '#ff0055',
            alpha: 1.0,
          });
        } else {
          setShotsHit((h) => h + 1);
          const isHeadshot = dist <= target.radius * 0.35;
          const basePoints = isHeadshot ? target.points * 1.5 : target.points;

          setCombo((prevCombo) => {
            const nextCombo = prevCombo + 1;
            setMaxCombo((max) => Math.max(max, nextCombo));
            const multiplier = Math.min(Math.floor(nextCombo / 3) + 1, 5);
            const finalScore = Math.round(basePoints * multiplier);

            setScore((s) => s + finalScore);

            const textLabel = isHeadshot ? `HEADSHOT +${finalScore}` : `+${finalScore}`;
            const textColor = target.type === 'GOLDEN' ? '#ffb703' : isHeadshot ? 'var(--primary)' : 'var(--secondary)';

            floatingTextsRef.current.push({
              id: Math.random(),
              text: textLabel,
              x: target.x,
              y: target.y,
              color: textColor,
              alpha: 1.0,
            });

            return nextCombo;
          });

          sfx.playHitSound(isHeadshot);
        }

        newTargets.push(spawnTarget(canvas.width, canvas.height));
      } else {
        newTargets.push(target);
      }
    });

    if (!hit) {
      setCombo(0);
    }

    targetsRef.current = newTargets;
  };

  // Posisi Cursor Mouse
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    mousePosRef.current = {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  };

  // Main Canvas Render Loop (60 FPS)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 1280;
    canvas.height = 720;

    const render = () => {
      ctx.save();

      if (shakeRef.current > 0) {
        const dx = (Math.random() - 0.5) * shakeRef.current;
        const dy = (Math.random() - 0.5) * shakeRef.current;
        ctx.translate(dx, dy);
        shakeRef.current *= 0.85;
        if (shakeRef.current < 0.5) shakeRef.current = 0;
      }

      ctx.fillStyle = '#090d16';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = 'rgba(53, 214, 208, 0.05)';
      ctx.lineWidth = 1;
      const gridSize = 60;
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      if (gameState === 'PLAYING') {
        const now = Date.now();

        targetsRef.current = targetsRef.current.map((t) => {
          if (now - t.spawnTime > t.duration) {
            return spawnTarget(canvas.width, canvas.height);
          }

          t.x += t.dx;
          t.y += t.dy;

          if (t.x - t.radius < 0 || t.x + t.radius > canvas.width) t.dx *= -1;
          if (t.y - t.radius < 0 || t.y + t.radius > canvas.height) t.dy *= -1;

          ctx.beginPath();
          ctx.arc(t.x, t.y, t.radius, 0, Math.PI * 2);

          if (t.type === 'GOLDEN') {
            ctx.fillStyle = 'rgba(255, 183, 3, 0.3)';
            ctx.strokeStyle = '#ffb703';
          } else if (t.type === 'BOMB') {
            ctx.fillStyle = 'rgba(255, 0, 85, 0.3)';
            ctx.strokeStyle = '#ff0055';
          } else {
            ctx.fillStyle = 'rgba(53, 214, 208, 0.2)';
            ctx.strokeStyle = '#35d6d0';
          }

          ctx.fill();
          ctx.lineWidth = 2;
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(t.x, t.y, t.radius * 0.35, 0, Math.PI * 2);
          ctx.fillStyle = t.type === 'BOMB' ? '#990000' : '#ff3b70';
          ctx.fill();

          return t;
        });

        floatingTextsRef.current.forEach((ft, index) => {
          ctx.font = 'bold 20px "Teko", sans-serif';
          ctx.fillStyle = ft.color;
          ctx.globalAlpha = ft.alpha;
          ctx.fillText(ft.text, ft.x - 20, ft.y);
          ctx.globalAlpha = 1.0;

          ft.y -= 1.2;
          ft.alpha -= 0.02;

          if (ft.alpha <= 0) {
            floatingTextsRef.current.splice(index, 1);
          }
        });

        const { x: mx, y: my } = mousePosRef.current;
        if (mx >= 0 && my >= 0) {
          ctx.strokeStyle = '#ff3b70';
          ctx.lineWidth = 1.5;

          ctx.beginPath();
          ctx.arc(mx, my, 25, 0, Math.PI * 2);
          ctx.stroke();

          ctx.beginPath();
          ctx.moveTo(mx - 35, my); ctx.lineTo(mx - 10, my);
          ctx.moveTo(mx + 10, my); ctx.lineTo(mx + 35, my);
          ctx.moveTo(mx, my - 35); ctx.lineTo(mx, my - 10);
          ctx.moveTo(mx, my + 10); ctx.lineTo(mx, my + 35);
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(mx, my, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = '#ff3b70';
          ctx.fill();
        }
      }

      ctx.restore();
      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, [gameState, spawnTarget]);

  return (
    <div className={styles.gameWrapper}>
      {/* HUD Bar Superior */}
      <div className={styles.hudBar}>
        <div className={styles.hudItem}>
          <span className={styles.hudLabel} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Trophy size={14} color="var(--gold)" /> SCORE
          </span>
          <span className={styles.hudValue} style={{ color: 'var(--gold)' }}>{score.toLocaleString()}</span>
        </div>

        <div className={styles.hudItem}>
          <span className={styles.hudLabel} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Timer size={14} color="var(--secondary)" /> TIME
          </span>
          <span className={styles.hudValue} style={{ color: timeLeft <= 10 ? 'var(--primary)' : 'var(--text-main)' }}>
            {timeLeft}S
          </span>
        </div>

        <div className={styles.hudItem}>
          <span className={styles.hudLabel} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Zap size={14} color="var(--primary)" /> COMBO
          </span>
          <span className={styles.hudValue} style={{ color: 'var(--primary)' }}>
            {combo}X
          </span>
        </div>

        <div className={styles.hudItem}>
          <span className={styles.hudLabel} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Target size={14} color="var(--secondary)" /> ACCURACY
          </span>
          <span className={styles.hudValue} style={{ color: 'var(--secondary)' }}>
            {accuracy}%
          </span>
        </div>
      </div>

      {/* Main Game Screen Canvas */}
      <div className={styles.canvasContainer}>
        <canvas
          ref={canvasRef}
          className={styles.canvas}
          onClick={handleCanvasClick}
          onMouseMove={handleMouseMove}
        />

        {/* Start Game Modal Overlay */}
        {gameState === 'IDLE' && (
          <div className={styles.overlay}>
            <div className="corner-accent top-left" />
            <div className="corner-accent top-right" />
            <h2 className={styles.overlayTitle}>SNIPER RANGE <span className="text-primary glow-text-primary">ARCADE</span></h2>
            <p style={{ color: 'var(--text-muted)', maxWidth: '450px', marginBottom: '2rem' }}>
              Test your reflexes. Hit Golden targets for +500 pts and avoid Red Bomb targets!
            </p>
            <Button variant="primary" size="lg" onClick={startGame}>
              <Play size={20} fill="currentColor" /> START MISSION
            </Button>
          </div>
        )}

        {/* Game Over Modal Overlay */}
        {gameState === 'GAMEOVER' && (
          <motion.div 
            className={styles.overlay}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="corner-accent top-left" style={{ borderColor: 'var(--gold)' }} />
            <div className="corner-accent top-right" style={{ borderColor: 'var(--gold)' }} />
            
            <h2 className={styles.overlayTitle}>MISSION <span className="text-primary glow-text-primary">COMPLETE</span></h2>

            <div className={styles.summaryGrid}>
              <div className={styles.summaryBox}>
                <div className={styles.hudLabel}>FINAL SCORE</div>
                <div className={styles.hudValue} style={{ color: 'var(--gold)' }}>{score.toLocaleString()}</div>
              </div>
              <div className={styles.summaryBox}>
                <div className={styles.hudLabel}>ACCURACY</div>
                <div className={styles.hudValue} style={{ color: 'var(--secondary)' }}>{accuracy}%</div>
              </div>
              <div className={styles.summaryBox}>
                <div className={styles.hudLabel}>MAX COMBO</div>
                <div className={styles.hudValue} style={{ color: 'var(--primary)' }}>{maxCombo}X</div>
              </div>
            </div>

            {/* Form Input Highscore Agent */}
            <form onSubmit={handleSubmitScore} style={{ marginBottom: '1.5rem', width: '100%', maxWidth: '360px' }}>
              <div style={{ marginBottom: '0.75rem', textAlign: 'left' }}>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>
                  CHOOSE AVATAR & ENTER CALLSIGN
                </label>
                
                {/* Avatar Selection */}
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem', justifyContent: 'center' }}>
                  {AVATAR_OPTIONS.map((av) => (
                    <button
                      type="button"
                      key={av}
                      onClick={() => setSelectedAvatar(av)}
                      style={{
                        background: selectedAvatar === av ? 'var(--primary-glow)' : 'var(--bg-card)',
                        border: `1px solid ${selectedAvatar === av ? 'var(--primary)' : 'var(--border-color)'}`,
                        fontSize: '1.2rem',
                        padding: '0.4rem 0.6rem',
                        borderRadius: '6px',
                        cursor: 'pointer',
                      }}
                    >
                      {av}
                    </button>
                  ))}
                </div>

                <input
                  type="text"
                  maxLength={16}
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  disabled={isSubmitted}
                  placeholder="Enter Agent Name..."
                  style={{
                    width: '100%',
                    padding: '0.6rem 1rem',
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-color)',
                    color: '#fff',
                    borderRadius: '6px',
                    textAlign: 'center',
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.1rem',
                  }}
                />
              </div>

              {!isSubmitted ? (
                <Button variant="secondary" fullWidth size="sm" type="submit">
                  <UserCheck size={16} /> SAVE TO LEADERBOARD
                </Button>
              ) : (
                <div style={{ color: 'var(--secondary)', fontSize: '0.9rem', textAlign: 'center' }}>
                  ✓ Score Saved to Leaderboard!
                </div>
              )}
            </form>

            <Button variant="primary" size="lg" onClick={startGame}>
              <RotateCcw size={18} /> PLAY AGAIN
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}