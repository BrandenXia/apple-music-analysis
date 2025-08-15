import Fuse from "fuse.js";

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

import type { Analysis, Track } from "@/types";

export const analyze = (
  tracks: Track[],
  startDate?: string,
  endDate?: string,
  sortBy: "playCount" | "playTime" = "playCount",
  genreKey: "Grouping" | "Genre" = "Grouping",
  count: number = 5,
  filter: { type: "genre" | "artist" | null; value: string | null } = { type: null, value: null },
  searchTerm: string = "",
): Analysis => {
  let filteredTracks = tracks;
  if (startDate && endDate) {
    filteredTracks = tracks.filter((track) => {
      const dateAdded = new Date(track["Date Added"]);
      return dateAdded >= new Date(startDate) && dateAdded <= new Date(endDate);
    });
  }

  let analysisTracks = filteredTracks;
  if (filter.type && filter.value) {
    analysisTracks = filteredTracks.filter((track) => {
      if (filter.type === "genre") {
        const genreSource = track[genreKey] || (genreKey === "Grouping" ? track.Genre : undefined);
        return genreSource?.includes(filter.value!);
      }
      if (filter.type === "artist") {
        return track.Artist === filter.value;
      }
      return true;
    });
  }

  if (searchTerm) {
    const fuse = new Fuse(analysisTracks, {
      keys: ["Name", "Artist", "Album"],
      threshold: 0.3,
    });
    analysisTracks = fuse.search(searchTerm).map((result) => result.item);
  }

  return {
    mostPlayedTracks: getMostPlayedTracks(analysisTracks, 50, sortBy),
    mostPlayedArtists: getMostPlayedArtists(analysisTracks, 50, sortBy),
    mostPlayedAlbums: getMostPlayedAlbums(analysisTracks, 50, sortBy),
    mostPlayedGenres: getMostPlayedGenres(analysisTracks, 50, sortBy, genreKey),
    topThreeGenres: getTopThreeGenres(filteredTracks, count, genreKey),
    topThreeArtists: getTopThreeArtists(filteredTracks, count),
    totalPlayCount: getTotalPlayCount(analysisTracks),
    totalTime: getTotalTime(analysisTracks),
    forgottenFavorites: getForgottenFavorites(analysisTracks, 50),
    musicTasteProfile: getMusicTasteProfile(analysisTracks),
  };
};
