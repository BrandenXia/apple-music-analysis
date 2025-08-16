import { useAtom, useAtomValue } from "jotai";

import { db } from "@/lib/db";
import { parse } from "@/lib/parser";

import { analysisAtom, tracksAtom } from "./atoms";
import { Dashboard } from "./components/Dashboard";
import { FileUploader } from "./components/FileUploader";

function App() {
  const [tracks, setTracks] = useAtom(tracksAtom);
  const analysis = useAtomValue(analysisAtom);

  const handleFileUploaded = async (file: File) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      if (e.target?.result) {
        const parsedLibrary = parse(e.target.result as string);
        await db.libraries.add({
          name: file.name,
          data: parsedLibrary,
          importedAt: new Date(),
        });
        setTracks(parsedLibrary.tracks);
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
