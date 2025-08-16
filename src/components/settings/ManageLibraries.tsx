import { useLiveQuery } from "dexie-react-hooks";
import { useSetAtom } from "jotai";
import { useRef } from "react";

import { libraryAtom } from "@/atoms";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { parse } from "@/lib/parser";

export const ManageLibraries = () => {
  const setLibrary = useSetAtom(libraryAtom);
  const libraries = useLiveQuery(() => db.libraries.orderBy("importedAt").reverse().toArray());
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDelete = (id: number) => {
    db.libraries.delete(id);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = async (event) => {
        if (event.target?.result) {
          const parsedLibrary = parse(event.target.result as string);
          await db.libraries.add({
            name: file.name,
            data: parsedLibrary,
            importedAt: new Date(),
          });
          setLibrary(parsedLibrary);
        }
      };
      reader.readAsText(file);
    }
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Manage Libraries</h3>
        <Button onClick={handleImportClick}>Import Library</Button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept=".xml"
        />
      </div>
      <div className="mt-4 space-y-4">
        {libraries?.map((lib) => (
          <div key={lib.id} className="flex items-center justify-between">
            <div>
              <p className="font-medium">{lib.name}</p>
              <p className="text-muted-foreground text-sm">
                Imported on {new Date(lib.importedAt).toLocaleString()}
              </p>
            </div>
            <Button variant="destructive" size="sm" onClick={() => handleDelete(lib.id!)}>
              Delete
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};
