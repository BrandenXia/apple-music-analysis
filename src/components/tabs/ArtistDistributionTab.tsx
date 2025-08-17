import { useAtomValue, useSetAtom } from "jotai";
import { useEffect } from "react";

import { topThreeArtistsAtom } from "@/atoms/analysis";
import { headerControlsAtom } from "@/atoms/header";
import { columns as artistDistributionColumns } from "@/components/analysis/columns/artist-distribution";
import { DistributionChart } from "@/components/analysis/DistributionChart";

export const ArtistDistributionTab = () => {
  const data = useAtomValue(topThreeArtistsAtom);
  const setHeaderControls = useSetAtom(headerControlsAtom);

  useEffect(() => {
    setHeaderControls(["count"]);
    return () => setHeaderControls([]);
  }, [setHeaderControls]);

  return (
    <DistributionChart
      data={data}
      columns={artistDistributionColumns}
      filterType="artist"
      fileName="artist-distribution"
    />
  );
};
