import { useState } from 'react';
import GetFile from '../components/GetFile';
import { Button } from '../components/Button';
import { DispInfo } from '../components/DispInfo';
import { verifyTimestamp } from '../utils/timestamp';

export function VerifyTimestamp() {
  // 選択されたファイルを保持するためのステート
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  // 入力されたIDを保持するためのステート
  const [inputId, setInputId] = useState<string>('');
  // タイムスタンプの検証結果を保持するためのステート
  const [verificationResult, setVerificationResult] = useState<'success' | 'error' | null>(null);

  // ファイルが選択されたときの処理
  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setVerificationResult(null);
  };

  // IDを検証する処理
  const handleVerifyTimestamp = () => {
    if (!selectedFile || !inputId) return;

    // tapyrusAPIを使ってタイムスタンプを検証する

    const result = verifyTimestamp(inputId);

    
    setVerificationResult(result ? 'success' : 'error');
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Verify the file timestamp</h1>
      <p className="text-gray-600 mb-8">
      ファイルをアップロードし、IDを入力して、その時点におけるファイルの存在を確認します。      </p>

      <GetFile onFileSelect={handleFileSelect} />

      {selectedFile && <DispInfo fileName={selectedFile.name} />}

      <div className="mt-6">
      <label htmlFor="timestamp" className="block text-sm font-medium text-gray-700 mb-2">
        Enter timestamp:
      </label>
      <input
        type="text"
        id="timestamp"
        value={inputId}
        onChange={(e) => setInputId(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        placeholder="YYYY-MM-DD HH:mm:ss"
      />
      </div>

      <Button
      onClick={handleVerifyTimestamp}
      disabled={!selectedFile || !inputId}
      className="mt-6"
      >
      Verify timestamp
      </Button>

      {verificationResult === 'error' && (
      <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
        Invalid timestamp format or verification failed.
      </div>
      )}

      {verificationResult === 'success' && (
      <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
        Timestamp verification succeeded.
      </div>
      )}
    </div>
  );
}