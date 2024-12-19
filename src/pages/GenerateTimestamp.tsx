import React, { useState } from 'react';
import { FileUpload } from '../components/FileUpload';
import { TimestampDisplay } from '../components/TimestampDisplay';
import { Button } from '../components/Button';
import { FileInfo } from '../components/FileInfo';
import { generateTimestamp } from '../utils/timestamp';

export function GenerateTimestamp() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [timestamp, setTimestamp] = useState<string | null>(null);

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setTimestamp(null);
  };

  const handleGenerateTimestamp = () => {
    if (!selectedFile) return;

    // tapyrusAPIを使ってタイムスタンプを作成する
    const newTimestamp = generateTimestamp();


    setTimestamp(newTimestamp);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Generate a timestamp</h1>
      <p className="text-gray-600 mb-8">
      ファイルをアップロードしタイムスタンプを作成します。このタイムスタンプを使って、特定の時点でのファイルの存在を確認することができます。
      </p>

      <FileUpload onFileSelect={handleFileSelect} />

      {selectedFile && <FileInfo fileName={selectedFile.name} />}

      <Button
        onClick={handleGenerateTimestamp}
        disabled={!selectedFile}
        className="mt-6"
      >
        Create timestamp
      </Button>

      <TimestampDisplay timestamp={timestamp} />
    </div>
  );
}