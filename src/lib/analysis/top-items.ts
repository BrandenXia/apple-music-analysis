import type { Track } from "@/types";

export const getTopItems = (
  tracks: Track[],
  count: number,
  grouper: (track: Track) => string | string[] | undefined,
): { name: string; count: number }[] => {
  const itemCounts = tracks.reduce(
    (acc, track) => {
      const keys = grouper(track);
      if (keys) {
        const keyArray = Array.isArray(keys) ? keys : [keys];
        keyArray.forEach((key) => {
          const k = key.trim();
          if (k) {
            acc[k] = (acc[k] || 0) + 1;
          }
        });
      }
      return acc;
    },
    {} as { [key: string]: number },
  );

  return Object.entries(itemCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, count)
    .map(([name, count]) => ({ name, count }));
};
