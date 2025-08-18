import type { TopAlbum, TopArtist, TopGenre, Track } from "@/types";

type PlayableItem = TopAlbum | TopArtist | TopGenre;

export const getMostPlayedItems = <T extends PlayableItem>(
  tracks: Track[],
  count: number,
  sortBy: "playCount" | "playTime",
  grouper: (track: Track) => string | string[] | undefined,
): T[] => {
  const itemStats = tracks.reduce(
    (acc, track) => {
      const keys = grouper(track);
      if (keys) {
        const keyArray = Array.isArray(keys) ? keys : [keys];
        keyArray.forEach((key) => {
          const k = key.trim();
          if (k) {
            acc[k] = {
              playCount: (acc[k]?.playCount || 0) + track["Play Count"],
              playTime: (acc[k]?.playTime || 0) + track["Total Time"] * track["Play Count"],
              tracks: [...(acc[k]?.tracks || []), track],
            };
          }
        });
      }
      return acc;
    },
    {} as { [key: string]: { playCount: number; playTime: number; tracks: Track[] } },
  );

  return Object.entries(itemStats)
    .sort((a, b) => {
      if (sortBy === "playTime") {
        return b[1].playTime - a[1].playTime;
      }
      return b[1].playCount - a[1].playCount;
    })
    .slice(0, count)
    .map(([name, { playCount, playTime, tracks }]) => ({ name, playCount, playTime, tracks }) as T);
};
