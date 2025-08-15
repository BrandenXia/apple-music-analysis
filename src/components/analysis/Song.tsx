
import { Track } from "../../types";

interface Props {
  track: Track;
  onClose: () => void;
}

export const Song = ({ track, onClose }: Props) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">{track.Name}</h2>
        <p>Artist: {track.Artist}</p>
        <p>Album: {track.Album}</p>
        <p>Genre: {track.Genre}</p>
        <p>Year: {track.Year}</p>
        <p>Play Count: {track["Play Count"]}</p>
        <p>Play Time: {(track["Total Time"] / 60000).toFixed(2)} minutes</p>
        <p>Date Added: {new Date(track["Date Added"]).toLocaleDateString()}</p>
        <button onClick={onClose} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
          Close
        </button>
      </div>
    </div>
  );
};
