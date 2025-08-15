import { useAtom, useAtomValue } from "jotai";

import { analysisAtom, tracksAtom } from "./atoms";
import { Dashboard } from "./components/Dashboard";
import { FileUploader } from "./components/FileUploader";
import { parse } from "./utils/parser";

function App() {
  const [tracks, setTracks] = useAtom(tracksAtom);
  const analysis = useAtomValue(analysisAtom);

  const handleFileUploaded = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        const parsedTracks = parse(e.target.result as string);
        setTracks(parsedTracks);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div>
      {analysis && tracks.length > 0 ? (
        <Dashboard />
      ) : (
        <FileUploader onFileUploaded={handleFileUploaded} />
      )}
    </div>
  );
}

export default App;
