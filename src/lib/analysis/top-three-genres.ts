import type { Track } from "@/types";

export const getTopThreeGenres = (
  tracks: Track[],
  count: number,
  genreKey: "Grouping" | "Genre" = "Grouping",
): { name: string; count: number }[] => {
  const genreCounts = tracks.reduce(
    (acc, track) => {
      const genreSource = track[genreKey] || (genreKey === "Grouping" ? track.Genre : undefined);
      if (genreSource) {
        const genres = genreSource.split(",");
        genres.forEach((genre) => {
          const g = genre.trim();
          if (g) {
            acc[g] = (acc[g] || 0) + 1;
          }
        });
      }
      return acc;
    },
    {} as { [key: string]: number },
  );

  return Object.entries(genreCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, count)
    .map(([name, count]) => ({ name, count }));
};
