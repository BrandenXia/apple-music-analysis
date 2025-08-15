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
import type { Chart } from "chart.js";
import { formatDuration, intervalToDuration } from "date-fns";
import { DataTable } from "@/components/ui/data-table";
import type { ColumnDef } from "@tanstack/react-table";
import type { TopTrack, TopArtist, TopAlbum, TopGenre } from "@/types";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Song } from "./Song";
import { Artist } from "./Artist";
import { Album } from "./Album";
import { useRef, useState } from "react";
import { getElementAtEvent } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

type MostPlayedItem = TopTrack | TopArtist | TopAlbum | TopGenre;

interface Props<T extends MostPlayedItem> {
    items: T[];
    sortBy: "playCount" | "playTime";
    columns: ColumnDef<T, any>[];
    getLabel: (item: T) => string;
}

export const MostPlayed = <T extends MostPlayedItem>({ items, sortBy, columns, getLabel }: Props<T>) => {
    const [selectedItem, setSelectedItem] = useState<T | null>(null);
    const chartRef = useRef<Chart<'bar', number[], string>>(null);

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

    const onClick = (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
        if (!chartRef.current) return;
        const element = getElementAtEvent(chartRef.current, event);
        if (element.length > 0) {
            const { index } = element[0];
            setSelectedItem(items[index]);
        }
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
        <Dialog open={!!selectedItem} onOpenChange={(open) => !open && setSelectedItem(null)}>
            <Bar options={options} data={data} onClick={onClick} ref={chartRef} />
            <div className="mt-4">
                <DataTable columns={columns} data={items} />
            </div>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Details</DialogTitle>
                </DialogHeader>
                {selectedItem && 'artist' in selectedItem && <Song track={(selectedItem as TopTrack).track} />}
                {selectedItem && 'tracks' in selectedItem && !('artist' in selectedItem) && <Album album={selectedItem as TopAlbum} />}
                {selectedItem && !('tracks' in selectedItem) && !('artist' in selectedItem) && <Artist artist={selectedItem as TopArtist} />}
            </DialogContent>
        </Dialog>
    );
};
