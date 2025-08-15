"use client";

import { formatDuration, intervalToDuration } from "date-fns";

import type { TopTrack } from "@/types";
import type { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<TopTrack>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "artist",
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
