import { useAtomValue, useSetAtom } from "jotai";
import { useEffect } from "react";

import { topThreeGenresAtom } from "@/atoms/analysis";
import { headerControlsAtom } from "@/atoms/header";
import { columns as genreDistributionColumns } from "@/components/analysis/columns/genre-distribution";
import { DistributionChart } from "@/components/analysis/DistributionChart";

export const GenreDistributionTab = () => {
  const data = useAtomValue(topThreeGenresAtom);
  const setHeaderControls = useSetAtom(headerControlsAtom);

  useEffect(() => {
    setHeaderControls(["count"]);
    return () => setHeaderControls([]);
  }, [setHeaderControls]);

  return (
    <DistributionChart
      data={data}
      columns={genreDistributionColumns}
      filterType="genre"
      fileName="genre-distribution"
      hideTooltipLabel
    />
  );
};
