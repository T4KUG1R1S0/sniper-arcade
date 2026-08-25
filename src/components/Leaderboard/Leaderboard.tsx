import { motion } from 'framer-motion';
import { Crown, Trophy } from 'lucide-react';
import SectionTitle from '@/components/SectionTitle/SectionTitle';
import styles from './Leaderboard.module.css';

interface LeaderboardProps {
  showTitle?: boolean;
}

export default function Leaderboard({ showTitle = true }: LeaderboardProps) {
  // Dummy Leaderboard Data
  const topPlayers = [
    { rank: 1, name: 'TAKUGIRISO', score: '15,800', accuracy: '99.2%', hits: 158, headshots: 142 },
    { rank: 2, name: 'SHADOW', score: '14,250', accuracy: '98.4%', hits: 145, headshots: 120 },
    { rank: 3, name: 'SNIPERX', score: '13,900', accuracy: '97.8%', hits: 141, headshots: 115 },
  ];

  const otherPlayers = [
    { rank: 4, name: 'RAVEN', score: '12,750', accuracy: '96.5%' },
    { rank: 5, name: 'GHOST', score: '11,900', accuracy: '95.1%' },
    { rank: 6, name: 'VORTEX', score: '10,820', accuracy: '94.2%' },
    { rank: 7, name: 'PHANTOM', score: '9,950', accuracy: '92.8%' },
    { rank: 8, name: 'CYBER_KILL', score: '9,200', accuracy: '91.0%' },
  ];

  return (
    <section id="leaderboard" className={styles.section}>
      {showTitle && (
        <SectionTitle
          subtitle="HALL OF FAME"
          title="GLOBAL"
          highlightTitle="LEADERBOARD."
          description="Top marksmen ranked by total score, accuracy, and consecutive headshot streaks."
        />
      )}

      {/* Top 3 Podium Cards */}
      <div className={styles.podiumGrid}>
        {/* Rank 2 (Silver) */}
        <motion.div 
          className={`${styles.podiumCard} ${styles.rank2}`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="corner-accent top-left" />
          <div className="corner-accent top-right" />
          <div className={styles.crownBadge}>
            <Trophy size={28} color="#C0C0C0" />
          </div>
          <div className={styles.avatar} style={{ borderColor: '#C0C0C0' }}>02</div>
          <h3 className={styles.username}>{topPlayers[1].name}</h3>
          <div className={styles.score} style={{ color: '#C0C0C0' }}>{topPlayers[1].score}</div>
          <div className={styles.accuracyBadge}>{topPlayers[1].accuracy} ACCURACY</div>
        </motion.div>

        {/* Rank 1 (Gold) */}
        <motion.div 
          className={`${styles.podiumCard} ${styles.rank1}`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="corner-accent top-left" style={{ borderColor: 'var(--gold)' }} />
          <div className="corner-accent top-right" style={{ borderColor: 'var(--gold)' }} />
          <div className={styles.crownBadge}>
            <Crown size={36} color="var(--gold)" />
          </div>
          <div className={styles.avatar} style={{ borderColor: 'var(--gold)', background: 'rgba(245, 196, 81, 0.15)' }}>01</div>
          <h3 className={styles.username}>{topPlayers[0].name}</h3>
          <div className={styles.score} style={{ color: 'var(--gold)' }}>{topPlayers[0].score}</div>
          <div className={styles.accuracyBadge} style={{ color: 'var(--gold)' }}>{topPlayers[0].accuracy} ACCURACY</div>
        </motion.div>

        {/* Rank 3 (Bronze) */}
        <motion.div 
          className={`${styles.podiumCard} ${styles.rank3}`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="corner-accent top-left" />
          <div className="corner-accent top-right" />
          <div className={styles.crownBadge}>
            <Trophy size={28} color="#CD7F32" />
          </div>
          <div className={styles.avatar} style={{ borderColor: '#CD7F32' }}>03</div>
          <h3 className={styles.username}>{topPlayers[2].name}</h3>
          <div className={styles.score} style={{ color: '#CD7F32' }}>{topPlayers[2].score}</div>
          <div className={styles.accuracyBadge}>{topPlayers[2].accuracy} ACCURACY</div>
        </motion.div>
      </div>

      {/* Ranks 4+ Table List */}
      <motion.div 
        className={styles.listContainer}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className={styles.tableHeader}>
          <span>RANK</span>
          <span>PLAYER</span>
          <span>SCORE</span>
          <span className={styles.colAccuracy}>ACCURACY</span>
        </div>

        {otherPlayers.map((player) => (
          <div key={player.rank} className={styles.tableRow}>
            <span className={styles.rankNum}>0{player.rank}</span>
            <span className={styles.playerName}>{player.name}</span>
            <span className={styles.playerScore}>{player.score}</span>
            <span className={`${styles.playerAccuracy} ${styles.colAccuracy}`}>{player.accuracy}</span>
          </div>
        ))}
      </motion.div>
    </section>
  );
}