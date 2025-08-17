import html2canvas from "html2canvas-pro";
import { Download } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Props {
  elementRef: React.RefObject<HTMLElement>;
  fileName: string;
  className?: string;
}

export const ExportButton = ({ elementRef, fileName, className }: Props) => {
  const handleExport = () => {
    if (elementRef.current)
      html2canvas(elementRef.current).then((canvas) => {
        const link = document.createElement("a");
        link.download = `${fileName}.png`;
        link.href = canvas.toDataURL("image/png");
        link.click();
      });
  };

  return (
    <Button onClick={handleExport} variant="outline" size="icon" className={cn(className)}>
      <Download className="h-4 w-4" />
    </Button>
  );
};
