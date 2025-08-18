import type { Track } from "@/types";

export const getTopDecade = (tracks: Track[]) => {
  const decadeCounts = tracks.reduce(
    (acc, track) => {
      if (track.Year) {
        const decade = Math.floor(track.Year / 10) * 10;
        acc[decade] = (acc[decade] || 0) + 1;
      }
      return acc;
    },
    {} as { [key: number]: number },
  );
  const topDecadeEntry = Object.entries(decadeCounts).sort((a, b) => b[1] - a[1])[0];
  return topDecadeEntry ? { decade: `${topDecadeEntry[0]}s`, count: topDecadeEntry[1] } : null;
};
