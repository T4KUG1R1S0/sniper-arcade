import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Crown, Trophy, Target, Zap, ShieldAlert } from 'lucide-react';
import SectionTitle from '@/components/SectionTitle/SectionTitle';
import { LeaderboardEntry } from '@/types/leaderboard';
import { getStoredLeaderboard } from '@/utils/leaderboardData';
import styles from './LeaderboardPage.module.css';

type ModeFilter = 'all' | 'classic' | 'time-attack' | 'precision';

export default function LeaderboardPage() {
  const [filter, setFilter] = useState<ModeFilter>('all');
  const [scores, setScores] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    const data = getStoredLeaderboard();
    setScores(data);
  }, []);

  // Filtering & Sorting (Skor Tertinggi ke Terendah)
  const filteredScores = scores
    .filter((s) => (filter === 'all' ? true : s.mode === filter))
    .sort((a, b) => b.score - a.score);

  const topThree = filteredScores.slice(0, 3);
  
  return (
    <div className={styles.container}>
      {/* Header Section */}
      <div className={styles.header}>
        <SectionTitle
          title="HALL OF FAME"
          subtitle="GLOBAL LEADERBOARD & TOP MARKS"
          align="center"
        />
        <p className={styles.subtitle}>
          Top high-precision marksmen ordered by overall performance and accuracy.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className={styles.filterContainer}>
        {(['all', 'classic', 'time-attack', 'precision'] as ModeFilter[]).map((mode) => (
          <button
            key={mode}
            className={`${styles.tabBtn} ${filter === mode ? styles.activeTab : ''}`}
            onClick={() => setFilter(mode)}
          >
            {mode.toUpperCase().replace('-', ' ')}
          </button>
        ))}
      </div>

      {/* Top 3 Podium Section */}
      {topThree.length > 0 && (
        <div className={styles.podiumGrid}>
          {/* Rank 2 (Silver) */}
          {topThree[1] && (
            <motion.div
              className={`${styles.podiumCard} ${styles.rank2}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className={styles.badgeIcon}>
                <Trophy size={20} color="#c0c0c0" />
              </div>
              <div className={styles.podiumName}>{topThree[1].username}</div>
              <div className={styles.podiumScore}>{topThree[1].score.toLocaleString()} PTS</div>
              <div className={styles.podiumStats}>
                <span>ACC: {topThree[1].accuracy}%</span>
                <span>COMBO: {topThree[1].maxCombo}x</span>
              </div>
            </motion.div>
          )}

          {/* Rank 1 (Gold) */}
          {topThree[0] && (
            <motion.div
              className={`${styles.podiumCard} ${styles.rank1}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className={styles.badgeIcon}>
                <Crown size={24} color="var(--gold)" />
              </div>
              <div className={styles.podiumName} style={{ color: 'var(--gold)' }}>
                {topThree[0].username}
              </div>
              <div className={styles.podiumScore}>{topThree[0].score.toLocaleString()} PTS</div>
              <div className={styles.podiumStats}>
                <span>ACC: {topThree[0].accuracy}%</span>
                <span>COMBO: {topThree[0].maxCombo}x</span>
              </div>
            </motion.div>
          )}

          {/* Rank 3 (Bronze) */}
          {topThree[2] && (
            <motion.div
              className={`${styles.podiumCard} ${styles.rank3}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className={styles.badgeIcon}>
                <Trophy size={20} color="#cd7f32" />
              </div>
              <div className={styles.podiumName}>{topThree[2].username}</div>
              <div className={styles.podiumScore}>{topThree[2].score.toLocaleString()} PTS</div>
              <div className={styles.podiumStats}>
                <span>ACC: {topThree[2].accuracy}%</span>
                <span>COMBO: {topThree[2].maxCombo}x</span>
              </div>
            </motion.div>
          )}
        </div>
      )}

      {/* Leaderboard Data Table */}
      <div className={styles.tableCard}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>RANK</th>
              <th>PLAYER</th>
              <th>SCORE</th>
              <th>ACCURACY</th>
              <th>MAX COMBO</th>
              <th>MODE</th>
              <th>DATE</th>
            </tr>
          </thead>
          <tbody>
            {filteredScores.map((entry, index) => (
              <tr key={entry.id}>
                <td className={styles.rankBadge}>#{index + 1}</td>
                <td style={{ fontWeight: 'bold' }}>{entry.username}</td>
                <td style={{ color: 'var(--gold)', fontFamily: 'var(--font-heading)', fontSize: '1.1rem' }}>
                  {entry.score.toLocaleString()}
                </td>
                <td>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    <Target size={14} color="var(--secondary)" /> {entry.accuracy}%
                  </span>
                </td>
                <td>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    <Zap size={14} color="var(--primary)" /> {entry.maxCombo}x
                  </span>
                </td>
                <td>
                  <span style={{ textTransform: 'uppercase', fontSize: '0.75rem', opacity: 0.8 }}>
                    {entry.mode}
                  </span>
                </td>
                <td style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{entry.date}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredScores.length === 0 && (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
            <ShieldAlert size={32} style={{ marginBottom: '0.5rem' }} />
            <p>No high scores recorded for this mode yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}