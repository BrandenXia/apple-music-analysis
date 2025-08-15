import type { TopGenre, Track } from "@/types";

export const getMostPlayedGenres = (
  tracks: Track[],
  count: number,
  sortBy: "playCount" | "playTime" = "playCount",
  genreKey: "Grouping" | "Genre" = "Grouping",
): TopGenre[] => {
  const genreStats = tracks.reduce(
    (acc, track) => {
      const genreSource = track[genreKey] || (genreKey === "Grouping" ? track.Genre : undefined);
      if (genreSource) {
        const genres = genreSource.split(",");
        genres.forEach((genre) => {
          const g = genre.trim();
          if (g) {
            acc[g] = {
              playCount: (acc[g]?.playCount || 0) + track["Play Count"],
              playTime: (acc[g]?.playTime || 0) + track["Total Time"] * track["Play Count"],
              tracks: [...(acc[g]?.tracks || []), track],
            };
          }
        });
      }
      return acc;
    },
    {} as { [key: string]: { playCount: number; playTime: number; tracks: Track[] } },
  );

  return Object.entries(genreStats)
    .sort((a, b) => {
      if (sortBy === "playTime") {
        return b[1].playTime - a[1].playTime;
      }
      return b[1].playCount - a[1].playCount;
    })
    .slice(0, count)
    .map(([name, { playCount, playTime, tracks }]) => ({ name, playCount, playTime, tracks }));
};
