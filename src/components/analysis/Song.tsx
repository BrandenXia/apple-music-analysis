import { formatDuration, intervalToDuration } from "date-fns";
import { Music } from "lucide-react";
import { useEffect, useState } from "react";

import { Skeleton } from "@/components/ui/skeleton";
import { getTrackImage } from "@/lib/musicbrainz";

import type { Track } from "@/types";

interface Props {
  track: Track;
}

export const Song = ({ track }: Props) => {
  const [imageUrl, setImageUrl] = useState<string | undefined>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (track.Name && track.Artist) {
      getTrackImage(track.Name, track.Artist).then((url) => {
        if (typeof url === "string") {
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
          <Skeleton className="h-32 w-32 flex-shrink-0 rounded-md" />
        ) : imageUrl ? (
          <img src={imageUrl} alt={track.Name} className="h-32 w-32 flex-shrink-0 rounded-md" />
        ) : (
          <div className="bg-muted flex h-32 w-32 flex-shrink-0 items-center justify-center rounded-md">
            <Music className="text-muted-foreground h-16 w-16" />
          </div>
        )}
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold">{track.Name}</h2>
          <p className="text-muted-foreground">{track.Artist}</p>
          <p className="text-muted-foreground mt-1 text-sm">
            {track.Album} ({track.Year})
          </p>
          <p className="text-muted-foreground mt-1 text-sm">{track.Genre}</p>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-4 text-center">
        <div>
          <p className="text-muted-foreground text-sm font-medium">Play Count</p>
          <p className="text-2xl font-bold">{track["Play Count"]}</p>
        </div>
        <div>
          <p className="text-muted-foreground text-sm font-medium">Play Time</p>
          <p className="text-lg font-semibold break-words">
            {formatDuration(
              intervalToDuration({ start: 0, end: track["Total Time"] * track["Play Count"] }),
            )}
          </p>
        </div>
      </div>
    </div>
  );
};
