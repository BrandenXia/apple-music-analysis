import { useAtomValue, useSetAtom } from "jotai";
import { useEffect, useMemo } from "react";

import { tracksAtom } from "@/atoms/data";
import { headerControlsAtom } from "@/atoms/header";
import { trendingTypeAtom } from "@/atoms/settings";
import { Trending } from "@/components/analysis/Trending";
import { getTrendingData } from "@/lib/analysis/trending-data";

export const TrendingTab = () => {
  const tracks = useAtomValue(tracksAtom);
  const trendingType = useAtomValue(trendingTypeAtom);
  const setHeaderControls = useSetAtom(headerControlsAtom);

  useEffect(() => {
    setHeaderControls(["trendingType"]);
    return () => setHeaderControls([]);
  }, [setHeaderControls]);

  const trendingData = useMemo(() => {
    return getTrendingData(tracks, trendingType);
  }, [tracks, trendingType]);

  return (
    <div>
      {/* The select is now in the header */}
      {trendingData && <Trending data={trendingData} />}
    </div>
  );
};
