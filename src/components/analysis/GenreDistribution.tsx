import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./genre-distribution-columns";

ChartJS.register(ArcElement, Tooltip, Legend);

interface Props {
  genres: { name: string; count: number }[];
}

export const GenreDistribution = ({ genres }: Props) => {
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

  return (
    <div>
      <div className="w-full max-w-2xl h-auto mx-auto">
        <Pie data={data} options={{ responsive: true, maintainAspectRatio: true }} />
      </div>
      <div className="mt-4">
        <DataTable columns={columns} data={genres} />
      </div>
    </div>
  );
};