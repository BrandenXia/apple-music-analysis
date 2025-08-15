import type { TopArtist, Track } from "@/types";

export const getMostPlayedArtists = (
  tracks: Track[],
  count: number,
  sortBy: "playCount" | "playTime" = "playCount",
): TopArtist[] => {
  const artistStats = tracks.reduce(
    (acc, track) => {
      acc[track.Artist] = {
        playCount: (acc[track.Artist]?.playCount || 0) + track["Play Count"],
        playTime: (acc[track.Artist]?.playTime || 0) + track["Total Time"] * track["Play Count"],
        tracks: [...(acc[track.Artist]?.tracks || []), track],
      };
      return acc;
    },
    {} as { [key: string]: { playCount: number; playTime: number; tracks: Track[] } },
  );

  return Object.entries(artistStats)
    .sort((a, b) => {
      if (sortBy === "playTime") {
        return b[1].playTime - a[1].playTime;
      }
      return b[1].playCount - a[1].playCount;
    })
    .slice(0, count)
    .map(([name, { playCount, playTime, tracks }]) => ({ name, playCount, playTime, tracks }));
};
