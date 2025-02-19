import { useState } from 'react';
import GetFile from '../components/GetFile';
import { IdDisplay } from '../components/IdDisplay';
import { Button } from '../components/Button';
import { DispInfo } from '../components/DispInfo';
// import { generateTimestamp } from '../utils/timestamp';

import { FileTreat } from '../utils/FileTreat';
import { Tapyrus } from '../utils/Tapyrus';
import { JsonTreat } from '../utils/JsonTreat';

export function GenerateTimestamp() {
    // 選択されたファイルを保持するためのステート
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  // 生成されたタイムスタンプを保持するためのステート
  const [id, setId] = useState<string | null>(null);
  
  const [loading, setLoading] = useState(false);
  const [txid, setTxid] = useState<string | null>(null);

  // ファイルが選択されたときの処理
  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setId(null);
  };

  // IDを生成する処理
  const handleGenerateTimestamp = async () => {
    if (!selectedFile) return;

    setLoading(true);

    // tapyrusAPIを使ってIDを作成する
    const fileTreat = new FileTreat(selectedFile.name, '', '');
    await fileTreat.createPrefix(selectedFile.name);
    await fileTreat.createContent(selectedFile);
    
    const fileContent = fileTreat.getContent();
    const filepre = fileTreat.getFilepre();

    const tapyrus = new Tapyrus("POST","/api/v2/timestamps");
    const result = await tapyrus.registerTimestamp(fileContent, filepre);
    setTxid(result.txid);
    const jsonTreat = new JsonTreat(result);
    const id = jsonTreat.getTimestampId();
    setId(id.toString());
    setLoading(false);
    
  };

  
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Generate a ID</h1>
      <p className="text-gray-600 mb-8">
      ファイルをアップロードしIDを作成します。このIDを使って、特定の時点でのファイルの存在を確認することができます。
      </p>

      <GetFile onFileSelect={handleFileSelect} />

      {selectedFile && <DispInfo fileName={selectedFile.name} />}

      <Button
        onClick={handleGenerateTimestamp}
        disabled={!selectedFile || loading}
        className="mt-6"
      >
        {loading ? 'Generating...' : 'Generate ID'}
      </Button>

      <IdDisplay id={id} />
      {txid && 
      <a href={`https://testnet-explorer.tapyrus.dev.chaintope.com/tx/${txid}`}>トランザクションを表示
      </a>
      }
      
    </div>
  );
}