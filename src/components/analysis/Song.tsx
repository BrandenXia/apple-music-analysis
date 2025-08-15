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
    if (track.Name && track.Artist) {
      getTrackImage(track.Name, track.Artist).then((url) => {
        if (typeof url === 'string') {
          setImageUrl(url);
        }
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [track]);

  return (
    <div>
        <div className="flex items-start space-x-4">
            {loading ? (
                <Skeleton className="h-32 w-32 rounded-md flex-shrink-0" />
            ) : imageUrl ? (
                <img src={imageUrl} alt={track.Name} className="h-32 w-32 rounded-md flex-shrink-0" />
            ) : (
                <div className="h-32 w-32 rounded-md bg-muted flex items-center justify-center flex-shrink-0">
                    <Music className="h-16 w-16 text-muted-foreground" />
                </div>
            )}
            <div className="min-w-0 flex-1">
                <h2 className="text-2xl font-bold">{track.Name}</h2>
                <p className="text-muted-foreground">{track.Artist}</p>
                <p className="text-sm text-muted-foreground mt-1">{track.Album} ({track.Year})</p>
                <p className="text-sm text-muted-foreground mt-1">{track.Genre}</p>
            </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-4 text-center">
            <div>
                <p className="text-sm font-medium text-muted-foreground">Play Count</p>
                <p className="text-2xl font-bold">{track["Play Count"]}</p>
            </div>
            <div>
                <p className="text-sm font-medium text-muted-foreground">Play Time</p>
                <p className="text-lg font-semibold break-words">{formatDuration(intervalToDuration({ start: 0, end: track["Total Time"] * track["Play Count"] }))}</p>
            </div>
        </div>
    </div>
  );
};