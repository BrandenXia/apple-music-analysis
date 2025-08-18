import { FORGOTTEN_FAVORITES_MONTHS } from "@/lib/constants/analysis";

import type { TopTrack, Track } from "@/types";

export const getForgottenFavorites = (tracks: Track[], count: number): TopTrack[] => {
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - FORGOTTEN_FAVORITES_MONTHS);

  return tracks
    .filter((track) => {
      const lastPlayed = new Date(track["Play Date UTC"]);
      return lastPlayed < sixMonthsAgo;
    })
    .sort((a, b) => b["Play Count"] - a["Play Count"])
    .slice(0, count)
    .map((track) => ({
      name: track.Name,
      artist: track.Artist,
      playCount: track["Play Count"],
      playTime: track["Total Time"] * track["Play Count"],
      track,
    }));
};
