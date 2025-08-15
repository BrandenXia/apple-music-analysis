import type { TopTrack, Track } from "@/types";

export const getMostPlayedTracks = (
  tracks: Track[],
  count: number,
  sortBy: "playCount" | "playTime" = "playCount",
): TopTrack[] => {
  return tracks
    .sort((a, b) => {
      if (sortBy === "playTime") {
        return b["Total Time"] * b["Play Count"] - a["Total Time"] * a["Play Count"];
      }
      return b["Play Count"] - a["Play Count"];
    })
    .slice(0, count)
    .map((track) => ({
      name: track.Name,
      artist: track.Artist,
      playCount: track["Play Count"],
      playTime: track["Total Time"] * track["Play Count"],
      track,
    }));
};
