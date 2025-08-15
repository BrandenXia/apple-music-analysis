
import { useState, useMemo } from "react";
import { MostPlayed } from "./analysis/MostPlayed";
import { GenreDistribution } from "./analysis/GenreDistribution";
import { ArtistDistribution } from "./analysis/ArtistDistribution";
import { Trending } from "./analysis/Trending";
import { getTrendingData } from "../utils/analysis";
import { useStore } from "../store";
import { TopArtist, TopAlbum, TopGenre, TopTrack, Track } from "../types";
import { formatDuration, intervalToDuration } from "date-fns";

export const Dashboard = () => {
  const { analysis, tracks, setDateRange, setSortBy, sortBy, setGenreKey, genreKey } = useStore();
  const [activeTab, setActiveTab] = useState("most-played-tracks");
  const [count, setCount] = useState(5);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [trendingType, setTrendingType] = useState<"artist" | "genre">("artist");
  const [trendingName, setTrendingName] = useState("");
  const [selectedItem, setSelectedItem] = useState<TopArtist | TopAlbum | TopGenre | TopTrack | null>(null);

  const handleDateRangeChange = () => {
    setDateRange(startDate, endDate);
  };

  const handleSortByChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSortBy = e.target.value as "playCount" | "playTime";
    setSortBy(newSortBy);
  };

  const handleGenreKeyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newGenreKey = e.target.value as "Grouping" | "Genre";
    setGenreKey(newGenreKey);
  };

  const trendingData = useMemo(() => {
    if (!trendingName) return null;
    return getTrendingData(tracks, trendingType, trendingName, genreKey);
  }, [tracks, trendingType, trendingName, genreKey]);

  const artists = useMemo(() => Array.from(new Set(tracks.map(t => t.Artist))), [tracks]);
  const genres = useMemo(() => Array.from(new Set(tracks.map(t => t[genreKey] || (genreKey === 'Grouping' ? t.Genre : undefined)).filter(g => g).flatMap(g => g.split(",")))), [tracks, genreKey]);

  if (!analysis) {
    return <div>Loading...</div>;
  }

  const renderTrack = (track: TopTrack) => (
    <>
      {track.name} by {track.artist} - {track.playCount} plays, {formatDuration(intervalToDuration({ start: 0, end: track.playTime }))}
    </>
  );

  const renderArtist = (artist: TopArtist) => (
    <>
      {artist.name} - {artist.playCount} plays, {formatDuration(intervalToDuration({ start: 0, end: artist.playTime }))}
    </>
  );

  const renderAlbum = (album: TopAlbum) => (
    <>
      {album.name} - {album.playCount} plays, {formatDuration(intervalToDuration({ start: 0, end: album.playTime }))}
    </>
  );

  const renderGenre = (genre: TopGenre) => (
    <>
      {genre.name} - {genre.playCount} plays, {formatDuration(intervalToDuration({ start: 0, end: genre.playTime }))}
    </>
  );

  return (
    <div className="flex h-screen">
      <div className="w-64 bg-gray-800 text-white p-4 overflow-y-auto">
        <h1 className="text-2xl font-bold mb-4">Apple Music Analysis</h1>
        <ul>
          <li className="mb-2">
            <a href="#" onClick={() => setActiveTab("most-played-tracks")} className={activeTab === "most-played-tracks" ? "font-bold" : ""}>Most Played Tracks</a>
          </li>
          <li className="mb-2">
            <a href="#" onClick={() => setActiveTab("most-played-artists")} className={activeTab === "most-played-artists" ? "font-bold" : ""}>Most Played Artists</a>
          </li>
          <li className="mb-2">
            <a href="#" onClick={() => setActiveTab("most-played-albums")} className={activeTab === "most-played-albums" ? "font-bold" : ""}>Most Played Albums</a>
          </li>
          <li className="mb-2">
            <a href="#" onClick={() => setActiveTab("most-played-genres")} className={activeTab === "most-played-genres" ? "font-bold" : ""}>Most Played Genres</a>
          </li>
          <li className="mb-2">
            <a href="#" onClick={() => setActiveTab("genre-distribution")} className={activeTab === "genre-distribution" ? "font-bold" : ""}>Genre Distribution</a>
          </li>
          <li className="mb-2">
            <a href="#" onClick={() => setActiveTab("artist-distribution")} className={activeTab === "artist-distribution" ? "font-bold" : ""}>Artist Distribution</a>
          </li>
          <li className="mb-2">
            <a href="#" onClick={() => setActiveTab("trending")} className={activeTab === "trending" ? "font-bold" : ""}>Trending</a>
          </li>
        </ul>
        <div className="mt-4">
            <h2 className="text-lg font-bold mb-2">Date Range</h2>
            <div className="flex flex-col">
                <label htmlFor="start-date" className="mb-1">Start Date</label>
                <input type="date" id="start-date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="border border-gray-300 rounded-md p-1 mb-2 text-black" />
                <label htmlFor="end-date" className="mb-1">End Date</label>
                <input type="date" id="end-date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="border border-gray-300 rounded-md p-1 mb-2 text-black" />
                <button onClick={handleDateRangeChange} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Apply
                </button>
            </div>
        </div>
        <div className="mt-4">
            <h2 className="text-lg font-bold mb-2">Genre Source</h2>
            <div className="flex flex-col">
                <select value={genreKey} onChange={handleGenreKeyChange} className="border border-gray-300 rounded-md p-1 text-black">
                    <option value="Grouping">Grouping</option>
                    <option value="Genre">Genre</option>
                </select>
            </div>
        </div>
      </div>
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">{activeTab.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</h2>
            {activeTab.startsWith("most-played") && (
                <div className="flex items-center">
                    <label htmlFor="count" className="mr-2">Show top</label>
                    <select id="count" value={count} onChange={(e) => setCount(parseInt(e.target.value, 10))} className="border border-gray-300 rounded-md p-1">
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="50">50</option>
                    </select>
                    <label htmlFor="sort-by" className="ml-4 mr-2">Sort by</label>
                    <select id="sort-by" value={sortBy} onChange={handleSortByChange} className="border border-gray-300 rounded-md p-1">
                        <option value="playCount">Play Count</option>
                        <option value="playTime">Play Time</option>
                    </select>
                </div>
            )}
        </div>
        {activeTab === "most-played-tracks" && <MostPlayed items={analysis.mostPlayedTracks.slice(0, count)} renderItem={renderTrack} onItemClick={setSelectedItem} selectedItem={selectedItem} allTracks={tracks} />} 
        {activeTab === "most-played-artists" && <MostPlayed items={analysis.mostPlayedArtists.slice(0, count)} renderItem={renderArtist} onItemClick={setSelectedItem} selectedItem={selectedItem} allTracks={tracks} />} 
        {activeTab === "most-played-albums" && <MostPlayed items={analysis.mostPlayedAlbums.slice(0, count)} renderItem={renderAlbum} onItemClick={setSelectedItem} selectedItem={selectedItem} allTracks={tracks} />} 
        {activeTab === "most-played-genres" && <MostPlayed items={analysis.mostPlayedGenres.slice(0, count)} renderItem={renderGenre} onItemClick={setSelectedItem} selectedItem={selectedItem} allTracks={tracks} />} 
        {activeTab === "genre-distribution" && <GenreDistribution genres={analysis.topThreeGenres} />} 
        {activeTab === "artist-distribution" && <ArtistDistribution artists={analysis.topThreeArtists} />}
        {activeTab === "trending" && (
            <div>
                <div className="flex items-center mb-4">
                    <label htmlFor="trending-type" className="mr-2">Type</label>
                    <select id="trending-type" value={trendingType} onChange={(e) => setTrendingType(e.target.value as "artist" | "genre")} className="border border-gray-300 rounded-md p-1">
                        <option value="artist">Artist</option>
                        <option value="genre">Genre</option>
                    </select>
                    <label htmlFor="trending-name" className="ml-4 mr-2">Name</label>
                    <select id="trending-name" value={trendingName} onChange={(e) => setTrendingName(e.target.value)} className="border border-gray-300 rounded-md p-1">
                        <option value="">Select...</option>
                        {(trendingType === "artist" ? artists : genres).map(name => <option key={name} value={name}>{name}</option>)}
                    </select>
                </div>
                {trendingData && <Trending data={trendingData} />}
            </div>
        )}
      </div>
    </div>
  );
};
