import { useState } from 'react';
import GetFile from '../components/GetFile';
import { TimestampDisplay } from '../components/TimestampDisplay';
import { Button } from '../components/Button';
import { DispInfo } from '../components/DispInfo';
import { generateTimestamp } from '../utils/timestamp';

export function GenerateTimestamp() {
    // 選択されたファイルを保持するためのステート
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  // 生成されたタイムスタンプを保持するためのステート
  const [timestamp, setTimestamp] = useState<string | null>(null);

  // ファイルが選択されたときの処理
  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setTimestamp(null);
  };

  // タイムスタンプを生成する処理
  const handleGenerateTimestamp = () => {
    if (!selectedFile) return;

    // tapyrusAPIを使ってタイムスタンプを作成する
    const newTimestamp = generateTimestamp();

    // 生成されたタイムスタンプをステートにセットする
    setTimestamp(newTimestamp);
  };

  
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Generate a timestamp</h1>
      <p className="text-gray-600 mb-8">
      ファイルをアップロードしタイムスタンプを作成します。このタイムスタンプを使って、特定の時点でのファイルの存在を確認することができます。
      </p>

      <GetFile onFileSelect={handleFileSelect} />

      {selectedFile && <DispInfo fileName={selectedFile.name} />}

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