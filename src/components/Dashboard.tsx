import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useMemo, useState } from "react";

import {
  activeTabAtom,
  analysisAtom,
  endDateAtom,
  genreKeyAtom,
  sortByAtom,
  startDateAtom,
  tracksAtom,
} from "@/atoms";
import { HeaderControls } from "@/components/HeaderControls";
import { Sidebar } from "@/components/Sidebar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { allTabs, mostPlayedTabs } from "@/config/tabs";
import { getTrendingData } from "@/lib/analysis/trending-data";

import { columns as artistDistributionColumns } from "./analysis/columns/artist-distribution";
import { columns as genreDistributionColumns } from "./analysis/columns/genre-distribution";
import { DistributionChart } from "./analysis/DistributionChart";
import { ForgottenFavorites } from "./analysis/ForgottenFavorites";
import { MostPlayed } from "./analysis/MostPlayed";
import { MusicTasteProfile } from "./analysis/MusicTasteProfile";
import { Trending } from "./analysis/Trending";

import type { ColumnDef } from "@tanstack/react-table";
import type { MostPlayedItem } from "./analysis/MostPlayed";

export const Dashboard = () => {
  const analysis = useAtomValue(analysisAtom);
  const tracks = useAtomValue(tracksAtom);
  const sortBy = useAtomValue(sortByAtom);
  const setStartDate = useSetAtom(startDateAtom);
  const setEndDate = useSetAtom(endDateAtom);
  const [genreKey, setGenreKey] = useAtom(genreKeyAtom);
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

  if (!analysis) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex h-screen">
      <Sidebar
        isSidebarCollapsed={isSidebarCollapsed}
        setIsSidebarCollapsed={setIsSidebarCollapsed}
        startDateValue={startDateValue}
        setStartDateValue={setStartDateValue}
        endDateValue={endDateValue}
        setEndDateValue={setEndDateValue}
        handleDateRangeChange={handleDateRangeChange}
        genreKey={genreKey}
        setGenreKey={setGenreKey}
      />
      <div className="flex-1 overflow-y-auto p-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="flex h-auto w-full flex-wrap">
            {allTabs.map((tab) => (
              <TabsTrigger value={tab.value} key={tab.value}>
                <tab.icon className="mr-1" />
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          <HeaderControls activeTab={activeTab} />
          {mostPlayedTabs.map((tab) => (
            <TabsContent value={tab.value} key={tab.value}>
              <MostPlayed
                items={analysis[tab.dataKey as keyof typeof analysis] as MostPlayedItem[]}
                sortBy={sortBy}
                columns={tab.columns as ColumnDef<MostPlayedItem, unknown>[]}
                getLabel={tab.getLabel as (item: MostPlayedItem) => string}
                filterType={tab.filterType as "artist" | "album" | "genre"}
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
          <TabsContent value="forgotten-favorites">
            <ForgottenFavorites items={analysis.forgottenFavorites} />
          </TabsContent>
          <TabsContent value="music-taste-profile">
            <MusicTasteProfile profile={analysis.musicTasteProfile} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
