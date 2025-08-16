import {
  BarChart,
  Disc,
  History,
  LineChart,
  Mic,
  Music,
  PieChart,
  TrendingUp,
  User,
} from "lucide-react";

import { columns as albumsColumns } from "@/components/analysis/columns/most-played-albums";
import { columns as artistsColumns } from "@/components/analysis/columns/most-played-artists";
import { columns as genresColumns } from "@/components/analysis/columns/most-played-genres";
import { columns as tracksColumns } from "@/components/analysis/columns/most-played-tracks";

import type { TopTrack } from "@/types";

export const mostPlayedTabs = [
  {
    value: "most-played-tracks",
    icon: Music,
    label: "Most Played Tracks",
    dataKey: "mostPlayedTracks",
    columns: tracksColumns,
    getLabel: (item: TopTrack) => `${item.name} by ${item.artist}`,
  },
  {
    value: "most-played-artists",
    icon: Mic,
    label: "Most Played Artists",
    dataKey: "mostPlayedArtists",
    columns: artistsColumns,
    getLabel: (item: { name: string }) => item.name,
    filterType: "artist",
  },
  {
    value: "most-played-albums",
    icon: Disc,
    label: "Most Played Albums",
    dataKey: "mostPlayedAlbums",
    columns: albumsColumns,
    getLabel: (item: { name: string }) => item.name,
    filterType: "album",
  },
  {
    value: "most-played-genres",
    icon: BarChart,
    label: "Most Played Genres",
    dataKey: "mostPlayedGenres",
    columns: genresColumns,
    getLabel: (item: { name: string }) => item.name,
    filterType: "genre",
  },
];

export const otherTabs = [
  {
    value: "genre-distribution",
    icon: PieChart,
    label: "Genre Distribution",
  },
  {
    value: "artist-distribution",
    icon: LineChart,
    label: "Artist Distribution",
  },
  {
    value: "trending",
    icon: TrendingUp,
    label: "Trending",
  },
  {
    value: "forgotten-favorites",
    icon: History,
    label: "Forgotten Favorites",
  },
  {
    value: "music-taste-profile",
    icon: User,
    label: "Music Taste Profile",
  },
  {
    value: "most-played-trends",
    icon: LineChart,
    label: "Most Played Trends",
  },
];

export const allTabs = [...mostPlayedTabs, ...otherTabs];
