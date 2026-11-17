// Helpers used by the components vendored from Animata (https://animata.design, MIT).
export { cn } from '@/lib/utils/helper';

// Linear interpolation
export function lerp(a: number, b: number, n: number) {
  return (1 - n) * a + n * b;
}

// Distance between two points
export function getDistance(x1: number, y1: number, x2: number, y2: number) {
  return Math.hypot(x2 - x1, y2 - y1);
}
