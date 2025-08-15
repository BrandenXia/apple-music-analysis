import type { TopAlbum, Track } from "@/types";

export const getMostPlayedAlbums = (
  tracks: Track[],
  count: number,
  sortBy: "playCount" | "playTime" = "playCount",
): TopAlbum[] => {
  const albumStats = tracks.reduce(
    (acc, track) => {
      acc[track.Album] = {
        playCount: (acc[track.Album]?.playCount || 0) + track["Play Count"],
        playTime: (acc[track.Album]?.playTime || 0) + track["Total Time"] * track["Play Count"],
        tracks: [...(acc[track.Album]?.tracks || []), track],
      };
      return acc;
    },
    {} as { [key: string]: { playCount: number; playTime: number; tracks: Track[] } },
  );

  return Object.entries(albumStats)
    .sort((a, b) => {
      if (sortBy === "playTime") {
        return b[1].playTime - a[1].playTime;
      }
      return b[1].playCount - a[1].playCount;
    })
    .slice(0, count)
    .map(([name, { playCount, playTime, tracks }]) => ({ name, playCount, playTime, tracks }));
};
