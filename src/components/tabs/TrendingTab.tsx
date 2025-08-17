import { useAtomValue } from "jotai";
import { useMemo, useState } from "react";

import { tracksAtom } from "@/atoms/data";
import { Trending } from "@/components/analysis/Trending";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getTrendingData } from "@/lib/analysis/trending-data";

export const TrendingTab = () => {
  const tracks = useAtomValue(tracksAtom);
  const [trendingType, setTrendingType] = useState<"artist" | "album">("artist");

  const trendingData = useMemo(() => {
    return getTrendingData(tracks, trendingType);
  }, [tracks, trendingType]);

  return (
    <div>
      <div className="mb-4 flex items-center">
        <label htmlFor="trending-type" className="mr-2">
          Analyze by
        </label>
        <Select
          onValueChange={(value: "artist" | "album") => setTrendingType(value)}
          defaultValue={trendingType}
        >
          <SelectTrigger id="trending-type" className="w-[180px]">
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="artist">Artist</SelectItem>
            <SelectItem value="album">Album</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {trendingData && <Trending data={trendingData} />}
    </div>
  );
};
