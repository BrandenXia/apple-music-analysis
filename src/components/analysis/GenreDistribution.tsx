import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import type { Chart } from "chart.js";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./genre-distribution-columns";
import { useStore } from "@/store";
import { useRef } from "react";
import { getElementAtEvent } from "react-chartjs-2";
import { useAtom } from "jotai";
import { activeTabAtom } from "@/atoms";
import { legendSpacingPlugin } from "@/lib/chart-plugins";
import { ExportButton } from "../ExportButton";

ChartJS.register(ArcElement, Tooltip, Legend, legendSpacingPlugin);

interface Props {
  genres: { name: string; count: number }[];
}

export const GenreDistribution = ({ genres }: Props) => {
  const { setFilter, filter } = useStore();
  const [, setActiveTab] = useAtom(activeTabAtom);
  const chartRef = useRef<Chart<'pie', number[], string>>(null);
  const exportRef = useRef<HTMLDivElement>(null);

  const data = {
    labels: genres.map((g) => g.name),
    datasets: [
      {
        label: "# of Songs",
        data: genres.map((g) => g.count),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const onClick = (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    if (!chartRef.current) return;
    const element = getElementAtEvent(chartRef.current, event);
    if (element.length > 0) {
      const { index } = element[0];
      const genre = genres[index].name;
      if (filter.type === 'genre' && filter.value === genre) {
        setFilter({ type: null, value: null });
      } else {
        setFilter({ type: 'genre', value: genre });
        setActiveTab('most-played-tracks');
      }
    }
  };

  return (
    <div>
      <div ref={exportRef}>
        <div className="w-full max-w-2xl h-auto mx-auto">
          <Pie data={data} options={{ responsive: true, maintainAspectRatio: true }} onClick={onClick} ref={chartRef} />
        </div>
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