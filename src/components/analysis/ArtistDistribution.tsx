import { Pie, PieChart, ResponsiveContainer, Cell, Legend, Tooltip } from "recharts";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./artist-distribution-columns";
import { useStore } from "@/store";
import { useAtom } from "jotai";
import { activeTabAtom } from "@/atoms";
import { ExportButton } from "../ExportButton";
import { useRef } from 'react';

interface Props {
  artists: { name: string; count: number }[];
}

export const ArtistDistribution = ({ artists }: Props) => {
  const { setFilter, filter } = useStore();
  const [, setActiveTab] = useAtom(activeTabAtom);
  const exportRef = useRef<HTMLDivElement>(null);

  const chartData = artists.map(a => ({ name: a.name, value: a.count }));
  const chartColors = [
    'hsl(var(--chart-1))',
    'hsl(var(--chart-2))',
    'hsl(var(--chart-3))',
    'hsl(var(--chart-4))',
    'hsl(var(--chart-5))',
  ];

  const handleClick = (data: any) => {
    const artist = data.name;
    if (filter.type === 'artist' && filter.value === artist) {
      setFilter({ type: null, value: null });
    } else {
      setFilter({ type: 'artist', value: artist });
      setActiveTab('most-played-tracks');
    }
  };

  return (
    <div>
      <div ref={exportRef}>
        <ChartContainer config={{}} className="min-h-[200px] w-full">
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Tooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Pie data={chartData} dataKey="value" nameKey="name" onClick={handleClick}>
                        {chartData.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={chartColors[index % chartColors.length]} />
                        ))}
                    </Pie>
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
