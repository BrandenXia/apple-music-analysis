import { useAtomValue } from "jotai";

import { topThreeGenresAtom } from "@/atoms/analysis";
import { columns as genreDistributionColumns } from "@/components/analysis/columns/genre-distribution";
import { DistributionChart } from "@/components/analysis/DistributionChart";

export const GenreDistributionTab = () => {
  const data = useAtomValue(topThreeGenresAtom);

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
