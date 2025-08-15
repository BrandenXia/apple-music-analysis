import { useState, useMemo } from "react";
import { MostPlayed } from "./analysis/MostPlayed";
import { GenreDistribution } from "./analysis/GenreDistribution";
import { ArtistDistribution } from "./analysis/ArtistDistribution";
import { Trending } from "./analysis/Trending";
import { getTrendingData } from "../utils/analysis";
import { useStore } from "../store";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DatePicker } from "@/components/ui/datepicker";
import { columns as tracksColumns } from "./analysis/most-played-tracks-columns";
import { columns as artistsColumns } from "./analysis/most-played-artists-columns";
import { columns as albumsColumns } from "./analysis/most-played-albums-columns";
import { columns as genresColumns } from "./analysis/most-played-genres-columns";
import { Music, Mic, Disc, BarChart, PieChart, LineChart, TrendingUp } from "lucide-react";

export const Dashboard = () => {
  const { analysis, tracks, setDateRange, setSortBy, sortBy, setGenreKey, genreKey, count, setCount } = useStore();
  const [activeTab, setActiveTab] = useState("most-played-tracks");
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [trendingType, setTrendingType] = useState<"artist" | "album">("artist");

  const handleDateRangeChange = () => {
    setDateRange(startDate?.toISOString(), endDate?.toISOString());
  };

  const trendingData = useMemo(() => {
    return getTrendingData(tracks, trendingType);
  }, [tracks, trendingType]);

  if (!analysis) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex h-screen">
      <div className="w-64 bg-sidebar text-sidebar-foreground p-4 overflow-y-auto">
        <h1 className="text-2xl font-bold mb-4">Apple Music Analysis</h1>
        <div className="mt-4">
            <h2 className="text-lg font-bold mb-2">Date Range</h2>
            <div className="flex flex-col space-y-2">
                <DatePicker date={startDate} setDate={setStartDate} placeholder="Start Date" />
                <DatePicker date={endDate} setDate={setEndDate} placeholder="End Date" />
                <Button onClick={handleDateRangeChange}>
                    Apply
                </Button>
            </div>
        </div>
        <div className="mt-4">
            <h2 className="text-lg font-bold mb-2">Genre Source</h2>
            <Select onValueChange={(value: "Grouping" | "Genre") => setGenreKey(value)} defaultValue={genreKey}>
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
      <div className="flex-1 p-8 overflow-y-auto">
        <Tabs defaultValue="most-played-tracks" onValueChange={setActiveTab}>
          <TabsList className="flex flex-wrap h-auto">
            <TabsTrigger value="most-played-tracks"><Music className="mr-1" />Most Played Tracks</TabsTrigger>
            <TabsTrigger value="most-played-artists"><Mic className="mr-1" />Most Played Artists</TabsTrigger>
            <TabsTrigger value="most-played-albums"><Disc className="mr-1" />Most Played Albums</TabsTrigger>
            <TabsTrigger value="most-played-genres"><BarChart className="mr-1" />Most Played Genres</TabsTrigger>
            <TabsTrigger value="genre-distribution"><PieChart className="mr-1" />Genre Distribution</TabsTrigger>
            <TabsTrigger value="artist-distribution"><LineChart className="mr-1" />Artist Distribution</TabsTrigger>
            <TabsTrigger value="trending"><TrendingUp className="mr-1" />Trending</TabsTrigger>
          </TabsList>
          <div className="flex justify-between items-center my-4">
            <div className="flex items-center space-x-4">
                {(activeTab.startsWith("most-played") || activeTab.endsWith("-distribution")) && (
                    <div className="flex items-center space-x-2">
                        <label htmlFor="count">Show top</label>
                        <Select onValueChange={(value) => setCount(parseInt(value, 10))} defaultValue={count.toString()}>
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
                        <label htmlFor="sort-by">Sort by</label>
                        <Select onValueChange={(value: "playCount" | "playTime") => setSortBy(value)} defaultValue={sortBy}>
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
        </div>
          <TabsContent value="most-played-tracks">
            <MostPlayed items={analysis.mostPlayedTracks.slice(0, count)} sortBy={sortBy} columns={tracksColumns} getLabel={(item) => `${item.name} by ${item.artist}`} />
          </TabsContent>
          <TabsContent value="most-played-artists">
            <MostPlayed items={analysis.mostPlayedArtists.slice(0, count)} sortBy={sortBy} columns={artistsColumns} getLabel={(item) => item.name} />
          </TabsContent>
          <TabsContent value="most-played-albums">
            <MostPlayed items={analysis.mostPlayedAlbums.slice(0, count)} sortBy={sortBy} columns={albumsColumns} getLabel={(item) => item.name} />
          </TabsContent>
          <TabsContent value="most-played-genres">
            <MostPlayed items={analysis.mostPlayedGenres.slice(0, count)} sortBy={sortBy} columns={genresColumns} getLabel={(item) => item.name} />
          </TabsContent>
          <TabsContent value="genre-distribution">
            <GenreDistribution genres={analysis.topThreeGenres} />
          </TabsContent>
          <TabsContent value="artist-distribution">
            <ArtistDistribution artists={analysis.topThreeArtists} />
          </TabsContent>
          <TabsContent value="trending">
            <div>
                <div className="flex items-center mb-4">
                    <label htmlFor="trending-type" className="mr-2">Analyze by</label>
                    <Select onValueChange={(value: "artist" | "album") => setTrendingType(value)} defaultValue={trendingType}>
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
