import { useLiveQuery } from "dexie-react-hooks";
import { useAtomValue } from "jotai";
import { useMemo } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { countAtom, sortByAtom, trendViewAtom } from "@/atoms";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import { getMostPlayedTrends } from "@/lib/analysis/most-played-trends";
import { CHART_COLORS } from "@/lib/constants/colors";
import { db } from "@/lib/db";

import type { MostPlayedSnapshot } from "@/lib/analysis/most-played-trends";
import type { TopTrack } from "@/types";

export const MostPlayedTrends = () => {
  const sortBy = useAtomValue(sortByAtom);
  const count = useAtomValue(countAtom);
  const trendView = useAtomValue(trendViewAtom);
  const allLibraries = useLiveQuery(() => db.libraries.orderBy("importedAt").toArray());

  const trends: MostPlayedSnapshot[] = useMemo(() => {
    if (!allLibraries) return [];
    return getMostPlayedTrends(allLibraries, sortBy, count);
  }, [allLibraries, sortBy, count]);

  const chartData = useMemo(() => {
    if (!trends || trends.length === 0) return [];

    const allTrackNames: Set<string> = new Set();

    // Collect all unique track names across all snapshots
    trends.forEach((snapshot) => {
      snapshot.mostPlayedTracks
        .slice(0, count)
        .forEach((track) => allTrackNames.add(`${track.name} - ${track.artist}`));
    });

    const processedData = trends.map((snapshot, i) => {
      const date = new Date(snapshot.importedAt).toLocaleDateString();
      const entry: { [key: string]: number | string } = { date };

      allTrackNames.forEach((trackName) => {
        const currentTrack = snapshot.mostPlayedTracks.find(
          (t: TopTrack) => `${t.name} - ${t.artist}` === trackName,
        );

        if (trendView === "difference" && i > 0) {
          const prevSnapshot = trends[i - 1];
          const prevTrack = prevSnapshot.mostPlayedTracks.find(
            (t: TopTrack) => `${t.name} - ${t.artist}` === trackName,
          );

          const currentValue = currentTrack
            ? sortBy === "playCount"
              ? currentTrack.playCount
              : currentTrack.playTime
            : 0;
          const prevValue = prevTrack
            ? sortBy === "playCount"
              ? prevTrack.playCount
              : prevTrack.playTime
            : 0;

          entry[trackName] = currentValue - prevValue;
        } else {
          entry[trackName] = currentTrack
            ? sortBy === "playCount"
              ? currentTrack.playCount
              : currentTrack.playTime
            : 0;
        }
      });
      return entry;
    });

    // Filter out the first entry if in difference mode, as it will always be 0 or the absolute value
    return trendView === "difference" ? processedData.slice(1) : processedData;
  }, [trends, sortBy, count, trendView]);

  const trackNames = useMemo(() => {
    if (chartData.length === 0) return [];
    return Object.keys(chartData[0]).filter((key) => key !== "date");
  }, [chartData]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Top {count} Most Played Tracks {trendView === "difference" ? "Difference" : "Trend"} Over
          Time
        </CardTitle>
      </CardHeader>
      <CardContent>
        {chartData.length > 0 ? (
          <ChartContainer config={{}} className="min-h-[200px] w-full">
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis
                  label={{
                    value:
                      trendView === "difference"
                        ? `Difference in ${sortBy === "playCount" ? "Play Count" : "Play Time (seconds)"}`
                        : sortBy === "playCount"
                          ? "Play Count"
                          : "Play Time (seconds)",
                    angle: -90,
                    position: "insideLeft",
                  }}
                />
                <Tooltip content={<ChartTooltipContent />} />
                {trackNames.map((name, index) => (
                  <Line
                    key={name}
                    type="monotone"
                    dataKey={name}
                    stroke={CHART_COLORS[index % CHART_COLORS.length]}
                    fill={CHART_COLORS[index % CHART_COLORS.length]}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        ) : (
          <p>No trend data available. Import more libraries to see trends.</p>
        )}
      </CardContent>
    </Card>
  );
};
