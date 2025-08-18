import { getMostPlayedItems } from "./most-played";

import type { TopGenre, Track } from "@/types";

export const getMostPlayedGenres = (
  tracks: Track[],
  count: number,
  sortBy: "playCount" | "playTime" = "playCount",
  genreKey: "Grouping" | "Genre" = "Grouping",
): TopGenre[] => {
  const grouper = (track: Track) => {
    const genreSource = track[genreKey] || (genreKey === "Grouping" ? track.Genre : undefined);
    return genreSource ? genreSource.split(",") : undefined;
  };

  return getMostPlayedItems<TopGenre>(tracks, count, sortBy, grouper);
};
