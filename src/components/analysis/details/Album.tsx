import { Disc } from "lucide-react";
import { useEffect, useState } from "react";

import { Skeleton } from "@/components/ui/skeleton";
import { getAlbumImage } from "@/lib/musicbrainz";
import { formatTimeDuration, toTitleCase } from "@/lib/utils";

import type { TopAlbum } from "@/types";

interface Props {
  album: TopAlbum;
}

export const Album = ({ album }: Props) => {
  const [imageUrl, setImageUrl] = useState<string | undefined>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (album.name && album.tracks[0]?.Artist)
      getAlbumImage(album.name, album.tracks[0]?.Artist).then((url) => {
        if (typeof url === "string") setImageUrl(url);
        setLoading(false);
      });
    else setLoading(false);
  }, [album]);

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
    <div className="space-y-4">
      <div className="flex items-start space-x-4">
        {loading ? (
          <Skeleton className="h-28 w-28 flex-shrink-0 rounded-md" />
        ) : imageUrl ? (
          <img src={imageUrl} alt={album.name} className="h-28 w-28 flex-shrink-0 rounded-md" />
        ) : (
          <div className="bg-muted flex h-28 w-28 flex-shrink-0 items-center justify-center rounded-md">
            <Disc className="text-muted-foreground h-14 w-14" />
          </div>
        )}
        <div className="min-w-0 flex-1 space-y-1">
          <h2 className="text-xl font-bold">{album.name}</h2>
          <p className="text-muted-foreground">
            {album.tracks[0]?.Artist} ({album.tracks[0]?.Year})
          </p>
          <p className="text-muted-foreground text-sm">{genres}</p>
        </div>
      </div>
      <div className="border-border border-t pt-4">
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <p className="text-muted-foreground">Song Count</p>
            <p className="font-medium">{album.tracks.length}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-muted-foreground">Play Count</p>
            <p className="font-medium">{album.playCount}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-muted-foreground">Play Time</p>
            <p className="text-right font-medium">{formatTimeDuration(album.playTime)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
