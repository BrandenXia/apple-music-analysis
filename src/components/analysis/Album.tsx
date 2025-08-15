import { useState, useEffect } from "react";
import type { TopAlbum } from "@/types";
import { getAlbumImage } from "@/lib/musicbrainz";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDuration, intervalToDuration } from "date-fns";
import { Disc } from "lucide-react";

interface Props {
  album: TopAlbum;
}

export const Album = ({ album }: Props) => {
  const [imageUrl, setImageUrl] = useState<string | undefined>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAlbumImage(album.name, album.tracks[0]?.Artist).then(url => {
      setImageUrl(url);
      setLoading(false);
    });
  }, [album]);

  return (
    <div className="flex items-center space-x-4">
      {loading ? (
        <Skeleton className="h-24 w-24 rounded-md flex-shrink-0" />
      ) : imageUrl ? (
        <img src={imageUrl} alt={album.name} className="h-24 w-24 rounded-md flex-shrink-0" />
      ) : (
        <div className="h-24 w-24 rounded-md bg-muted flex items-center justify-center flex-shrink-0">
            <Disc className="h-12 w-12 text-muted-foreground" />
        </div>
      )}
      <div>
        <h2 className="text-2xl font-bold">{album.name}</h2>
        <p className="text-muted-foreground">{album.tracks[0]?.Artist}</p>
        <div className="mt-2 text-sm text-muted-foreground">
            <p>Play Count: {album.playCount}</p>
            <p>Play Time: {formatDuration(intervalToDuration({ start: 0, end: album.playTime }))}</p>
        </div>
      </div>
    </div>
  );
};