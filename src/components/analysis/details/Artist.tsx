import { Mic } from "lucide-react";

import { formatTimeDuration, toTitleCase } from "@/lib/utils";

import type { TopArtist } from "@/types";

interface Props {
  artist: TopArtist;
}

export const Artist = ({ artist }: Props) => {

  const genres = [
    ...new Set(
      artist.tracks
        .flatMap((t) => t.Genre?.split(",") || [])
        .map((g) => g.trim().toLowerCase())
        .filter((g) => g),
    ),
  ]
    .map(toTitleCase)
    .join(", ");

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <div className="bg-muted flex h-28 w-28 flex-shrink-0 items-center justify-center rounded-full">
          <Mic className="text-muted-foreground h-14 w-14" />
        </div>
        <div className="min-w-0 flex-1 space-y-1">
          <h2 className="text-xl font-bold">{artist.name}</h2>
          <p className="text-muted-foreground text-sm">{genres}</p>
        </div>
      </div>
      <div className="border-border border-t pt-4">
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <p className="text-muted-foreground">Song Count</p>
            <p className="font-medium">{artist.tracks.length}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-muted-foreground">Play Count</p>
            <p className="font-medium">{artist.playCount}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-muted-foreground">Play Time</p>
            <p className="font-medium text-right">
              {formatTimeDuration(artist.playTime)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
