import { PanelLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/datepicker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

import { ModeToggle } from "./ModeToggle";
import { SettingsDialog } from "./SettingsDialog";

interface SidebarProps {
  isSidebarCollapsed: boolean;
  setIsSidebarCollapsed: (collapsed: boolean) => void;
  startDateValue: Date | undefined;
  setStartDateValue: (date: Date | undefined) => void;
  endDateValue: Date | undefined;
  setEndDateValue: (date: Date | undefined) => void;
  handleDateRangeChange: () => void;
  genreKey: "Grouping" | "Genre";
  setGenreKey: (key: "Grouping" | "Genre") => void;
}

export const Sidebar = ({
  isSidebarCollapsed,
  setIsSidebarCollapsed,
  startDateValue,
  setStartDateValue,
  endDateValue,
  setEndDateValue,
  handleDateRangeChange,
  genreKey,
  setGenreKey,
}: SidebarProps) => {
  return (
    <div
      className={cn(
        "bg-sidebar text-sidebar-foreground overflow-y-auto p-4 transition-all duration-300",
        isSidebarCollapsed ? "w-16" : "w-64",
      )}
    >
      <div className="flex items-center justify-between">
        {!isSidebarCollapsed && <h1 className="text-2xl font-bold">Analysis</h1>}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        >
          <PanelLeft />
        </Button>
      </div>
      <div className={cn("mt-4", isSidebarCollapsed && "hidden")}>
        <h2 className="mb-2 text-lg font-bold">Date Range</h2>
        <div className="flex flex-col space-y-2">
          <DatePicker date={startDateValue} setDate={setStartDateValue} placeholder="Start Date" />
          <DatePicker date={endDateValue} setDate={setEndDateValue} placeholder="End Date" />
          <Button onClick={handleDateRangeChange}>Apply</Button>
        </div>
      </div>
      <div className={cn("mt-4", isSidebarCollapsed && "hidden")}>
        <h2 className="mb-2 text-lg font-bold">Genre Source</h2>
        <Select
          onValueChange={(value: "Grouping" | "Genre") => setGenreKey(value)}
          defaultValue={genreKey}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select genre source" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Grouping">Grouping</SelectItem>
            <SelectItem value="Genre">Genre</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div
        className={cn(
          "absolute bottom-4 flex",
          isSidebarCollapsed ? "flex-col space-y-2" : "items-center space-x-2",
        )}
      >
        <SettingsDialog />
        <ModeToggle />
      </div>
    </div>
  );
};
