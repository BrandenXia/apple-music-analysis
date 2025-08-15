import { create } from "zustand";
import { Track, Analysis } from "./types";
import { analyze } from "./utils/analysis";

interface State {
  tracks: Track[];
  analysis: Analysis | null;
  startDate?: string;
  endDate?: string;
  sortBy: "playCount" | "playTime";
  genreKey: "Grouping" | "Genre";
  count: number;
}

interface Actions {
  setTracks: (tracks: Track[]) => void;
  setDateRange: (startDate?: string, endDate?: string) => void;
  setSortBy: (sortBy: "playCount" | "playTime") => void;
  setGenreKey: (genreKey: "Grouping" | "Genre") => void;
  setCount: (count: number) => void;
}

export const useStore = create<State & Actions>((set, get) => ({
  tracks: [],
  analysis: null,
  sortBy: "playCount",
  genreKey: "Grouping",
  count: 5,
  setTracks: (tracks) => {
    const { startDate, endDate, sortBy, genreKey, count } = get();
    set({
      tracks,
      analysis: analyze(tracks, startDate, endDate, sortBy, genreKey, count),
    });
  },
  setDateRange: (startDate, endDate) => {
    const { tracks, sortBy, genreKey, count } = get();
    set({
      startDate,
      endDate,
      analysis: analyze(tracks, startDate, endDate, sortBy, genreKey, count),
    });
  },
  setSortBy: (sortBy) => {
    const { tracks, startDate, endDate, genreKey, count } = get();
    set({
      sortBy,
      analysis: analyze(tracks, startDate, endDate, sortBy, genreKey, count),
    });
  },
  setGenreKey: (genreKey) => {
    const { tracks, startDate, endDate, sortBy, count } = get();
    set({
      genreKey,
      analysis: analyze(tracks, startDate, endDate, sortBy, genreKey, count),
    });
  },
  setCount: (count) => {
    const { tracks, startDate, endDate, sortBy, genreKey } = get();
    set({
      count,
      analysis: analyze(tracks, startDate, endDate, sortBy, genreKey, count),
    });
  },
}));