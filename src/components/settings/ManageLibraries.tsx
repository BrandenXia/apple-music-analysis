import { useLiveQuery } from "dexie-react-hooks";

import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";

export const ManageLibraries = () => {
  const libraries = useLiveQuery(() => db.libraries.toArray());

  const handleDelete = (id: number) => {
    db.libraries.delete(id);
  };

  return (
    <div>
      <h3 className="text-lg font-medium">Manage Libraries</h3>
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
