"use client";

import { formatTimeDuration } from "@/lib/utils";

import type { TopArtist } from "@/types";
import type { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<TopArtist>[] = [
  { accessorKey: "name", header: "Artist" },
  { accessorKey: "playCount", header: "Play Count" },
  {
    accessorKey: "playTime",
    header: "Play Time",
    cell: ({ row }) => formatTimeDuration(row.original.playTime),
  },
];
