"use client";

import { formatTimeDuration } from "@/lib/utils";

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
    cell: ({ row }) => formatTimeDuration(row.original.playTime),
  },
];
