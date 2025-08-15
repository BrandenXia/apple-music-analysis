"use client"

import { ColumnDef } from "@tanstack/react-table"
import { TopTrack, TopArtist, TopAlbum, TopGenre } from "@/types"
import { formatDuration, intervalToDuration } from "date-fns"

export const columns: ColumnDef<TopTrack | TopArtist | TopAlbum | TopGenre>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "artist",
    header: "Artist",
    // @ts-ignore
    cell: ({ row }) => row.original.artist || "N/A",
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
