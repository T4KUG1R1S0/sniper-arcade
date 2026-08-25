export type TargetType = 'STANDARD' | 'GOLDEN' | 'BOMB';

export interface Target {
  id: string;
  x: number;
  y: number;
  radius: number;
  type: TargetType;
  points: number;
  speedX: number;
  speedY: number;
  spawnTime: number;
  duration: number; // Durasi sebelum hilang (ms)
}

export interface FloatingText {
  id: string;
  text: string;
  x: number;
  y: number;
  color: string;
  opacity: number;
}