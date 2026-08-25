export interface LeaderboardEntry {
  id: string;
  rank?: number;
  username: string;
  score: number;
  accuracy: number;
  maxCombo: number;
  mode: 'classic' | 'time-attack' | 'precision';
  avatarUrl?: string;
  date: string;
}