"use client"

import { ColumnDef } from "@tanstack/react-table"
import { TopArtist } from "@/types"
import { formatDuration, intervalToDuration } from "date-fns"

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
    cell: ({ row }) => formatDuration(intervalToDuration({ start: 0, end: row.original.playTime }))
  },
]
