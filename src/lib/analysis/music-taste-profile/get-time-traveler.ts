import {
  MUSIC_TASTE_PROFILE_SCORE_MULTIPLIER,
  MUSIC_TASTE_PROFILE_TIME_TRAVELER_UNIQUE_DECADES,
} from "@/lib/constants/analysis";

import type { Track } from "@/types";

export const getTimeTraveler = (tracks: Track[]) => {
  const uniqueDecades = new Set(
    tracks.map((t) => (t.Year ? Math.floor(t.Year / 10) * 10 : null)).filter(Boolean),
  );
  const timeTravelerScore =
    Math.min(uniqueDecades.size / MUSIC_TASTE_PROFILE_TIME_TRAVELER_UNIQUE_DECADES, 1) *
    MUSIC_TASTE_PROFILE_SCORE_MULTIPLIER;

  return {
    score: timeTravelerScore,
    description: `You have listened to music from ${uniqueDecades.size} different decades.`,
  };
};
