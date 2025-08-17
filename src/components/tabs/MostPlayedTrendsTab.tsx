import { useSetAtom } from "jotai";
import { useEffect } from "react";

import { headerControlsAtom } from "@/atoms/header";
import { MostPlayedTrends } from "@/components/analysis/MostPlayedTrends";

export const MostPlayedTrendsTab = () => {
  const setHeaderControls = useSetAtom(headerControlsAtom);

  useEffect(() => {
    setHeaderControls(["search", "count", "sortBy", "trendView"]);
    return () => setHeaderControls([]);
  }, [setHeaderControls]);

  return <MostPlayedTrends />;
};
