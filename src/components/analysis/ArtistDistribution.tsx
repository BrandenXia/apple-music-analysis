import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./artist-distribution-columns";
import { useStore } from "@/store";
import { useRef } from "react";
import { getElementAtEvent } from "react-chartjs-2";
import { useAtom } from "jotai";
import { activeTabAtom } from "@/atoms";

ChartJS.register(ArcElement, Tooltip, Legend);

interface Props {
  artists: { name: string; count: number }[];
}

export const ArtistDistribution = ({ artists }: Props) => {
  const { setFilter, filter } = useStore();
  const [, setActiveTab] = useAtom(activeTabAtom);
  const chartRef = useRef();

  const data = {
    labels: artists.map((a) => a.name),
    datasets: [
      {
        label: "# of Songs",
        data: artists.map((a) => a.count),
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
    const element = getElementAtEvent(chartRef.current!, event);
    if (element.length > 0) {
      const { index } = element[0];
      const artist = artists[index].name;
      if (filter.type === 'artist' && filter.value === artist) {
        setFilter({ type: null, value: null });
      } else {
        setFilter({ type: 'artist', value: artist });
        setActiveTab('most-played-tracks');
      }
    }
  };

  return (
    <div>
      <div className="w-full max-w-2xl h-auto mx-auto">
        <Pie data={data} options={{ responsive: true, maintainAspectRatio: true }} onClick={onClick} ref={chartRef} />
      </div>
      <div className="mt-4">
        <DataTable columns={columns} data={artists} />
      </div>
    </div>
  );
};