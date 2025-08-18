import { getMostPlayedItems } from "./most-played";

import type { TopAlbum, Track } from "@/types";

export const getMostPlayedAlbums = (
  tracks: Track[],
  count: number,
  sortBy: "playCount" | "playTime" = "playCount",
): TopAlbum[] => {
  return getMostPlayedItems<TopAlbum>(tracks, count, sortBy, (track) => track.Album);
};
