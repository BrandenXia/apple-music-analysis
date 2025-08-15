import { Pie, PieChart, ResponsiveContainer } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { DataTable } from "@/components/ui/data-table";
import { useStore } from "@/store";
import { useAtom } from "jotai";
import { activeTabAtom } from "@/atoms";
import { ExportButton } from "../ExportButton";
import { useRef } from "react";
import type { ChartConfig } from "@/components/ui/chart";
import { type ColumnDef } from "@tanstack/react-table";

interface Props {
  data: { name: string; count: number }[];
  columns: ColumnDef<{ name: string; count: number }>[];
  filterType: "artist" | "genre";
  fileName: string;
  hideTooltipLabel?: boolean;
}

export const DistributionChart = ({
  data,
  columns,
  filterType,
  fileName,
  hideTooltipLabel,
}: Props) => {
  const { setFilter, filter } = useStore();
  const [, setActiveTab] = useAtom(activeTabAtom);
  const exportRef = useRef<HTMLDivElement>(null!);

  const chartData = data.map((d, idx) => ({
    name: d.name,
    value: d.count,
    fill: `var(--chart-${(idx % 5) + 1})`,
  }));

  const chartConfig = data.reduce(
    (acc, item, index) => {
      const key = item.name;
      acc[key] = {
        label: item.name,
        color: `var(--chart-${(index % 5) + 1})`,
      };
      return acc;
    },
    { value: { label: "Songs" } } as ChartConfig,
  );

  const handleClick = (d: { name: string }) => {
    const value = d.name;
    if (filter.type === filterType && filter.value === value) {
      setFilter({ type: null, value: null });
    } else {
      setFilter({ type: filterType, value: value });
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
              <ChartTooltip
                content={<ChartTooltipContent hideLabel={hideTooltipLabel} />}
              />
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
          <DataTable columns={columns} data={data} />
        </div>
      </div>
      <div className="mt-4 flex justify-end">
        <ExportButton elementRef={exportRef} fileName={fileName} />
      </div>
    </div>
  );
};
