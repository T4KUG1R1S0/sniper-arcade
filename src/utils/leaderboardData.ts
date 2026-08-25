import { LeaderboardEntry } from '@/types/leaderboard';

const STORAGE_KEY = 'sniper_arcade_leaderboard';

// Data Awal Mock Highscore dengan Avatar Default
export const INITIAL_LEADERBOARD: LeaderboardEntry[] = [
  { id: '1', username: 'VortexSniper', score: 14250, accuracy: 96, maxCombo: 18, mode: 'classic', avatar: '🎯', date: '2026-08-20' },
  { id: '2', username: 'CyberGunn3r', score: 12800, accuracy: 92, maxCombo: 15, mode: 'classic', avatar: '🥷', date: '2026-08-21' },
  { id: '3', username: 'NeonHawk', score: 11400, accuracy: 89, maxCombo: 12, mode: 'classic', avatar: '⚡', date: '2026-08-22' },
  { id: '4', username: 'ShadowAim', score: 9850, accuracy: 85, maxCombo: 10, mode: 'classic', avatar: '💀', date: '2026-08-23' },
  { id: '5', username: 'PixelTrigger', score: 8700, accuracy: 81, maxCombo: 8, mode: 'classic', avatar: '🤖', date: '2026-08-24' },
  
  // Time Attack Mode
  { id: '6', username: 'SpeedShooter', score: 18900, accuracy: 98, maxCombo: 24, mode: 'time-attack', avatar: '⚡', date: '2026-08-20' },
  { id: '7', username: 'VortexSniper', score: 16500, accuracy: 94, maxCombo: 20, mode: 'time-attack', avatar: '🎯', date: '2026-08-22' },
  
  // Precision Streak Mode
  { id: '8', username: 'OneShotMaster', score: 15400, accuracy: 100, maxCombo: 30, mode: 'precision', avatar: '🎯', date: '2026-08-23' },
  { id: '9', username: 'BullseyePro', score: 13100, accuracy: 97, maxCombo: 22, mode: 'precision', avatar: '👾', date: '2026-08-24' },
];

export const getStoredLeaderboard = (): LeaderboardEntry[] => {
  if (typeof window === 'undefined') return INITIAL_LEADERBOARD;
  
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_LEADERBOARD));
    return INITIAL_LEADERBOARD;
  }
  
  try {
    return JSON.parse(data);
  } catch {
    return INITIAL_LEADERBOARD;
  }
};

export const saveScoreToLeaderboard = (entry: Omit<LeaderboardEntry, 'id' | 'date'>) => {
  const current = getStoredLeaderboard();
  
  const newEntry: LeaderboardEntry = {
    ...entry,
    avatar: entry.avatar || '🎯', // Avatar fallback jika tidak diisi
    id: Date.now().toString(),
    date: new Date().toISOString().split('T')[0],
  };

  // Gabungkan, urutkan berdasarkan skor tertinggi, dan simpan Top 100
  const updated = [...current, newEntry]
    .sort((a, b) => b.score - a.score)
    .slice(0, 100);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
};