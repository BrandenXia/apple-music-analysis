/**
 * @deprecated This function is deprecated and will be removed in a future version.
 * Use the analysis atoms instead.
 */

import {
  getForgottenFavorites,
  getMostPlayedAlbums,
  getMostPlayedArtists,
  getMostPlayedGenres,
  getMostPlayedTracks,
  getMusicTasteProfile,
  getTopThreeArtists,
  getTopThreeGenres,
  getTotalPlayCount,
  getTotalTime,
} from "./analysis";
import { filterTracks } from "./filter";

import type { Analysis, Track } from "@/types";

export const _analyze = (
  tracks: Track[],
  startDate?: string,
  endDate?: string,
  sortBy: "playCount" | "playTime" = "playCount",
  genreKey: "Grouping" | "Genre" = "Grouping",
  count: number = 5,
  filter: { type: "genre" | "artist" | "album" | null; value: string | null } = {
    type: null,
    value: null,
  },
  searchTerm: string = "",
): Analysis => {
  const filteredTracks = filterTracks(tracks, startDate, endDate, filter, searchTerm, genreKey);

  return {
    mostPlayedTracks: getMostPlayedTracks(filteredTracks, count, sortBy),
    mostPlayedArtists: getMostPlayedArtists(filteredTracks, count, sortBy),
    mostPlayedAlbums: getMostPlayedAlbums(filteredTracks, count, sortBy),
    mostPlayedGenres: getMostPlayedGenres(filteredTracks, count, sortBy, genreKey),
    topThreeGenres: getTopThreeGenres(tracks, count, genreKey),
    topThreeArtists: getTopThreeArtists(tracks, count),
    totalPlayCount: getTotalPlayCount(filteredTracks),
    totalTime: getTotalTime(filteredTracks),
    forgottenFavorites: getForgottenFavorites(filteredTracks, 50),
    musicTasteProfile: getMusicTasteProfile(filteredTracks),
  };
};
