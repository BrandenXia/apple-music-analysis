import { Button } from "@/components/ui/button";
import html2canvas from "html2canvas";
import { Download } from "lucide-react";

interface Props {
  elementRef: React.RefObject<HTMLElement>;
  fileName: string;
}

export const ExportButton = ({ elementRef, fileName }: Props) => {
  const handleExport = () => {
    if (elementRef.current) {
      html2canvas(elementRef.current).then((canvas) => {
        const link = document.createElement("a");
        link.download = `${fileName}.png`;
        link.href = canvas.toDataURL("image/png");
        link.click();
      });
    }
  };

  return (
    <Button onClick={handleExport} variant="outline" size="icon">
      <Download className="h-4 w-4" />
    </Button>
  );
};
