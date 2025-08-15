import type { TopArtist } from "@/types";
import { formatDuration, intervalToDuration } from "date-fns";
import { Mic } from "lucide-react";

interface Props {
  artist: TopArtist;
}

export const Artist = ({ artist }: Props) => {
  return (
    <div className="flex items-center space-x-4">
        <div className="h-24 w-24 rounded-full bg-muted flex items-center justify-center">
            <Mic className="h-12 w-12 text-muted-foreground" />
        </div>
      <div>
        <h2 className="text-2xl font-bold">{artist.name}</h2>
        <div className="mt-2 text-sm text-muted-foreground">
            <p>Play Count: {artist.playCount}</p>
            <p>Play Time: {formatDuration(intervalToDuration({ start: 0, end: artist.playTime }))}</p>
        </div>
      </div>
    </div>
  );
};