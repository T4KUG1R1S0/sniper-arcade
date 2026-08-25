export interface LeaderboardEntry {
  id: string;
  username: string;
  score: number;
  accuracy: number;
  maxCombo: number;
  mode: string;
  avatar?: string; // Add this line
  date: string;
}