import Dexie from "dexie";

import type { Library } from "@/types";
import type { Table } from "dexie";

export interface LibraryWithDate {
  id?: number;
  name: string;
  data: Library;
  importedAt: Date;
}

export class MySubClassedDexie extends Dexie {
  libraries!: Table<LibraryWithDate>;

  constructor() {
    super("appleMusicAnalysis");
    this.version(1).stores({
      libraries: "++id, name, importedAt",
    });
  }
}

export const db = new MySubClassedDexie();
