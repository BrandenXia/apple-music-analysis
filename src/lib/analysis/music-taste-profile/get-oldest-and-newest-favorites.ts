import { MUSIC_TASTE_PROFILE_OLDEST_NEWEST_COUNT } from "@/lib/constants/analysis";

import { getMostPlayedTracks } from "../most-played-tracks";

import type { TopTrack, Track } from "@/types";

export const getOldestAndNewestFavorites = (
  tracks: Track[],
): { oldestFavorite: TopTrack | undefined; newestFavorite: TopTrack | undefined } => {
  const tracksWithYear = tracks.filter((t) => t.Year);
  const oldestYear = Math.min(...tracksWithYear.map((t) => t.Year));
  const newestYear = Math.max(...tracksWithYear.map((t) => t.Year));
  const oldestTracks = tracksWithYear.filter((t) => t.Year === oldestYear);
  const newestTracks = tracksWithYear.filter((t) => t.Year === newestYear);
  const oldestFavorite = getMostPlayedTracks(
    oldestTracks,
    MUSIC_TASTE_PROFILE_OLDEST_NEWEST_COUNT,
  )[0];
  const newestFavorite = getMostPlayedTracks(
    newestTracks,
    MUSIC_TASTE_PROFILE_OLDEST_NEWEST_COUNT,
  )[0];

  return { oldestFavorite, newestFavorite };
};
