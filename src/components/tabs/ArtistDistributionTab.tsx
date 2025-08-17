import { useAtomValue } from "jotai";

import { topThreeArtistsAtom } from "@/atoms/analysis";
import { columns as artistDistributionColumns } from "@/components/analysis/columns/artist-distribution";
import { DistributionChart } from "@/components/analysis/DistributionChart";

export const ArtistDistributionTab = () => {
  const data = useAtomValue(topThreeArtistsAtom);

  return (
    <DistributionChart
      data={data}
      columns={artistDistributionColumns}
      filterType="artist"
      fileName="artist-distribution"
    />
  );
};
