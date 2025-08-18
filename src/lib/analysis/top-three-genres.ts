import { getTopItems } from "./top-items";

import type { Track } from "@/types";

export const getTopThreeGenres = (
  tracks: Track[],
  count: number,
  genreKey: "Grouping" | "Genre" = "Grouping",
): { name: string; count: number }[] => {
  const grouper = (track: Track) => {
    const genreSource = track[genreKey] || (genreKey === "Grouping" ? track.Genre : undefined);
    return genreSource ? genreSource.split(",") : undefined;
  };

  return getTopItems(tracks, count, grouper);
};
