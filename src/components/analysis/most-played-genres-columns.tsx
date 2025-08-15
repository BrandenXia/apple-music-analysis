"use client";

import { formatDuration, intervalToDuration } from "date-fns";

import type { TopGenre } from "@/types";
import type { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<TopGenre>[] = [
  {
    accessorKey: "name",
    header: "Genre",
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
