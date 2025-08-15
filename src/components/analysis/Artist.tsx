import type { TopArtist } from "@/types";
import { formatDuration, intervalToDuration } from "date-fns";
import { Mic } from "lucide-react";

interface Props {
  artist: TopArtist;
}

export const Artist = ({ artist }: Props) => {
  const toTitleCase = (str: string) => {
    return str.replace(
      /\w\S*/g,
      (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    );
  };

  const genres = [
    ...new Set(
      artist.tracks
        .flatMap(t => t.Genre?.split(',') || [])
        .map(g => g.trim().toLowerCase())
        .filter(g => g)
    )
  ]
  .map(toTitleCase)
  .join(', ');

  return (
    <div>
        <div className="flex items-center space-x-4">
            <div className="h-32 w-32 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                <Mic className="h-16 w-16 text-muted-foreground" />
            </div>
            <div className="min-w-0 flex-1">
                <h2 className="text-2xl font-bold">{artist.name}</h2>
                <p className="text-sm text-muted-foreground mt-1">{genres}</p>
            </div>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-4 text-center">
            <div>
                <p className="text-sm font-medium text-muted-foreground">Song Count</p>
                <p className="text-2xl font-bold">{artist.tracks.length}</p>
            </div>
            <div>
                <p className="text-sm font-medium text-muted-foreground">Play Count</p>
                <p className="text-2xl font-bold">{artist.playCount}</p>
            </div>
            <div>
                <p className="text-sm font-medium text-muted-foreground">Play Time</p>
                <p className="text-lg font-semibold break-words">{formatDuration(intervalToDuration({ start: 0, end: artist.playTime }))}</p>
            </div>
        </div>
    </div>
  );
};