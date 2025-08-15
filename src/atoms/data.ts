import { atom } from "jotai";

import { analyze } from "@/utils/analysis";

import {
  countAtom,
  endDateAtom,
  filterAtom,
  genreKeyAtom,
  searchTermAtom,
  sortByAtom,
  startDateAtom,
} from "./settings";

import type { Analysis, Track } from "@/types";

export const tracksAtom = atom<Track[]>([]);

export const analysisAtom = atom<Analysis | null>((get) => {
  const tracks = get(tracksAtom);
  if (tracks.length === 0) {
    return null;
  }
  const startDate = get(startDateAtom);
  const endDate = get(endDateAtom);
  const sortBy = get(sortByAtom);
  const genreKey = get(genreKeyAtom);
  const count = get(countAtom);
  const filter = get(filterAtom);
  const searchTerm = get(searchTermAtom);
  return analyze(tracks, startDate, endDate, sortBy, genreKey, count, filter, searchTerm);
});
