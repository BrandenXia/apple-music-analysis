"use client";

import { formatTimeDuration } from "@/lib/utils";

import type { TopAlbum } from "@/types";
import type { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<TopAlbum>[] = [
  {
    accessorKey: "name",
    header: "Album",
  },
  {
    header: "Artist",
    accessorFn: (row) => row.tracks[0]?.Artist || "N/A",
  },
  {
    accessorKey: "playCount",
    header: "Play Count",
  },
  {
    accessorKey: "playTime",
    header: "Play Time",
    cell: ({ row }) => formatTimeDuration(row.original.playTime),
  },
];
