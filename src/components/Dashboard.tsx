import { useAtom, useAtomValue, useSetAtom } from "jotai";
import {
  BarChart,
  Disc,
  LineChart,
  Mic,
  Music,
  PanelLeft,
  PieChart,
  TrendingUp,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";

import {
  activeTabAtom,
  analysisAtom,
  countAtom,
  endDateAtom,
  filterAtom,
  genreKeyAtom,
  searchTermAtom,
  sortByAtom,
  startDateAtom,
  tracksAtom,
} from "@/atoms";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/datepicker";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { getTrendingData } from "@/utils/analysis";

import { columns as artistDistributionColumns } from "./analysis/columns/artist-distribution";
import { columns as genreDistributionColumns } from "./analysis/columns/genre-distribution";
import { columns as albumsColumns } from "./analysis/columns/most-played-albums";
import { columns as artistsColumns } from "./analysis/columns/most-played-artists";
import { columns as genresColumns } from "./analysis/columns/most-played-genres";
import { columns as tracksColumns } from "./analysis/columns/most-played-tracks";
import { DistributionChart } from "./analysis/DistributionChart";
import { MostPlayed } from "./analysis/MostPlayed";
import { Trending } from "./analysis/Trending";

import type { TopTrack } from "@/types";
import type { ColumnDef } from "@tanstack/react-table";
import type { MostPlayedItem } from "./analysis/MostPlayed";

export const Dashboard = () => {
  const analysis = useAtomValue(analysisAtom);
  const tracks = useAtomValue(tracksAtom);
  const setStartDate = useSetAtom(startDateAtom);
  const setEndDate = useSetAtom(endDateAtom);
  const [sortBy, setSortBy] = useAtom(sortByAtom);
  const [genreKey, setGenreKey] = useAtom(genreKeyAtom);
  const [count, setCount] = useAtom(countAtom);
  const [filter, setFilter] = useAtom(filterAtom);
  const [searchTerm, setSearchTerm] = useAtom(searchTermAtom);

  const [activeTab, setActiveTab] = useAtom(activeTabAtom);
  const [startDateValue, setStartDateValue] = useState<Date | undefined>();
  const [endDateValue, setEndDateValue] = useState<Date | undefined>();
  const [trendingType, setTrendingType] = useState<"artist" | "album">("artist");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const handleDateRangeChange = () => {
    setStartDate(startDateValue?.toISOString());
    setEndDate(endDateValue?.toISOString());
  };

  const trendingData = useMemo(() => {
    return getTrendingData(tracks, trendingType);
  }, [tracks, trendingType]);

  const mostPlayedTabs = [
    {
      value: "most-played-tracks",
      icon: Music,
      label: "Most Played Tracks",
      data: analysis?.mostPlayedTracks,
      columns: tracksColumns,
      getLabel: (item: TopTrack) => `${item.name} by ${item.artist}`,
    },
    {
      value: "most-played-artists",
      icon: Mic,
      label: "Most Played Artists",
      data: analysis?.mostPlayedArtists,
      columns: artistsColumns,
      getLabel: (item: { name: string }) => item.name,
    },
    {
      value: "most-played-albums",
      icon: Disc,
      label: "Most Played Albums",
      data: analysis?.mostPlayedAlbums,
      columns: albumsColumns,
      getLabel: (item: { name: string }) => item.name,
    },
    {
      value: "most-played-genres",
      icon: BarChart,
      label: "Most Played Genres",
      data: analysis?.mostPlayedGenres,
      columns: genresColumns,
      getLabel: (item: { name: string }) => item.name,
    },
  ];

  if (!analysis) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex h-screen">
      <div
        className={cn(
          "bg-sidebar text-sidebar-foreground overflow-y-auto p-4 transition-all duration-300",
          isSidebarCollapsed ? "w-16" : "w-64",
        )}
      >
        <div className="flex items-center justify-between">
          {!isSidebarCollapsed && <h1 className="text-2xl font-bold">Analysis</h1>}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          >
            <PanelLeft />
          </Button>
        </div>
        <div className={cn("mt-4", isSidebarCollapsed && "hidden")}>
          <h2 className="mb-2 text-lg font-bold">Date Range</h2>
          <div className="flex flex-col space-y-2">
            <DatePicker
              date={startDateValue}
              setDate={setStartDateValue}
              placeholder="Start Date"
            />
            <DatePicker date={endDateValue} setDate={setEndDateValue} placeholder="End Date" />
            <Button onClick={handleDateRangeChange}>Apply</Button>
          </div>
        </div>
        <div className={cn("mt-4", isSidebarCollapsed && "hidden")}>
          <h2 className="mb-2 text-lg font-bold">Genre Source</h2>
          <Select
            onValueChange={(value: "Grouping" | "Genre") => setGenreKey(value)}
            defaultValue={genreKey}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select genre source" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Grouping">Grouping</SelectItem>
              <SelectItem value="Genre">Genre</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="flex h-auto w-full flex-wrap">
            {mostPlayedTabs.map((tab) => (
              <TabsTrigger value={tab.value} key={tab.value}>
                <tab.icon className="mr-1" />
                {tab.label}
              </TabsTrigger>
            ))}
            <TabsTrigger value="genre-distribution">
              <PieChart className="mr-1" />
              Genre Distribution
            </TabsTrigger>
            <TabsTrigger value="artist-distribution">
              <LineChart className="mr-1" />
              Artist Distribution
            </TabsTrigger>
            <TabsTrigger value="trending">
              <TrendingUp className="mr-1" />
              Trending
            </TabsTrigger>
          </TabsList>
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
          {mostPlayedTabs.map((tab) => (
            <TabsContent value={tab.value} key={tab.value}>
              <MostPlayed
                items={tab.data?.slice(0, count) as MostPlayedItem[]}
                sortBy={sortBy}
                columns={tab.columns as ColumnDef<MostPlayedItem, unknown>[]}
                getLabel={tab.getLabel as (item: MostPlayedItem) => string}
              />
            </TabsContent>
          ))}
          <TabsContent value="genre-distribution">
            <DistributionChart
              data={analysis.topThreeGenres}
              columns={genreDistributionColumns}
              filterType="genre"
              fileName="genre-distribution"
              hideTooltipLabel
            />
          </TabsContent>
          <TabsContent value="artist-distribution">
            <DistributionChart
              data={analysis.topThreeArtists}
              columns={artistDistributionColumns}
              filterType="artist"
              fileName="artist-distribution"
            />
          </TabsContent>
          <TabsContent value="trending">
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
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
