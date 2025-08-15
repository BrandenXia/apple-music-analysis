import { Line, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { ExportButton } from "../ExportButton";
import { useRef } from 'react';

interface Props {
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      borderColor: string;
    }[];
  };
}

export const Trending = ({ data }: Props) => {
  const exportRef = useRef<HTMLDivElement>(null);

  const chartData = data.labels.map((label, index) => {
    const entry: { [key: string]: string | number } = { name: label };
    data.datasets.forEach(dataset => {
        entry[dataset.label] = dataset.data[index];
    });
    return entry;
  });

  return (
    <div>
      <div ref={exportRef}>
        <ChartContainer config={{}} className="min-h-[200px] w-full">
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip content={<ChartTooltipContent />} />
                    <Legend />
                    {data.datasets.map(dataset => (
                        <Line key={dataset.label} type="monotone" dataKey={dataset.label} stroke={dataset.borderColor} strokeWidth={2} />
                    ))}
                </LineChart>
            </ResponsiveContainer>
        </ChartContainer>
      </div>
      <div className="mt-4 flex justify-end">
        <ExportButton elementRef={exportRef} fileName="trending" />
      </div>
    </div>
  );
};