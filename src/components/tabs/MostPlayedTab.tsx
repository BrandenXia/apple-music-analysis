import { useAtomValue } from "jotai";

import {
  mostPlayedAlbumsAtom,
  mostPlayedArtistsAtom,
  mostPlayedGenresAtom,
  mostPlayedTracksAtom,
} from "@/atoms/analysis";
import { sortByAtom } from "@/atoms/settings";
import { MostPlayed } from "@/components/analysis/MostPlayed";
import { mostPlayedTabs } from "@/config/tabs";

import type { MostPlayedItem } from "@/components/analysis/MostPlayed";
import type { ColumnDef } from "@tanstack/react-table";

const atomMapping = {
  "most-played-tracks": mostPlayedTracksAtom,
  "most-played-artists": mostPlayedArtistsAtom,
  "most-played-albums": mostPlayedAlbumsAtom,
  "most-played-genres": mostPlayedGenresAtom,
};

export const MostPlayedTab = ({ tab }: { tab: (typeof mostPlayedTabs)[number] }) => {
  const items = useAtomValue(atomMapping[tab.value as keyof typeof atomMapping]);
  const sortBy = useAtomValue(sortByAtom);

  return (
    <MostPlayed
      items={items as MostPlayedItem[]}
      sortBy={sortBy}
      columns={tab.columns as ColumnDef<MostPlayedItem, unknown>[]}
      getLabel={tab.getLabel as (item: MostPlayedItem) => string}
      filterType={tab.filterType as "artist" | "album" | "genre"}
    />
  );
};
