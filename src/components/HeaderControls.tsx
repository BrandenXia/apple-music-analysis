import { useAtom, useAtomValue } from "jotai";
import { X } from "lucide-react";

import {
  countAtom,
  filterAtom,
  headerControlsAtom,
  searchTermAtom,
  sortByAtom,
  trendingTypeAtom,
  trendViewAtom,
} from "@/atoms";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const HeaderControls = () => {
  const [searchTerm, setSearchTerm] = useAtom(searchTermAtom);
  const [count, setCount] = useAtom(countAtom);
  const [sortBy, setSortBy] = useAtom(sortByAtom);
  const [filter, setFilter] = useAtom(filterAtom);
  const [trendingType, setTrendingType] = useAtom(trendingTypeAtom);
  const [trendView, setTrendView] = useAtom(trendViewAtom);
  const controls = useAtomValue(headerControlsAtom);

  return (
    <div className="my-4 flex items-center justify-between">
      <div className="flex flex-nowrap items-center space-x-4">
        {controls.includes("search") && (
          <Input
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        )}
        {controls.includes("count") && (
          <div className="flex items-center space-x-2">
            <label htmlFor="count" className="whitespace-nowrap">
              Show top
            </label>
            <Select
              onValueChange={(value) => setCount(parseInt(value, 10))}
              defaultValue={count.toString()}
            >
              <SelectTrigger id="count" className="w-[80px]">
                <SelectValue placeholder="Select count" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
        {controls.includes("sortBy") && (
          <div className="flex items-center space-x-2">
            <label htmlFor="sort-by" className="whitespace-nowrap">
              Sort by
            </label>
            <Select
              onValueChange={(value: "playCount" | "playTime") => setSortBy(value)}
              defaultValue={sortBy}
            >
              <SelectTrigger id="sort-by" className="w-[120px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="playCount">Play Count</SelectItem>
                <SelectItem value="playTime">Play Time</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
        {controls.includes("trendingType") && (
          <div className="flex items-center space-x-2">
            <label htmlFor="trending-type" className="whitespace-nowrap">
              Analyze by
            </label>
            <Select
              onValueChange={(value: "artist" | "album") => setTrendingType(value)}
              defaultValue={trendingType}
            >
              <SelectTrigger id="trending-type" className="w-[120px]">
                <SelectValue placeholder="Analyze by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="artist">Artist</SelectItem>
                <SelectItem value="album">Album</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
        {controls.includes("trendView") && (
          <div className="flex items-center space-x-2">
            <label htmlFor="trend-view" className="whitespace-nowrap">
              View
            </label>
            <Select
              onValueChange={(value: "absolute" | "difference") => setTrendView(value)}
              defaultValue={trendView}
            >
              <SelectTrigger id="trend-view" className="w-[120px]">
                <SelectValue placeholder="Trend View" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="absolute">Absolute</SelectItem>
                <SelectItem value="difference">Difference</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </div>
      {filter.type && (
        <div className="flex items-center space-x-2">
          <span className="text-sm">
            Filtered by {filter.type}: {filter.value}
          </span>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setFilter({ type: null, value: null })}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};
