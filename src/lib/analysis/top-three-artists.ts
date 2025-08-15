import type { Track } from "@/types";

export const getTopThreeArtists = (
  tracks: Track[],
  count: number,
): { name: string; count: number }[] => {
  const artistCounts = tracks.reduce(
    (acc, track) => {
      acc[track.Artist] = (acc[track.Artist] || 0) + 1;
      return acc;
    },
    {} as { [key: string]: number },
  );

  return Object.entries(artistCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, count)
    .map(([name, count]) => ({ name, count }));
};
