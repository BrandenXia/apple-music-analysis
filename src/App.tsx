import { FileUploader } from "./components/FileUploader";
import { Dashboard } from "./components/Dashboard";
import { useStore } from "./store";
import { parse } from "./utils/parser";

function App() {
  const { tracks, analysis, setTracks } = useStore();

  const handleFileUploaded = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        const tracks = parse(e.target.result as string);
        setTracks(tracks);
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
