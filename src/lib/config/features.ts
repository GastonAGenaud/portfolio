/**
 * Central feature flags.
 *
 * Toggle via NEXT_PUBLIC_* environment variables (preferred), or flip the
 * fallback constant below to enable locally without an env var.
 * Everything here defaults to OFF.
 */

// Flip to `true` to enable the Sports / Training-advisory area locally
// without setting an environment variable.
const SPORT_FALLBACK = false;

export const FEATURES = {
  /**
   * Sports / training-advisory toggle inside the Creative persona.
   * Hidden and disabled by default. When OFF, neither the navbar switch
   * nor the training section render. Enable with:
   *   NEXT_PUBLIC_FEATURE_SPORT=true
   */
  sport: process.env.NEXT_PUBLIC_FEATURE_SPORT === 'true' || SPORT_FALLBACK,
} as const;

export type FeatureKey = keyof typeof FEATURES;
