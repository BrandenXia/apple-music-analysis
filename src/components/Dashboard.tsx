import { useAtom, useSetAtom } from "jotai";
import { useState } from "react";

import { activeTabAtom, endDateAtom, genreKeyAtom, startDateAtom } from "@/atoms";
import { HeaderControls } from "@/components/HeaderControls";
import { Sidebar } from "@/components/Sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { allTabs, mostPlayedTabs } from "@/config/tabs";

import { ArtistDistributionTab } from "./tabs/ArtistDistributionTab";
import { ForgottenFavoritesTab } from "./tabs/ForgottenFavoritesTab";
import { GenreDistributionTab } from "./tabs/GenreDistributionTab";
import { MostPlayedTab } from "./tabs/MostPlayedTab";
import { MostPlayedTrendsTab } from "./tabs/MostPlayedTrendsTab";
import { MusicTasteProfileTab } from "./tabs/MusicTasteProfileTab";
import { TrendingTab } from "./tabs/TrendingTab";

export const Dashboard = () => {
  const setStartDate = useSetAtom(startDateAtom);
  const setEndDate = useSetAtom(endDateAtom);
  const [genreKey, setGenreKey] = useAtom(genreKeyAtom);
  const [activeTab, setActiveTab] = useAtom(activeTabAtom);

  const [startDateValue, setStartDateValue] = useState<Date | undefined>();
  const [endDateValue, setEndDateValue] = useState<Date | undefined>();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const handleDateRangeChange = () => {
    setStartDate(startDateValue?.toISOString());
    setEndDate(endDateValue?.toISOString());
  };

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
              <MostPlayedTab tab={tab} />
            </TabsContent>
          ))}
          <TabsContent value="genre-distribution">
            <GenreDistributionTab />
          </TabsContent>
          <TabsContent value="artist-distribution">
            <ArtistDistributionTab />
          </TabsContent>
          <TabsContent value="trending">
            <TrendingTab />
          </TabsContent>
          <TabsContent value="forgotten-favorites">
            <ForgottenFavoritesTab />
          </TabsContent>
          <TabsContent value="music-taste-profile">
            <MusicTasteProfileTab />
          </TabsContent>
          <TabsContent value="most-played-trends">
            <MostPlayedTrendsTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
