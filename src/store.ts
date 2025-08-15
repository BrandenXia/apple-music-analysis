import { create } from "zustand";
import type { Track, Analysis } from "./types";
import { analyze } from "./utils/analysis";

interface State {
  tracks: Track[];
  analysis: Analysis | null;
  startDate?: string;
  endDate?: string;
  sortBy: "playCount" | "playTime";
  genreKey: "Grouping" | "Genre";
  count: number;
  filter: { type: 'genre' | 'artist' | null; value: string | null };
}

interface Actions {
  setTracks: (tracks: Track[]) => void;
  setDateRange: (startDate?: string, endDate?: string) => void;
  setSortBy: (sortBy: "playCount" | "playTime") => void;
  setGenreKey: (genreKey: "Grouping" | "Genre") => void;
  setCount: (count: number) => void;
  setFilter: (filter: { type: 'genre' | 'artist' | null; value: string | null }) => void;
}

export const useStore = create<State & Actions>((set, get) => ({
  tracks: [],
  analysis: null,
  sortBy: "playCount",
  genreKey: "Grouping",
  count: 5,
  filter: { type: null, value: null },
  setTracks: (tracks) => {
    const { startDate, endDate, sortBy, genreKey, count, filter } = get();
    set({
      tracks,
      analysis: analyze(tracks, startDate, endDate, sortBy, genreKey, count, filter),
    });
  },
  setDateRange: (startDate, endDate) => {
    const { tracks, sortBy, genreKey, count, filter } = get();
    set({
      startDate,
      endDate,
      analysis: analyze(tracks, startDate, endDate, sortBy, genreKey, count, filter),
    });
  },
  setSortBy: (sortBy) => {
    const { tracks, startDate, endDate, genreKey, count, filter } = get();
    set({
      sortBy,
      analysis: analyze(tracks, startDate, endDate, sortBy, genreKey, count, filter),
    });
  },
  setGenreKey: (genreKey) => {
    const { tracks, startDate, endDate, sortBy, count, filter } = get();
    set({
      genreKey,
      analysis: analyze(tracks, startDate, endDate, sortBy, genreKey, count, filter),
    });
  },
  setCount: (count) => {
    const { tracks, startDate, endDate, sortBy, genreKey, filter } = get();
    set({
      count,
      analysis: analyze(tracks, startDate, endDate, sortBy, genreKey, count, filter),
    });
  },
  setFilter: (filter) => {
    const { tracks, startDate, endDate, sortBy, genreKey, count } = get();
    set({
      filter,
      analysis: analyze(tracks, startDate, endDate, sortBy, genreKey, count, filter),
    });
  },
}));