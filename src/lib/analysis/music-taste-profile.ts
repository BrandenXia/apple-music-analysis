import {
  MUSIC_TASTE_PROFILE_DIVERSITY_UNIQUE_ARTISTS,
  MUSIC_TASTE_PROFILE_OLDEST_NEWEST_COUNT,
  MUSIC_TASTE_PROFILE_SCORE_MULTIPLIER,
  MUSIC_TASTE_PROFILE_SPECIALIST_RATIO_THRESHOLD,
  MUSIC_TASTE_PROFILE_TIME_TRAVELER_UNIQUE_DECADES,
  MUSIC_TASTE_PROFILE_TOP_DECADE_ARTISTS_COUNT,
  MUSIC_TASTE_PROFILE_TOP_GENRES_COUNT,
} from "@/lib/constants/analysis";

import { getMostPlayedGenres } from "./most-played-genres";
import { getMostPlayedTracks } from "./most-played-tracks";

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

  // Top Decade
  const decadeCounts = tracks.reduce(
    (acc, track) => {
      if (track.Year) {
        const decade = Math.floor(track.Year / 10) * 10;
        acc[decade] = (acc[decade] || 0) + 1;
      }
      return acc;
    },
    {} as { [key: number]: number },
  );
  const topDecadeEntry = Object.entries(decadeCounts).sort((a, b) => b[1] - a[1])[0];
  const topDecade = topDecadeEntry
    ? { decade: `${topDecadeEntry[0]}s`, count: topDecadeEntry[1] }
    : null;

  // Top Genres
  const topGenres = getMostPlayedGenres(tracks, MUSIC_TASTE_PROFILE_TOP_GENRES_COUNT);

  // Oldest and Newest Favorites
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

  // Listener Type
  const artistPlayCounts = Object.values(
    tracks.reduce(
      (acc, track) => {
        acc[track.Artist] = (acc[track.Artist] || 0) + track["Play Count"];
        return acc;
      },
      {} as { [key: string]: number },
    ),
  );
  const top10ArtistsPlayCount = artistPlayCounts
    .sort((a, b) => b - a)
    .slice(0, MUSIC_TASTE_PROFILE_TOP_DECADE_ARTISTS_COUNT)
    .reduce((acc, count) => acc + count, 0);
  const totalPlayCount = artistPlayCounts.reduce((acc, count) => acc + count, 0);
  const specialistRatio = totalPlayCount > 0 ? top10ArtistsPlayCount / totalPlayCount : 0;

  const listenerType =
    specialistRatio > MUSIC_TASTE_PROFILE_SPECIALIST_RATIO_THRESHOLD
      ? {
          type: "Specialist" as const,
          description: "You're a Specialist! You love a few artists and listen to them a lot.",
        }
      : {
          type: "Generalist" as const,
          description:
            "You're a Generalist! You have a diverse taste and listen to a wide variety of artists.",
        };

  // Diversity
  const uniqueArtists = new Set(tracks.map((t) => t.Artist));
  const diversityScore =
    Math.min(uniqueArtists.size / MUSIC_TASTE_PROFILE_DIVERSITY_UNIQUE_ARTISTS, 1) *
    MUSIC_TASTE_PROFILE_SCORE_MULTIPLIER;
  const diversity = {
    score: diversityScore,
    description: `You have listened to ${uniqueArtists.size} different artists.`,
  };

  // Time Traveler
  const uniqueDecades = new Set(
    tracks.map((t) => (t.Year ? Math.floor(t.Year / 10) * 10 : null)).filter(Boolean),
  );
  const timeTravelerScore =
    Math.min(uniqueDecades.size / MUSIC_TASTE_PROFILE_TIME_TRAVELER_UNIQUE_DECADES, 1) *
    MUSIC_TASTE_PROFILE_SCORE_MULTIPLIER;
  const timeTraveler = {
    score: timeTravelerScore,
    description: `You have listened to music from ${uniqueDecades.size} different decades.`,
  };

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
