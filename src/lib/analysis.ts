import { formatDuration, intervalToDuration } from "date-fns";
import Fuse from "fuse.js";

import type { Analysis, TopAlbum, TopArtist, TopGenre, TopTrack, Track } from "@/types";

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
  };
};

const getMostPlayedTracks = (
  tracks: Track[],
  count: number,
  sortBy: "playCount" | "playTime" = "playCount",
): TopTrack[] => {
  return tracks
    .sort((a, b) => {
      if (sortBy === "playTime") {
        return b["Total Time"] * b["Play Count"] - a["Total Time"] * a["Play Count"];
      }
      return b["Play Count"] - a["Play Count"];
    })
    .slice(0, count)
    .map((track) => ({
      name: track.Name,
      artist: track.Artist,
      playCount: track["Play Count"],
      playTime: track["Total Time"] * track["Play Count"],
      track,
    }));
};

const getMostPlayedArtists = (
  tracks: Track[],
  count: number,
  sortBy: "playCount" | "playTime" = "playCount",
): TopArtist[] => {
  const artistStats = tracks.reduce(
    (acc, track) => {
      acc[track.Artist] = {
        playCount: (acc[track.Artist]?.playCount || 0) + track["Play Count"],
        playTime: (acc[track.Artist]?.playTime || 0) + track["Total Time"] * track["Play Count"],
        tracks: [...(acc[track.Artist]?.tracks || []), track],
      };
      return acc;
    },
    {} as { [key: string]: { playCount: number; playTime: number; tracks: Track[] } },
  );

  return Object.entries(artistStats)
    .sort((a, b) => {
      if (sortBy === "playTime") {
        return b[1].playTime - a[1].playTime;
      }
      return b[1].playCount - a[1].playCount;
    })
    .slice(0, count)
    .map(([name, { playCount, playTime, tracks }]) => ({ name, playCount, playTime, tracks }));
};

const getMostPlayedAlbums = (
  tracks: Track[],
  count: number,
  sortBy: "playCount" | "playTime" = "playCount",
): TopAlbum[] => {
  const albumStats = tracks.reduce(
    (acc, track) => {
      acc[track.Album] = {
        playCount: (acc[track.Album]?.playCount || 0) + track["Play Count"],
        playTime: (acc[track.Album]?.playTime || 0) + track["Total Time"] * track["Play Count"],
        tracks: [...(acc[track.Album]?.tracks || []), track],
      };
      return acc;
    },
    {} as { [key: string]: { playCount: number; playTime: number; tracks: Track[] } },
  );

  return Object.entries(albumStats)
    .sort((a, b) => {
      if (sortBy === "playTime") {
        return b[1].playTime - a[1].playTime;
      }
      return b[1].playCount - a[1].playCount;
    })
    .slice(0, count)
    .map(([name, { playCount, playTime, tracks }]) => ({ name, playCount, playTime, tracks }));
};

const getMostPlayedGenres = (
  tracks: Track[],
  count: number,
  sortBy: "playCount" | "playTime" = "playCount",
  genreKey: "Grouping" | "Genre" = "Grouping",
): TopGenre[] => {
  const genreStats = tracks.reduce(
    (acc, track) => {
      const genreSource = track[genreKey] || (genreKey === "Grouping" ? track.Genre : undefined);
      if (genreSource) {
        const genres = genreSource.split(",");
        genres.forEach((genre) => {
          const g = genre.trim();
          if (g) {
            acc[g] = {
              playCount: (acc[g]?.playCount || 0) + track["Play Count"],
              playTime: (acc[g]?.playTime || 0) + track["Total Time"] * track["Play Count"],
              tracks: [...(acc[g]?.tracks || []), track],
            };
          }
        });
      }
      return acc;
    },
    {} as { [key: string]: { playCount: number; playTime: number; tracks: Track[] } },
  );

  return Object.entries(genreStats)
    .sort((a, b) => {
      if (sortBy === "playTime") {
        return b[1].playTime - a[1].playTime;
      }
      return b[1].playCount - a[1].playCount;
    })
    .slice(0, count)
    .map(([name, { playCount, playTime, tracks }]) => ({ name, playCount, playTime, tracks }));
};

const getTopThreeGenres = (
  tracks: Track[],
  count: number,
  genreKey: "Grouping" | "Genre" = "Grouping",
): { name: string; count: number }[] => {
  const genreCounts = tracks.reduce(
    (acc, track) => {
      const genreSource = track[genreKey] || (genreKey === "Grouping" ? track.Genre : undefined);
      if (genreSource) {
        const genres = genreSource.split(",");
        genres.forEach((genre) => {
          const g = genre.trim();
          if (g) {
            acc[g] = (acc[g] || 0) + 1;
          }
        });
      }
      return acc;
    },
    {} as { [key: string]: number },
  );

  return Object.entries(genreCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, count)
    .map(([name, count]) => ({ name, count }));
};

const getTopThreeArtists = (tracks: Track[], count: number): { name: string; count: number }[] => {
  const artistCounts = tracks.reduce(
    (acc, track) => {
      acc[track.Artist] = (acc[track.Artist] || 0) + 1;
      return acc;
    },
    {} as { [key: string]: number },
  );

  return Object.entries(artistCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, count)
    .map(([name, count]) => ({ name, count }));
};

const getTotalPlayCount = (tracks: Track[]): number => {
  return tracks.reduce((acc, track) => acc + track["Play Count"], 0);
};

const getTotalTime = (tracks: Track[]): string => {
  const totalMilliseconds = tracks.reduce(
    (acc, track) => acc + track["Total Time"] * track["Play Count"],
    0,
  );
  const duration = intervalToDuration({ start: 0, end: totalMilliseconds });
  return formatDuration(duration);
};

export const getTrendingData = (tracks: Track[], type: "artist" | "album") => {
  // 1. Group tracks by month
  const monthlyAdds: { [month: string]: { [name: string]: number } } = {};

  tracks.forEach((track) => {
    const month = new Date(track["Date Added"]).toLocaleString("default", {
      month: "short",
      year: "numeric",
    });
    const name = type === "artist" ? track.Artist : track.Album;

    if (!name) return;

    if (!monthlyAdds[month]) {
      monthlyAdds[month] = {};
    }
    if (!monthlyAdds[month][name]) {
      monthlyAdds[month][name] = 0;
    }
    monthlyAdds[month][name]++;
  });

  // 2. Find top 5 entities (artists or albums) overall
  const totalCounts: { [name: string]: number } = {};
  Object.values(monthlyAdds).forEach((monthData) => {
    Object.entries(monthData).forEach(([name, count]) => {
      if (!totalCounts[name]) {
        totalCounts[name] = 0;
      }
      totalCounts[name] += count;
    });
  });

  const top5Names = Object.entries(totalCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map((entry) => entry[0]);

  // 3. Prepare chart data
  const labels = Object.keys(monthlyAdds).sort(
    (a, b) => new Date(a).getTime() - new Date(b).getTime(),
  );

  const datasets = top5Names.map((name) => {
    const data = labels.map((label) => monthlyAdds[label][name] || 0);
    // Generate a random color for the line
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    return {
      label: name,
      data: data,
      borderColor: `rgb(${r}, ${g}, ${b})`,
      backgroundColor: `rgba(${r}, ${g}, ${b}, 0.5)`,
    };
  });

  return {
    labels,
    datasets,
  };
};
