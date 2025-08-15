
import { useState } from "react";
import { Track } from "../../types";
import { Song } from "./Song";

interface Props<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  onItemClick: (item: T) => void;
  selectedItem: T | null;
  allTracks: Track[];
}

export const MostPlayed = <T extends { tracks: Track[] } | { name: string, artist: string } >({ items, renderItem, onItemClick, selectedItem, allTracks }: Props<T>) => {
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);

  const handleTrackClick = (trackName: string) => {
    const track = allTracks.find(t => t.Name === trackName);
    if (track) {
      setSelectedTrack(track);
    }
  };

  return (
    <div>
      <ul>
        {items.map((item, index) => (
          <li key={index} className="mb-2">
            <a href="#" onClick={() => onItemClick(item)} className="text-blue-500 hover:underline">
                {renderItem(item)}
            </a>
            {selectedItem === item && 'tracks' in selectedItem && (
              <ul className="ml-4 mt-2">
                {(selectedItem.tracks as Track[]).map((track, i) => (
                  <li key={i} className="mb-1">
                    <a href="#" onClick={() => handleTrackClick(track.Name)} className="text-blue-500 hover:underline">
                        {track.Name}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
      {selectedTrack && <Song track={selectedTrack} onClose={() => setSelectedTrack(null)} />}
    </div>
  );
};
