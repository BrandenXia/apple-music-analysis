import { getMostPlayedTracks } from "./most-played-tracks";

import type { Analysis, Track } from "@/types";

export const getMusicTasteProfile = (tracks: Track[]): Analysis["musicTasteProfile"] => {
  if (tracks.length === 0) {
    return {
      topDecade: null,
      oldestFavorite: undefined,
      newestFavorite: undefined,
      listenerType: {
        type: "Generalist",
        description: "Not enough data to determine listener type.",
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

  // Oldest and Newest Favorites
  const tracksWithYear = tracks.filter((t) => t.Year);
  const oldestYear = Math.min(...tracksWithYear.map((t) => t.Year));
  const newestYear = Math.max(...tracksWithYear.map((t) => t.Year));
  const oldestTracks = tracksWithYear.filter((t) => t.Year === oldestYear);
  const newestTracks = tracksWithYear.filter((t) => t.Year === newestYear);
  const oldestFavorite = getMostPlayedTracks(oldestTracks, 1)[0];
  const newestFavorite = getMostPlayedTracks(newestTracks, 1)[0];

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
    .slice(0, 10)
    .reduce((acc, count) => acc + count, 0);
  const totalPlayCount = artistPlayCounts.reduce((acc, count) => acc + count, 0);
  const specialistRatio = totalPlayCount > 0 ? top10ArtistsPlayCount / totalPlayCount : 0;

  const listenerType =
    specialistRatio > 0.5
      ? {
          type: "Specialist" as const,
          description: "You're a Specialist! You love a few artists and listen to them a lot.",
        }
      : {
          type: "Generalist" as const,
          description:
            "You're a Generalist! You have a diverse taste and listen to a wide variety of artists.",
        };

  return {
    topDecade,
    oldestFavorite,
    newestFavorite,
    listenerType,
  };
};
