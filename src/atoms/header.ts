import { atom } from "jotai";

export type HeaderControl = "sortBy" | "count" | "search" | "trendingType" | "trendView";

export const headerControlsAtom = atom<HeaderControl[]>([]);
