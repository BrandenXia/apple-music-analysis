import { useAtomValue } from "jotai";

import { countAtom } from "@/atoms";
import { columns } from "@/components/analysis/columns/most-played-tracks";
import { DataTable } from "@/components/ui/data-table";

import type { TopTrack } from "@/types";

interface Props {
  items: TopTrack[];
}

export const ForgottenFavorites = ({ items }: Props) => {
  const count = useAtomValue(countAtom);

  return (
    <div>
      <DataTable
        columns={columns}
        data={items.slice(0, count)}
        noResultsMessage="It seems like you don't have any songs that haven't been played in the past half year."
      />
    </div>
  );
};
