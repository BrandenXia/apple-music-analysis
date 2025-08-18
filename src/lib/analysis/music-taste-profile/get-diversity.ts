import {
  MUSIC_TASTE_PROFILE_DIVERSITY_UNIQUE_ARTISTS,
  MUSIC_TASTE_PROFILE_SCORE_MULTIPLIER,
} from "@/lib/constants/analysis";

import type { Track } from "@/types";

export const getDiversity = (tracks: Track[]) => {
  const uniqueArtists = new Set(tracks.map((t) => t.Artist));
  const diversityScore =
    Math.min(uniqueArtists.size / MUSIC_TASTE_PROFILE_DIVERSITY_UNIQUE_ARTISTS, 1) *
    MUSIC_TASTE_PROFILE_SCORE_MULTIPLIER;

  return {
    score: diversityScore,
    description: `You have listened to ${uniqueArtists.size} different artists.`,
  };
};
