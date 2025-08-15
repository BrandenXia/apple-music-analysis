
import { create } from 'zustand';
import { Analysis, Track } from './types';
import { analyze } from './utils/analysis';

interface AppState {
  tracks: Track[];
  analysis: Analysis | null;
  sortBy: 'playCount' | 'playTime';
  genreKey: 'Grouping' | 'Genre';
  setTracks: (tracks: Track[]) => void;
  setSortBy: (sortBy: 'playCount' | 'playTime') => void;
  setDateRange: (startDate: string, endDate: string) => void;
  setGenreKey: (genreKey: 'Grouping' | 'Genre') => void;
}

export const useStore = create<AppState>((set, get) => ({
  tracks: [],
  analysis: null,
  sortBy: 'playCount',
  genreKey: 'Grouping',
  setTracks: (tracks) => {
    const analysis = analyze(tracks, undefined, undefined, get().sortBy, get().genreKey);
    set({ tracks, analysis });
  },
  setSortBy: (sortBy) => {
    const analysis = analyze(get().tracks, undefined, undefined, sortBy, get().genreKey);
    set({ sortBy, analysis });
  },
  setDateRange: (startDate, endDate) => {
    const analysis = analyze(get().tracks, startDate, endDate, get().sortBy, get().genreKey);
    set({ analysis });
  },
  setGenreKey: (genreKey) => {
    const analysis = analyze(get().tracks, undefined, undefined, get().sortBy, genreKey);
    set({ genreKey, analysis });
  }
}));
