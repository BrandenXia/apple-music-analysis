import type { Track } from "@/types";

export const getTotalPlayCount = (tracks: Track[]): number => {
  return tracks.reduce((acc, track) => acc + track["Play Count"], 0);
};
