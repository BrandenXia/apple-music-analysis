import { useState, useEffect } from "react";
import type { Track } from "@/types";
import { formatDuration, intervalToDuration } from "date-fns";
import { getTrackImage } from "@/lib/musicbrainz";
import { Skeleton } from "@/components/ui/skeleton";
import { Music } from "lucide-react";

interface Props {
  track: Track;
}

export const Song = ({ track }: Props) => {
  const [imageUrl, setImageUrl] = useState<string | undefined>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTrackImage(track.Name, track.Artist).then(url => {
      setImageUrl(url);
      setLoading(false);
    });
  }, [track]);

  return (
    <div className="flex items-center space-x-4">
      {loading ? (
        <Skeleton className="h-24 w-24 rounded-md flex-shrink-0" />
      ) : imageUrl ? (
        <img src={imageUrl} alt={track.Name} className="h-24 w-24 rounded-md flex-shrink-0" />
      ) : (
        <div className="h-24 w-24 rounded-md bg-muted flex items-center justify-center flex-shrink-0">
            <Music className="h-12 w-12 text-muted-foreground" />
        </div>
      )}
      <div>
        <h2 className="text-2xl font-bold">{track.Name}</h2>
        <p className="text-muted-foreground">{track.Artist}</p>
        <p className="text-sm text-muted-foreground">{track.Album}</p>
        <div className="mt-2 text-sm text-muted-foreground">
            <p>Play Count: {track["Play Count"]}</p>
            <p>Play Time: {formatDuration(intervalToDuration({ start: 0, end: track["Total Time"] * track["Play Count"] }))}</p>
        </div>
      </div>
    </div>
  );
};