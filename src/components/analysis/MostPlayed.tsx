import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { formatDuration, intervalToDuration } from "date-fns";
import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

interface Props<T> {
    items: T[];
    sortBy: "playCount" | "playTime";
    columns: ColumnDef<T, any>[];
    getLabel: (item: T) => string;
}

export const MostPlayed = <T extends { name: string, playCount: number, playTime: number }>({ items, sortBy, columns, getLabel }: Props<T>) => {
    const playCountDataset = {
        label: "Play Count",
        data: items.map(item => item.playCount),
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        borderColor: "rgb(75, 192, 192)",
        borderWidth: 1,
    };

    const playTimeDataset = {
        label: "Play Time (hours)",
        data: items.map(item => item.playTime / 1000 / 60 / 60),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        borderColor: "rgb(255, 99, 132)",
        borderWidth: 1,
    };

    const datasets = sortBy === 'playTime' 
        ? [playTimeDataset, playCountDataset] 
        : [playCountDataset, playTimeDataset];

    const data = {
        labels: items.map(item => getLabel(item)),
        datasets,
    };

    const options = {
        indexAxis: 'y' as const,
        elements: {
            bar: {
                borderWidth: 2,
            },
        },
        responsive: true,
        plugins: {
            legend: {
                position: 'right' as const,
            },
            title: {
                display: true,
                text: 'Most Played',
            },
            tooltip: {
                callbacks: {
                    label: function(context: any) {
                        let label = context.dataset.label || '';
                        if (label) {
                            label += ': ';
                        }
                        if (context.dataset.label === "Play Time (hours)") {
                            label += formatDuration(intervalToDuration({ start: 0, end: context.raw * 60 * 60 * 1000 }))
                        } else {
                            label += context.raw;
                        }
                        return label;
                    }
                }
            }
        },
    };

    return (
        <div>
            <Bar options={options} data={data} />
            <div className="mt-4">
                <DataTable columns={columns} data={items} />
            </div>
        </div>
    );
};