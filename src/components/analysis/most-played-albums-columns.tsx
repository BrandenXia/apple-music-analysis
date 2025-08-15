"use client"

import type { ColumnDef } from "@tanstack/react-table"
import type { TopAlbum } from "@/types"
import { formatDuration, intervalToDuration } from "date-fns"

export const columns: ColumnDef<TopAlbum>[] = [
  {
    accessorKey: "name",
    header: "Album",
  },
  {
    header: "Artist",
    accessorFn: row => row.tracks[0]?.Artist || "N/A",
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