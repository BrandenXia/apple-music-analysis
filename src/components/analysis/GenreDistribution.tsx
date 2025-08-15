import { Pie, PieChart, ResponsiveContainer } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./genre-distribution-columns";
import { useStore } from "@/store";
import { useAtom } from "jotai";
import { activeTabAtom } from "@/atoms";
import { ExportButton } from "../ExportButton";
import { useRef } from "react";
import type { ChartConfig } from "@/components/ui/chart";

interface Props {
  genres: { name: string; count: number }[];
}

export const GenreDistribution = ({ genres }: Props) => {
  const { setFilter, filter } = useStore();
  const [, setActiveTab] = useAtom(activeTabAtom);
  const exportRef = useRef<HTMLDivElement>(null!);

  const chartData = genres.map((g, idx) => ({
    name: g.name,
    value: g.count,
    fill: `var(--chart-${(idx % 5) + 1})`,
  }));

  const chartConfig = genres.reduce(
    (acc, genre, index) => {
      const key = genre.name;
      acc[key] = {
        label: genre.name,
        color: `var(--chart-${(index % 5) + 1})`,
      };
      return acc;
    },
    { value: { label: "Songs" } } as ChartConfig,
  );

  const handleClick = (data: { name: string }) => {
    const genre = data.name;
    if (filter.type === "genre" && filter.value === genre) {
      setFilter({ type: null, value: null });
    } else {
      setFilter({ type: "genre", value: genre });
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
              <ChartTooltip content={<ChartTooltipContent hideLabel />} />
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
          <DataTable columns={columns} data={genres} />
        </div>
      </div>
      <div className="mt-4 flex justify-end">
        <ExportButton elementRef={exportRef} fileName="genre-distribution" />
      </div>
    </div>
  );
};
