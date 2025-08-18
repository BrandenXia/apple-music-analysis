import { MUSIC_TASTE_PROFILE_TOP_GENRES_COUNT } from "@/lib/constants/analysis";

import { getMostPlayedGenres } from "../most-played-genres";
import { getDiversity } from "./get-diversity";
import { getListenerType } from "./get-listener-type";
import { getOldestAndNewestFavorites } from "./get-oldest-and-newest-favorites";
import { getTimeTraveler } from "./get-time-traveler";
import { getTopDecade } from "./get-top-decade";

import type { Analysis, Track } from "@/types";

export const getMusicTasteProfile = (tracks: Track[]): Analysis["musicTasteProfile"] => {
  if (tracks.length === 0) {
    return {
      topDecade: null,
      topGenres: [],
      oldestFavorite: undefined,
      newestFavorite: undefined,
      listenerType: {
        type: "Generalist",
        description: "Not enough data to determine listener type.",
      },
      diversity: {
        score: 0,
        description: "Not enough data to calculate diversity.",
      },
      timeTraveler: {
        score: 0,
        description: "Not enough data to calculate time traveler score.",
      },
    };
  }

  const topDecade = getTopDecade(tracks);
  const topGenres = getMostPlayedGenres(tracks, MUSIC_TASTE_PROFILE_TOP_GENRES_COUNT);
  const { oldestFavorite, newestFavorite } = getOldestAndNewestFavorites(tracks);
  const listenerType = getListenerType(tracks);
  const diversity = getDiversity(tracks);
  const timeTraveler = getTimeTraveler(tracks);

  return {
    topDecade,
    topGenres,
    oldestFavorite,
    newestFavorite,
    listenerType,
    diversity,
    timeTraveler,
  };
};
