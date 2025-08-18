import {
  MUSIC_TASTE_PROFILE_SPECIALIST_RATIO_THRESHOLD,
  MUSIC_TASTE_PROFILE_TOP_DECADE_ARTISTS_COUNT,
} from "@/lib/constants/analysis";

import type { Track } from "@/types";

export const getListenerType = (tracks: Track[]) => {
  const artistPlayCounts = Object.values(
    tracks.reduce(
      (acc, track) => {
        acc[track.Artist] = (acc[track.Artist] || 0) + track["Play Count"];
        return acc;
      },
      {} as { [key: string]: number },
    ),
  );
  const top10ArtistsPlayCount = artistPlayCounts
    .sort((a, b) => b - a)
    .slice(0, MUSIC_TASTE_PROFILE_TOP_DECADE_ARTISTS_COUNT)
    .reduce((acc, count) => acc + count, 0);
  const totalPlayCount = artistPlayCounts.reduce((acc, count) => acc + count, 0);
  const specialistRatio = totalPlayCount > 0 ? top10ArtistsPlayCount / totalPlayCount : 0;

  return specialistRatio > MUSIC_TASTE_PROFILE_SPECIALIST_RATIO_THRESHOLD
    ? {
        type: "Specialist" as const,
        description: "You're a Specialist! You love a few artists and listen to them a lot.",
      }
    : {
        type: "Generalist" as const,
        description:
          "You're a Generalist! You have a diverse taste and listen to a wide variety of artists.",
      };
};
