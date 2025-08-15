import { create } from "zustand";

import { analyze } from "./utils/analysis";

import type { Analysis, Track } from "./types";

interface State {
  tracks: Track[];
  analysis: Analysis | null;
  startDate?: string;
  endDate?: string;
  sortBy: "playCount" | "playTime";
  genreKey: "Grouping" | "Genre";
  count: number;
  filter: { type: "genre" | "artist" | null; value: string | null };
  searchTerm: string;
}

interface Actions {
  setTracks: (tracks: Track[]) => void;
  setDateRange: (startDate?: string, endDate?: string) => void;
  setSortBy: (sortBy: "playCount" | "playTime") => void;
  setGenreKey: (genreKey: "Grouping" | "Genre") => void;
  setCount: (count: number) => void;
  setFilter: (filter: { type: "genre" | "artist" | null; value: string | null }) => void;
  setSearchTerm: (searchTerm: string) => void;
}

export const useStore = create<State & Actions>((set, get) => ({
  tracks: [],
  analysis: null,
  sortBy: "playCount",
  genreKey: "Grouping",
  count: 5,
  filter: { type: null, value: null },
  searchTerm: "",
  setTracks: (tracks) => {
    const { startDate, endDate, sortBy, genreKey, count, filter, searchTerm } = get();
    set({
      tracks,
      analysis: analyze(tracks, startDate, endDate, sortBy, genreKey, count, filter, searchTerm),
    });
  },
  setDateRange: (startDate, endDate) => {
    const { tracks, sortBy, genreKey, count, filter, searchTerm } = get();
    set({
      startDate,
      endDate,
      analysis: analyze(tracks, startDate, endDate, sortBy, genreKey, count, filter, searchTerm),
    });
  },
  setSortBy: (sortBy) => {
    const { tracks, startDate, endDate, genreKey, count, filter, searchTerm } = get();
    set({
      sortBy,
      analysis: analyze(tracks, startDate, endDate, sortBy, genreKey, count, filter, searchTerm),
    });
  },
  setGenreKey: (genreKey) => {
    const { tracks, startDate, endDate, sortBy, count, filter, searchTerm } = get();
    set({
      genreKey,
      analysis: analyze(tracks, startDate, endDate, sortBy, genreKey, count, filter, searchTerm),
    });
  },
  setCount: (count) => {
    const { tracks, startDate, endDate, sortBy, genreKey, filter, searchTerm } = get();
    set({
      count,
      analysis: analyze(tracks, startDate, endDate, sortBy, genreKey, count, filter, searchTerm),
    });
  },
  setFilter: (filter) => {
    const { tracks, startDate, endDate, sortBy, genreKey, count, searchTerm } = get();
    set({
      filter,
      analysis: analyze(tracks, startDate, endDate, sortBy, genreKey, count, filter, searchTerm),
    });
  },
  setSearchTerm: (searchTerm) => {
    const { tracks, startDate, endDate, sortBy, genreKey, count, filter } = get();
    set({
      searchTerm,
      analysis: analyze(tracks, startDate, endDate, sortBy, genreKey, count, filter, searchTerm),
    });
  },
}));
