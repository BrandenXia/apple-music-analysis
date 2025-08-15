import { Pie, PieChart, ResponsiveContainer } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./artist-distribution-columns";
import { useStore } from "@/store";
import { useAtom } from "jotai";
import { activeTabAtom } from "@/atoms";
import { ExportButton } from "../ExportButton";
import { useRef } from "react";
import type { ChartConfig } from "@/components/ui/chart";

interface Props {
  artists: { name: string; count: number }[];
}

export const ArtistDistribution = ({ artists }: Props) => {
  const { setFilter, filter } = useStore();
  const [, setActiveTab] = useAtom(activeTabAtom);
  const exportRef = useRef<HTMLDivElement>(null!);

  const chartData = artists.map((a, idx) => ({
    name: a.name,
    value: a.count,
    fill: `var(--chart-${(idx % 5) + 1})`,
  }));

  const chartConfig = artists.reduce(
    (acc, artist, index) => {
      const key = artist.name;
      acc[key] = {
        label: artist.name,
        color: `var(--chart-${(index % 5) + 1})`,
      };
      return acc;
    },
    { value: { label: "Songs" } } as ChartConfig,
  );

  const handleClick = (data: { name: string }) => {
    const artist = data.name;
    if (filter.type === "artist" && filter.value === artist) {
      setFilter({ type: null, value: null });
    } else {
      setFilter({ type: "artist", value: artist });
      setActiveTab("most-played-tracks");
    }
  };

  return (
    <div>
      <div ref={exportRef}>
        <ChartContainer
          config={chartConfig}
          className="min-h-[200px] w-full [&_.recharts-pie-label-text]:fill-foreground"
        >
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <ChartTooltip content={<ChartTooltipContent />} />
              <Pie
                data={chartData}
                dataKey="value"
                onClick={handleClick}
                label
              />
              <ChartLegend
                content={<ChartLegendContent nameKey="name" />}
                className="-translate-y-2 flex-wrap gap-x-6 gap-y-3 max-w-2/3 *:justify-center mx-auto"
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
        <div className="mt-4">
          <DataTable columns={columns} data={artists} />
        </div>
      </div>
      <div className="mt-4 flex justify-end">
        <ExportButton elementRef={exportRef} fileName="artist-distribution" />
      </div>
    </div>
  );
};

