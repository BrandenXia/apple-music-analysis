import { formatDuration, intervalToDuration } from "date-fns";
import { useRef, useState } from "react";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, XAxis, YAxis } from "recharts";

import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { DataTable } from "@/components/ui/data-table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import { ExportButton } from "../ExportButton";
import { Album } from "./Album";
import { Artist } from "./Artist";
import { Song } from "./Song";

import type { TopAlbum, TopArtist, TopGenre, TopTrack } from "@/types";
import type { ColumnDef } from "@tanstack/react-table";
import type { RefObject } from "react";

type MostPlayedItem = TopTrack | TopArtist | TopAlbum | TopGenre;

interface Props<T extends MostPlayedItem> {
  items: T[];
  sortBy: "playCount" | "playTime";
  columns: ColumnDef<T, unknown>[];
  getLabel: (item: T) => string;
}

export const MostPlayed = <T extends MostPlayedItem>({
  items,
  sortBy,
  columns,
  getLabel,
}: Props<T>) => {
  const [selectedItem, setSelectedItem] = useState<T | null>(null);
  const exportRef = useRef<HTMLDivElement>(null);

  const chartData = items.map((item) => ({
    name: getLabel(item),
    playCount: item.playCount,
    playTime: item.playTime / 1000 / 60 / 60,
  }));

  const bars =
    sortBy === "playTime"
      ? [
          <Bar
            key="playTime"
            dataKey="playTime"
            fill="var(--color-chart-2)"
            name="Play Time (hours)"
          />,
          <Bar key="playCount" dataKey="playCount" fill="var(--color-chart-1)" name="Play Count" />,
        ]
      : [
          <Bar key="playCount" dataKey="playCount" fill="var(--color-chart-1)" name="Play Count" />,
          <Bar
            key="playTime"
            dataKey="playTime"
            fill="var(--color-chart-2)"
            name="Play Time (hours)"
          />,
        ];

  return (
    <Dialog open={!!selectedItem} onOpenChange={(open) => !open && setSelectedItem(null)}>
      <div ref={exportRef}>
        <ChartContainer config={{}} className="min-h-[200px] w-full">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData} layout="vertical" margin={{ left: 120 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" width={120} tick={{ fontSize: 12 }} />
              <ChartTooltip
                formatter={(value, name) => {
                  if (name === "Play Time (hours)")
                    return formatDuration(
                      intervalToDuration({
                        start: 0,
                        end: (value as number) * 60 * 60 * 1000,
                      }),
                    );

                  return value.toString();
                }}
              />
              <Legend />
              {bars}
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
        <div className="mt-4">
          <DataTable columns={columns} data={items} />
        </div>
      </div>
      <div className="mt-4 flex justify-end">
        <ExportButton elementRef={exportRef as RefObject<HTMLElement>} fileName="most-played" />
      </div>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Details</DialogTitle>
        </DialogHeader>
        {selectedItem && "artist" in selectedItem && (
          <Song track={(selectedItem as TopTrack).track} />
        )}
        {selectedItem && "tracks" in selectedItem && !("artist" in selectedItem) && (
          <Album album={selectedItem as TopAlbum} />
        )}
        {selectedItem && !("tracks" in selectedItem) && !("artist" in selectedItem) && (
          <Artist artist={selectedItem as TopArtist} />
        )}
      </DialogContent>
    </Dialog>
  );
};
