import {
  getMostPlayedAlbums,
  getMostPlayedArtists,
  getMostPlayedGenres,
  getMostPlayedTracks,
} from "./";

import type { Library, TopAlbum, TopArtist, TopGenre, TopTrack } from "@/types";

export interface MostPlayedSnapshot {
  importedAt: Date;
  mostPlayedTracks: TopTrack[];
  mostPlayedArtists: TopArtist[];
  mostPlayedAlbums: TopAlbum[];
  mostPlayedGenres: TopGenre[];
}

export const getMostPlayedTrends = (
  allLibraries: { importedAt: Date; data: Library }[],
  sortBy: "playCount" | "playTime" = "playCount",
  count: number = 50,
): MostPlayedSnapshot[] => {
  const trends: MostPlayedSnapshot[] = [];

  for (const lib of allLibraries) {
    const tracks = lib.data.tracks;
    trends.push({
      importedAt: lib.importedAt,
      mostPlayedTracks: getMostPlayedTracks(tracks, count, sortBy),
      mostPlayedArtists: getMostPlayedArtists(tracks, count, sortBy),
      mostPlayedAlbums: getMostPlayedAlbums(tracks, count, sortBy),
      mostPlayedGenres: getMostPlayedGenres(tracks, count, sortBy, "Grouping"),
    });
  }

  return trends;
};
