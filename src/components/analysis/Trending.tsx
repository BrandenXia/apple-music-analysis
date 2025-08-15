import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useRef } from "react";
import { ExportButton } from "../ExportButton";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface Props {
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      borderColor: string;
      backgroundColor: string;
    }[];
  };
}

export const Trending = ({ data }: Props) => {
  const exportRef = useRef<HTMLDivElement>(null);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Tracks Added Over Time",
      },
    },
  };

  return (
    <div>
      <div ref={exportRef}>
        <Line options={options} data={data} />
      </div>
      <div className="mt-4 flex justify-end">
        <ExportButton elementRef={exportRef} fileName="trending" />
      </div>
    </div>
  );
};
