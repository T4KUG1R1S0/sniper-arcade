import { saveScoreToLeaderboard } from '@/utils/leaderboardData';
import { useRef, useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Play, RotateCcw, Target, Trophy, Zap, Timer } from 'lucide-react';
import Button from '@/components/Button/Button';
import { sfx } from '@/utils/audio';
import styles from './GameCanvas.module.css';

interface TargetObject {
  id: number;
  x: number;
  y: number;
  radius: number;
  dx: number;
  dy: number;
  isHeadshotZone: boolean;
}

interface FloatingText {
  id: number;
  text: string;
  x: number;
  y: number;
  color: string;
  alpha: number;
}

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

  // Refs untuk game loop mutable data
  const targetsRef = useRef<TargetObject[]>([]);
  const floatingTextsRef = useRef<FloatingText[]>([]);
  const mousePosRef = useRef({ x: -100, y: -100 });
  const shakeRef = useRef(0);
  const animationFrameRef = useRef<number>(0);

  // Perhitungan Akurasi
  const accuracy = shotsFired > 0 ? Math.round((shotsHit / shotsFired) * 100) : 0;

  // Fungsi Spawn Target Acak
  const spawnTarget = useCallback((width: number, height: number) => {
    const radius = Math.floor(Math.random() * 15) + 20; // 20px - 35px
    const x = Math.random() * (width - radius * 2) + radius;
    const y = Math.random() * (height - radius * 2) + radius;
    const dx = (Math.random() - 0.5) * 3;
    const dy = (Math.random() - 0.5) * 3;

    return {
      id: Math.random(),
      x,
      y,
      radius,
      dx,
      dy,
      isHeadshotZone: true,
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
    floatingTextsRef.current = [];
    
    // Spawn 4 target awal
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

    // Menyimpan skor secara otomatis saat GAMEOVER
    useEffect(() => {
        if (gameState === 'GAMEOVER' && score > 0) {
            saveScoreToLeaderboard({
                username: 'Player_Agent', // Default Player Name
                score: score,
                accuracy: accuracy,
                maxCombo: maxCombo,
                mode: 'classic',
            });
        }
    }, [gameState, score, accuracy, maxCombo]);

  // Handle Event Klik/Tembak (Mouse Down / Click)
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (gameState !== 'PLAYING') return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const clickX = (e.clientX - rect.left) * scaleX;
    const clickY = (e.clientY - rect.top) * scaleY;

    // Suara tembakan & efek screen shake
    sfx.playGunshot();
    shakeRef.current = 8;
    setShotsFired((prev) => prev + 1);

    let hit = false;
    const newTargets: TargetObject[] = [];

    targetsRef.current.forEach((target) => {
      const dist = Math.hypot(clickX - target.x, clickY - target.y);

      if (dist <= target.radius) {
        hit = true;
        const isHeadshot = dist <= target.radius * 0.35;
        const points = isHeadshot ? 200 : 100;
        
        // Update Combo & Multiplier
        setCombo((prevCombo) => {
          const nextCombo = prevCombo + 1;
          setMaxCombo((max) => Math.max(max, nextCombo));
          const multiplier = Math.min(Math.floor(nextCombo / 3) + 1, 5);
          const finalScore = points * multiplier;

          setScore((s) => s + finalScore);

          // Pop up floating text
          floatingTextsRef.current.push({
            id: Math.random(),
            text: isHeadshot ? `HEADSHOT +${finalScore}` : `+${finalScore}`,
            x: target.x,
            y: target.y,
            color: isHeadshot ? 'var(--primary)' : 'var(--secondary)',
            alpha: 1.0,
          });

          return nextCombo;
        });

        sfx.playHitSound(isHeadshot);
        setShotsHit((h) => h + 1);

        // Respawn target baru
        newTargets.push(spawnTarget(canvas.width, canvas.height));
      } else {
        newTargets.push(target);
      }
    });

    if (!hit) {
      setCombo(0); // Meleset = Reset Combo Streak
    }

    targetsRef.current = newTargets;
  };

  // Tracking Posisi Cursor Mouse
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

    // Set resolusi internal canvas
    canvas.width = 1280;
    canvas.height = 720;

    const render = () => {
      // Screen Shake Calculation
      ctx.save();
      if (shakeRef.current > 0) {
        const dx = (Math.random() - 0.5) * shakeRef.current;
        const dy = (Math.random() - 0.5) * shakeRef.current;
        ctx.translate(dx, dy);
        shakeRef.current *= 0.85;
        if (shakeRef.current < 0.5) shakeRef.current = 0;
      }

      // 1. Clear Screen / Grid Background
      ctx.fillStyle = '#090d16';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Grid visual
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

      // 2. Render & Move Targets (Hanya jika sedang PLAYING)
      if (gameState === 'PLAYING') {
        targetsRef.current.forEach((t) => {
          // Update Posisi
          t.x += t.dx;
          t.y += t.dy;

          // Bounce Off Walls
          if (t.x - t.radius < 0 || t.x + t.radius > canvas.width) t.dx *= -1;
          if (t.y - t.radius < 0 || t.y + t.radius > canvas.height) t.dy *= -1;

          // Outer Circle
          ctx.beginPath();
          ctx.arc(t.x, t.y, t.radius, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(53, 214, 208, 0.2)';
          ctx.fill();
          ctx.strokeStyle = '#35d6d0';
          ctx.lineWidth = 2;
          ctx.stroke();

          // Inner Headshot Bullseye
          ctx.beginPath();
          ctx.arc(t.x, t.y, t.radius * 0.35, 0, Math.PI * 2);
          ctx.fillStyle = '#ff3b70';
          ctx.fill();
        });

        // 3. Render Floating Text (+Score Animation)
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

        // 4. Custom Sniper Scope Crosshair
        const { x: mx, y: my } = mousePosRef.current;
        if (mx >= 0 && my >= 0) {
          ctx.strokeStyle = '#ff3b70';
          ctx.lineWidth = 1.5;

          // Outer Scope Ring
          ctx.beginPath();
          ctx.arc(mx, my, 25, 0, Math.PI * 2);
          ctx.stroke();

          // Lines Hair Cross
          ctx.beginPath();
          ctx.moveTo(mx - 35, my); ctx.lineTo(mx - 10, my);
          ctx.moveTo(mx + 10, my); ctx.lineTo(mx + 35, my);
          ctx.moveTo(mx, my - 35); ctx.lineTo(mx, my - 10);
          ctx.moveTo(mx, my + 10); ctx.lineTo(mx, my + 35);
          ctx.stroke();

          // Center Red Dot
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
  }, [gameState]);

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
              Test your reflexes. Click targets to score. Hit bullseyes for Headshots and build continuous streaks for score multipliers.
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

            <Button variant="primary" size="lg" onClick={startGame}>
              <RotateCcw size={18} /> PLAY AGAIN
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}