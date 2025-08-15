import { Music } from "lucide-react";
import { useEffect, useState } from "react";

import { Skeleton } from "@/components/ui/skeleton";
import { getTrackImage } from "@/lib/musicbrainz";
import { formatTimeDuration } from "@/lib/utils";

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
    <div className="space-y-4">
      <div className="flex items-start space-x-4">
        {loading ? (
          <Skeleton className="h-28 w-28 flex-shrink-0 rounded-md" />
        ) : imageUrl ? (
          <img src={imageUrl} alt={track.Name} className="h-28 w-28 flex-shrink-0 rounded-md" />
        ) : (
          <div className="bg-muted flex h-28 w-28 flex-shrink-0 items-center justify-center rounded-md">
            <Music className="text-muted-foreground h-14 w-14" />
          </div>
        )}
        <div className="min-w-0 flex-1 space-y-1">
          <h2 className="text-xl font-bold">{track.Name}</h2>
          <p className="text-muted-foreground">{track.Artist}</p>
          <p className="text-muted-foreground text-sm">
            {track.Album} ({track.Year})
          </p>
          <p className="text-muted-foreground text-sm">{track.Genre}</p>
        </div>
      </div>
      <div className="border-border border-t pt-4">
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <p className="text-muted-foreground">Play Count</p>
            <p className="font-medium">{track["Play Count"]}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-muted-foreground">Play Time</p>
            <p className="text-right font-medium">
              {formatTimeDuration(track["Total Time"] * track["Play Count"])}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
