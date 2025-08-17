import { atom } from "jotai";

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
} from "@/lib/analysis";
import { filterTracks } from "@/lib/filter";

import { tracksAtom } from "./data";
import { settingsAtom } from "./settings";

export const filteredTracksAtom = atom((get) => {
  const tracks = get(tracksAtom);
  const { startDate, endDate, filter, searchTerm, genreKey } = get(settingsAtom);
  return filterTracks(tracks, startDate, endDate, filter, searchTerm, genreKey);
});

export const mostPlayedTracksAtom = atom((get) => {
  const tracks = get(filteredTracksAtom);
  const { count, sortBy } = get(settingsAtom);
  return getMostPlayedTracks(tracks, count, sortBy);
});

export const mostPlayedArtistsAtom = atom((get) => {
  const tracks = get(filteredTracksAtom);
  const { count, sortBy } = get(settingsAtom);
  return getMostPlayedArtists(tracks, count, sortBy);
});

export const mostPlayedAlbumsAtom = atom((get) => {
  const tracks = get(filteredTracksAtom);
  const { count, sortBy } = get(settingsAtom);
  return getMostPlayedAlbums(tracks, count, sortBy);
});

export const mostPlayedGenresAtom = atom((get) => {
  const tracks = get(filteredTracksAtom);
  const { count, sortBy, genreKey } = get(settingsAtom);
  return getMostPlayedGenres(tracks, count, sortBy, genreKey);
});

export const topThreeGenresAtom = atom((get) => {
  const tracks = get(tracksAtom);
  const { count, genreKey } = get(settingsAtom);
  return getTopThreeGenres(tracks, count, genreKey);
});

export const topThreeArtistsAtom = atom((get) => {
  const tracks = get(tracksAtom);
  const { count } = get(settingsAtom);
  return getTopThreeArtists(tracks, count);
});

export const totalPlayCountAtom = atom((get) => {
  const tracks = get(filteredTracksAtom);
  return getTotalPlayCount(tracks);
});

export const totalTimeAtom = atom((get) => {
  const tracks = get(filteredTracksAtom);
  return getTotalTime(tracks);
});

export const forgottenFavoritesAtom = atom((get) => {
  const tracks = get(filteredTracksAtom);
  return getForgottenFavorites(tracks, 50);
});

export const musicTasteProfileAtom = atom((get) => {
  const tracks = get(filteredTracksAtom);
  return getMusicTasteProfile(tracks);
});
