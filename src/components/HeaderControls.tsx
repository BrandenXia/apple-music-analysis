import { useAtom } from "jotai";
import { X } from "lucide-react";

import { countAtom, filterAtom, searchTermAtom, sortByAtom } from "@/atoms";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface HeaderControlsProps {
  activeTab: string;
}

export const HeaderControls = ({ activeTab }: HeaderControlsProps) => {
  const [searchTerm, setSearchTerm] = useAtom(searchTermAtom);
  const [count, setCount] = useAtom(countAtom);
  const [sortBy, setSortBy] = useAtom(sortByAtom);
  const [filter, setFilter] = useAtom(filterAtom);

  return (
    <div className="my-4 flex items-center justify-between">
      <div className="flex flex-nowrap items-center space-x-4">
        {activeTab.startsWith("most-played") && (
          <Input
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        )}
        {(activeTab.startsWith("most-played") || activeTab.endsWith("-distribution")) && (
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
        {activeTab.startsWith("most-played") && (
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
