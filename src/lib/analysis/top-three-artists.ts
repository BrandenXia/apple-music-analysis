import { getTopItems } from "./top-items";

import type { Track } from "@/types";

export const getTopThreeArtists = (
  tracks: Track[],
  count: number,
): { name: string; count: number }[] => {
  return getTopItems(tracks, count, (track) => track.Artist);
};
