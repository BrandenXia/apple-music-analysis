import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface Props {
  onFileUploaded: (file: File) => void;
  className?: string;
}

export const FileUploader = ({ onFileUploaded, className }: Props) => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (file) {
      onFileUploaded(file);
    }
  };

  return (
    <div className={cn("flex h-screen flex-col items-center justify-center", className)}>
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Apple Music Analysis</CardTitle>
          <CardDescription>Upload your Library.xml file to get started</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Input id="picture" type="file" onChange={handleFileChange} />
            </div>
            <Button onClick={handleUpload} disabled={!file}>
              Analyze
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
