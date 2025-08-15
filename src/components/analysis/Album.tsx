import { formatDuration, intervalToDuration } from "date-fns";
import { Disc } from "lucide-react";
import { useEffect, useState } from "react";

import { Skeleton } from "@/components/ui/skeleton";
import { getAlbumImage } from "@/lib/musicbrainz";

import type { TopAlbum } from "@/types";

interface Props {
  album: TopAlbum;
}

export const Album = ({ album }: Props) => {
  const [imageUrl, setImageUrl] = useState<string | undefined>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (album.name && album.tracks[0]?.Artist) {
      getAlbumImage(album.name, album.tracks[0]?.Artist).then((url) => {
        if (typeof url === "string") {
          setImageUrl(url);
        }
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [album]);

  const toTitleCase = (str: string) => {
    return str.replace(
      /\w\S*/g,
      (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(),
    );
  };

  const genres = [
    ...new Set(
      album.tracks
        .flatMap((t) => t.Genre?.split(",") || [])
        .map((g) => g.trim().toLowerCase())
        .filter((g) => g),
    ),
  ]
    .map(toTitleCase)
    .join(", ");

  return (
    <div>
      <div className="flex items-start space-x-4">
        {loading ? (
          <Skeleton className="h-32 w-32 flex-shrink-0 rounded-md" />
        ) : imageUrl ? (
          <img src={imageUrl} alt={album.name} className="h-32 w-32 flex-shrink-0 rounded-md" />
        ) : (
          <div className="bg-muted flex h-32 w-32 flex-shrink-0 items-center justify-center rounded-md">
            <Disc className="text-muted-foreground h-16 w-16" />
          </div>
        )}
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold">{album.name}</h2>
          <p className="text-muted-foreground">
            {album.tracks[0]?.Artist} ({album.tracks[0]?.Year})
          </p>
          <p className="text-muted-foreground mt-1 text-sm">{genres}</p>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-muted-foreground text-sm font-medium">Song Count</p>
          <p className="text-2xl font-bold">{album.tracks.length}</p>
        </div>
        <div>
          <p className="text-muted-foreground text-sm font-medium">Play Count</p>
          <p className="text-2xl font-bold">{album.playCount}</p>
        </div>
        <div>
          <p className="text-muted-foreground text-sm font-medium">Play Time</p>
          <p className="text-lg font-semibold break-words">
            {formatDuration(intervalToDuration({ start: 0, end: album.playTime }))}
          </p>
        </div>
      </div>
    </div>
  );
};
