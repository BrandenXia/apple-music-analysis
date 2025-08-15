
import { Track } from "../../types";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface Props {
  track: Track;
  onClose: () => void;
}

export const Song = ({ track, onClose }: Props) => {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{track.Name}</DialogTitle>
          <DialogDescription>
            Detailed information about the track.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p><strong>Artist:</strong> {track.Artist}</p>
          <p><strong>Album:</strong> {track.Album}</p>
          <p><strong>Genre:</strong> {track.Genre}</p>
          <p><strong>Grouping:</strong> {track.Grouping}</p>
          <p><strong>Year:</strong> {track.Year}</p>
          <p><strong>Play Count:</strong> {track["Play Count"]}</p>
          <p><strong>Play Time:</strong> {(track["Total Time"] / 60000).toFixed(2)} minutes</p>
          <p><strong>Date Added:</strong> {new Date(track["Date Added"]).toLocaleDateString()}</p>
        </div>
        <Button onClick={onClose}>Close</Button>
      </DialogContent>
    </Dialog>
  );
};
