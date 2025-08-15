
import { Track, Analysis, TopTrack, TopArtist, TopAlbum, TopGenre } from "../types";
import { formatDuration, intervalToDuration } from "date-fns";

export const analyze = (tracks: Track[], startDate?: string, endDate?: string, sortBy: "playCount" | "playTime" = "playCount", genreKey: "Grouping" | "Genre" = "Grouping"): Analysis => {
  let filteredTracks = tracks;
  if (startDate && endDate) {
    filteredTracks = tracks.filter(track => {
        const dateAdded = new Date(track["Date Added"]);
        return dateAdded >= new Date(startDate) && dateAdded <= new Date(endDate);
    });
  }

  return {
    mostPlayedTracks: getMostPlayedTracks(filteredTracks, 50, sortBy),
    mostPlayedArtists: getMostPlayedArtists(filteredTracks, 50, sortBy),
    mostPlayedAlbums: getMostPlayedAlbums(filteredTracks, 50, sortBy),
    mostPlayedGenres: getMostPlayedGenres(filteredTracks, 50, sortBy, genreKey),
    topThreeGenres: getTopThreeGenres(filteredTracks, 3, genreKey),
    topThreeArtists: getTopThreeArtists(filteredTracks, 3),
    totalPlayCount: getTotalPlayCount(filteredTracks),
    totalTime: getTotalTime(filteredTracks),
  };
};

const getMostPlayedTracks = (tracks: Track[], count: number, sortBy: "playCount" | "playTime" = "playCount"): TopTrack[] => {
  return tracks
    .sort((a, b) => {
        if (sortBy === "playTime") {
            return (b["Total Time"] * b["Play Count"]) - (a["Total Time"] * a["Play Count"]);
        }
        return b["Play Count"] - a["Play Count"];
    })
    .slice(0, count)
    .map((track) => ({
      name: track.Name,
      artist: track.Artist,
      playCount: track["Play Count"],
      playTime: track["Total Time"] * track["Play Count"],
    }));
};

const getMostPlayedArtists = (tracks: Track[], count: number, sortBy: "playCount" | "playTime" = "playCount"): TopArtist[] => {
  const artistStats = tracks.reduce((acc, track) => {
    acc[track.Artist] = {
        playCount: (acc[track.Artist]?.playCount || 0) + track["Play Count"],
        playTime: (acc[track.Artist]?.playTime || 0) + track["Total Time"] * track["Play Count"],
        tracks: [...(acc[track.Artist]?.tracks || []), track]
    }
    return acc;
  }, {} as { [key: string]: { playCount: number, playTime: number, tracks: Track[] } });

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

const getMostPlayedAlbums = (tracks: Track[], count: number, sortBy: "playCount" | "playTime" = "playCount"): TopAlbum[] => {
  const albumStats = tracks.reduce((acc, track) => {
    acc[track.Album] = {
        playCount: (acc[track.Album]?.playCount || 0) + track["Play Count"],
        playTime: (acc[track.Album]?.playTime || 0) + track["Total Time"] * track["Play Count"],
        tracks: [...(acc[track.Album]?.tracks || []), track]
    }
    return acc;
  }, {} as { [key: string]: { playCount: number, playTime: number, tracks: Track[] } });

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

const getMostPlayedGenres = (tracks: Track[], count: number, sortBy: "playCount" | "playTime" = "playCount", genreKey: "Grouping" | "Genre" = "Grouping"): TopGenre[] => {
  const genreStats = tracks.reduce((acc, track) => {
    const genreSource = track[genreKey] || (genreKey === 'Grouping' ? track.Genre : undefined);
    if (genreSource) {
        const genres = genreSource.split(",");
        genres.forEach(genre => {
            const g = genre.trim();
            if (g) {
                acc[g] = {
                    playCount: (acc[g]?.playCount || 0) + track["Play Count"],
                    playTime: (acc[g]?.playTime || 0) + track["Total Time"] * track["Play Count"],
                    tracks: [...(acc[g]?.tracks || []), track]
                }
            }
        });
    }
    return acc;
  }, {} as { [key: string]: { playCount: number, playTime: number, tracks: Track[] } });

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

const getTopThreeGenres = (tracks: Track[], count: number, genreKey: "Grouping" | "Genre" = "Grouping"): { name: string; count: number }[] => {
  const genreCounts = tracks.reduce((acc, track) => {
    const genreSource = track[genreKey] || (genreKey === 'Grouping' ? track.Genre : undefined);
    if (genreSource) {
        const genres = genreSource.split(",");
        genres.forEach(genre => {
            const g = genre.trim();
            if (g) {
                acc[g] = (acc[g] || 0) + 1;
            }
        });
    }
    return acc;
  }, {} as { [key: string]: number });

  return Object.entries(genreCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, count)
    .map(([name, count]) => ({ name, count }));
};

const getTopThreeArtists = (tracks: Track[], count: number): { name: string; count: number }[] => {
  const artistCounts = tracks.reduce((acc, track) => {
    acc[track.Artist] = (acc[track.Artist] || 0) + 1;
    return acc;
  }, {} as { [key: string]: number });

  return Object.entries(artistCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, count)
    .map(([name, count]) => ({ name, count }));
};

const getTotalPlayCount = (tracks: Track[]): number => {
  return tracks.reduce((acc, track) => acc + track["Play Count"], 0);
};

const getTotalTime = (tracks: Track[]): string => {
  const totalMilliseconds = tracks.reduce((acc, track) => acc + track["Total Time"] * track["Play Count"], 0);
  const duration = intervalToDuration({ start: 0, end: totalMilliseconds });
  return formatDuration(duration);
};

export const getTrendingData = (tracks: Track[], type: "artist" | "genre", name: string, genreKey: "Grouping" | "Genre" = "Grouping") => {
    const filteredTracks = tracks.filter(track => {
        if (type === "artist") {
            return track.Artist === name;
        }
        const genreSource = track[genreKey] || (genreKey === 'Grouping' ? track.Genre : undefined);
        return genreSource?.includes(name);
    });

    const monthlyCounts = filteredTracks.reduce((acc, track) => {
        const month = new Date(track["Date Added"]).toLocaleString('default', { month: 'long', year: 'numeric' });
        acc[month] = (acc[month] || 0) + 1;
        return acc;
    }, {} as { [key: string]: number });

    const labels = Object.keys(monthlyCounts).sort((a,b) => new Date(a).getTime() - new Date(b).getTime());

    return {
        labels,
        datasets: [
            {
                label: name,
                data: labels.map(label => monthlyCounts[label]),
                borderColor: 'rgb(75, 192, 192)',
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
            }
        ]
    }
}
