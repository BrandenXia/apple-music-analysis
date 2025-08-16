import { useLiveQuery } from "dexie-react-hooks";
import { useAtomValue } from "jotai";
import { useMemo } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { countAtom, sortByAtom } from "@/atoms";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getMostPlayedTrends } from "@/lib/analysis/most-played-trends";
import { db } from "@/lib/db";

import type { MostPlayedSnapshot } from "@/lib/analysis/most-played-trends";

export const MostPlayedTrends = () => {
  const sortBy = useAtomValue(sortByAtom);
  const count = useAtomValue(countAtom);
  const allLibraries = useLiveQuery(() => db.libraries.orderBy("importedAt").toArray());

  const trends: MostPlayedSnapshot[] = useMemo(() => {
    if (!allLibraries) return [];
    return getMostPlayedTrends(allLibraries, sortBy, count);
  }, [allLibraries, sortBy, count]);

  const chartData = useMemo(() => {
    if (!trends || trends.length === 0) return [];

    const dataMap: { [date: string]: { [name: string]: number } } = {};
    const allTrackNames: Set<string> = new Set();

    trends.forEach((snapshot) => {
      const date = new Date(snapshot.importedAt).toLocaleDateString();
      dataMap[date] = dataMap[date] || {};
      snapshot.mostPlayedTracks.slice(0, count).forEach((track) => {
        const trackName = `${track.name} - ${track.artist}`;
        dataMap[date][trackName] = sortBy === "playCount" ? track.playCount : track.playTime;
        allTrackNames.add(trackName);
      });
    });

    const sortedDates = Object.keys(dataMap).sort(
      (a, b) => new Date(a).getTime() - new Date(b).getTime(),
    );

    return sortedDates.map((date) => {
      const entry: { [key: string]: number | string } = { date };
      allTrackNames.forEach((trackName) => {
        entry[trackName] = dataMap[date][trackName] || 0;
      });
      return entry;
    });
  }, [trends, sortBy, count]);

  const trackNames = useMemo(() => {
    if (chartData.length === 0) return [];
    return Object.keys(chartData[0]).filter((key) => key !== "date");
  }, [chartData]);

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top {count} Most Played Tracks Trend Over Time</CardTitle>
      </CardHeader>
      <CardContent>
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis
                label={{
                  value: sortBy === "playCount" ? "Play Count" : "Play Time (seconds)",
                  angle: -90,
                  position: "insideLeft",
                }}
              />
              <Tooltip />
              {trackNames.map((name) => (
                <Area
                  key={name}
                  type="monotone"
                  dataKey={name}
                  stackId="1"
                  stroke={getRandomColor()}
                  fill={getRandomColor()}
                />
              ))}
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <p>No trend data available. Import more libraries to see trends.</p>
        )}
      </CardContent>
    </Card>
  );
};
