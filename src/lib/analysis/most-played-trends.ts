import { analyze } from "@/lib/analyzer";

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
    const analysisResult = analyze(lib.data.tracks, undefined, undefined, sortBy, undefined, count);
    if (analysisResult) {
      trends.push({
        importedAt: lib.importedAt,
        mostPlayedTracks: analysisResult.mostPlayedTracks,
        mostPlayedArtists: analysisResult.mostPlayedArtists,
        mostPlayedAlbums: analysisResult.mostPlayedAlbums,
        mostPlayedGenres: analysisResult.mostPlayedGenres,
      });
    }
  }

  return trends;
};
