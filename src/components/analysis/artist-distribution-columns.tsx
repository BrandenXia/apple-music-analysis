"use client";

import type { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<{ name: string; count: number }>[] = [
  {
    accessorKey: "name",
    header: "Artist",
  },
  {
    accessorKey: "count",
    header: "Song Count",
  },
];
