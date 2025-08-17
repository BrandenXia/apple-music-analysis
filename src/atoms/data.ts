import { atom } from "jotai";

import type { Library, Track } from "@/types";

export const trendViewAtom = atom<"absolute" | "difference">("absolute");

export const libraryAtom = atom<Library | null>(null);

export const tracksAtom = atom<Track[]>((get) => {
  const library = get(libraryAtom);
  return library?.tracks || [];
});
