import { atom } from "jotai";

export const startDateAtom = atom<string | undefined>(undefined);
export const endDateAtom = atom<string | undefined>(undefined);
export const sortByAtom = atom<"playCount" | "playTime">("playCount");
export const genreKeyAtom = atom<"Grouping" | "Genre">("Grouping");
export const countAtom = atom<number>(5);
export const filterAtom = atom<{ type: "genre" | "artist" | "album" | null; value: string | null }>(
  {
    type: null,
    value: null,
  },
);
export const searchTermAtom = atom<string>("");
