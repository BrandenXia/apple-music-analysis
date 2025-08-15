"use client"

import { ColumnDef } from "@tanstack/react-table"
import { TopGenre } from "@/types"
import { formatDuration, intervalToDuration } from "date-fns"

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
    cell: ({ row }) => formatDuration(intervalToDuration({ start: 0, end: row.original.playTime }))
  },
]
