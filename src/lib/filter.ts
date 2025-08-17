import Fuse from "fuse.js";

import type { Track } from "@/types";

export const filterTracks = (
  tracks: Track[],
  startDate?: string,
  endDate?: string,
  filter: { type: "genre" | "artist" | "album" | null; value: string | null } = {
    type: null,
    value: null,
  },
  searchTerm: string = "",
  genreKey: "Grouping" | "Genre" = "Grouping",
): Track[] => {
  let filteredTracks = tracks;

  if (startDate && endDate)
    filteredTracks = tracks.filter((track) => {
      const dateAdded = new Date(track["Date Added"]);
      return dateAdded >= new Date(startDate) && dateAdded <= new Date(endDate);
    });

  if (filter.type && filter.value)
    filteredTracks = filteredTracks.filter((track) => {
      if (filter.type === "genre") {
        const genreSource = track[genreKey] || (genreKey === "Grouping" ? track.Genre : undefined);
        return genreSource?.includes(filter.value!);
      }
      if (filter.type === "artist") {
        return track.Artist === filter.value;
      }
      if (filter.type === "album") {
        return track.Album === filter.value;
      }
      return true;
    });

  if (searchTerm) {
    const fuse = new Fuse(filteredTracks, {
      keys: ["Name", "Artist"], // Removed 'Album' to be more specific
      threshold: 0.3,
    });
    return fuse.search(searchTerm).map((result) => result.item);
  }

  return filteredTracks;
};
