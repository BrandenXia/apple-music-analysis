import { useAtom } from "jotai";
import { useEffect, useState } from "react";

import { db } from "@/lib/db";
import { parse } from "@/lib/parser";

import { libraryAtom } from "./atoms/data";
import { Dashboard } from "./components/Dashboard";
import { FileUploader } from "./components/FileUploader";

function App() {
  const [library, setLibrary] = useAtom(libraryAtom);
  const [isLibraryLoaded, setIsLibraryLoaded] = useState(false);

  useEffect(() => {
    const fetchLatestLibrary = async () => {
      const latestLibrary = await db.libraries.orderBy("importedAt").last();
      if (latestLibrary) {
        setLibrary(latestLibrary.data);
      }
      setIsLibraryLoaded(true);
    };
    fetchLatestLibrary();
  }, [setLibrary]);

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
        setLibrary(parsedLibrary);
      }
    };
    reader.readAsText(file);
  };

  if (!isLibraryLoaded) {
    return <div>Loading application...</div>; // Or a spinner
  }

  return (
    <div>{library ? <Dashboard /> : <FileUploader onFileUploaded={handleFileUploaded} />}</div>
  );
}

export default App;
