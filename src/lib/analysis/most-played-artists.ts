import { getMostPlayedItems } from "./most-played";

import type { TopArtist, Track } from "@/types";

export const getMostPlayedArtists = (
  tracks: Track[],
  count: number,
  sortBy: "playCount" | "playTime" = "playCount",
): TopArtist[] => {
  return getMostPlayedItems<TopArtist>(tracks, count, sortBy, (track) => track.Artist);
};
