import React from 'react';
import { FileUp } from 'lucide-react';

interface FileInfoProps {
  fileName: string;
}

export function DispInfo({ fileName }: FileInfoProps) {
  return (
    <div className="mt-4 flex items-center gap-2">
      <FileUp className="w-4 h-4 text-gray-600" />
      <span className="text-gray-600">Uploaded file:</span>
      <span className="font-medium">{fileName}</span>
    </div>
  );
}