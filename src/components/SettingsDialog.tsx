import { Library, Settings } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

import { ManageLibraries } from "./settings/ManageLibraries";

export const SettingsDialog = () => {
  const [activeSection, setActiveSection] = useState("manage-libraries");

  const sections = [{ id: "manage-libraries", label: "Manage Libraries", icon: Library }];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Settings />
        </Button>
      </DialogTrigger>
      <DialogContent className="flex h-[70vh] flex-col sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>Manage your application settings.</DialogDescription>
        </DialogHeader>
        <div className="flex flex-1 overflow-hidden">
          <div className="w-56 overflow-y-auto pr-4">
            <nav className="flex flex-col space-y-1">
              {sections.map((section) => (
                <Button
                  key={section.id}
                  variant={activeSection === section.id ? "secondary" : "ghost"}
                  className={cn("justify-start", activeSection === section.id && "font-semibold")}
                  onClick={() => setActiveSection(section.id)}
                >
                  <section.icon className="mr-2 h-4 w-4" />
                  {section.label}
                </Button>
              ))}
            </nav>
          </div>
          <div className="flex-1 overflow-y-auto pl-4">
            {activeSection === "manage-libraries" && <ManageLibraries />}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
