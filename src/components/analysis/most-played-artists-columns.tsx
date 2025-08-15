"use client";

import { formatDuration, intervalToDuration } from "date-fns";

import type { TopArtist } from "@/types";
import type { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<TopArtist>[] = [
  {
    accessorKey: "name",
    header: "Artist",
  },
  {
    accessorKey: "playCount",
    header: "Play Count",
  },
  {
    accessorKey: "playTime",
    header: "Play Time",
    cell: ({ row }) => formatDuration(intervalToDuration({ start: 0, end: row.original.playTime })),
  },
];
