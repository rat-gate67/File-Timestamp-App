import { useState } from 'react';
import GetFile from '../components/GetFile';
import { Button } from '../components/Button';
import { DispInfo } from '../components/DispInfo';
import { FileTreat } from '../utils/FileTreat';
import { Tapyrus } from '../utils/Tapyrus';

export function VerifyTimestamp() {
  // 選択されたファイルを保持するためのステート
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  // 入力されたIDを保持するためのステート
  const [inputId, setInputId] = useState<string>('');
  // タイムスタンプの検証結果を保持するためのステート
  const [verificationResult, setVerificationResult] = useState<'success' | 'unsuccess'  | 'unconfirmed' | 'error' | null>(null);
  // ブロックのタイムスタンプを保持するためのステート
  const [blockTime, setBlockTime] = useState<number | null>(null);
  
  const [loading, setLoading] = useState(false);
  const [txid, setTxid] = useState<string | null>(null);

  // ファイルが選択されたときの処理
  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setVerificationResult(null);
  };

  // IDを検証する処理
  const handleVerifyTimestamp = async () => {
    if (!selectedFile || !inputId) return;

    setLoading(true);

    // tapyrusAPIを使ってタイムスタンプを検証する
    try {
      const tapyrus = new Tapyrus("GET","/api/v2/timestamps");
      const result = await tapyrus.getTimestamp(inputId);

    setTxid(result.txid);

    if (result.status === 'unconfirmed') {
      setVerificationResult('unconfirmed');
      setLoading(false);
      return;
    }

    const fileTreat = new FileTreat(selectedFile.name, '', '');
    await fileTreat.createContent(selectedFile);
    
    const fileContent = fileTreat.getContent();

    if (fileContent !== result.content_hash) {
      setVerificationResult('unsuccess');
      setLoading(false);
      return;
    }

    setVerificationResult('success');
    setBlockTime(result.block_time);
    setLoading(false);

    } catch (error) {
      console.error(error);
      setVerificationResult('error');
      setLoading(false);
    }
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
        Enter ID:
      </label>
      <input
        type="text"
        id="timestamp"
        value={inputId}
        onChange={(e) => setInputId(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        placeholder="your ID"
      />
      </div>


      <Button
      onClick={handleVerifyTimestamp}
      disabled={!selectedFile || !inputId || loading}
      className="mt-6"
      >
      Verify ID {loading ? '...' : ''}
      </Button>

      {verificationResult === 'error' && (
      <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
        Invalid ID or verification failed.
      </div>
      )}


      {verificationResult === 'unconfirmed' && (
      <div  className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
        Timestamp verification succeeded.
        {/* Timestamp(unconfirmed) verification succeeded. */}
      </div>
      )}

      {verificationResult === 'unsuccess' && (
      <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
        Timestamp verification failed.
      </div>
      )}

      {verificationResult === 'success' && (
      <div  className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
          <div>
            Timestamp verification succeeded.
          </div>
          <div>
            Block time: {blockTime ? new Date(blockTime * 1000).toString() : ''}
          </div>
        </div>
      )}
      {txid && 
      <a 
        className='mt-6 cursor-pointer' 
        onClick={(e) => {
          e.preventDefault();
          setTimeout(() => {
        window.open(`https://testnet-explorer.tapyrus.dev.chaintope.com/tx/${txid}`, '_blank');
          }, 1000);
        }}
      >
        トランザクションを表示
        {/* https://testnet-explorer.tapyrus.dev.chaintope.com/tx/${txid} */}
      </a>
      }
    </div>
  );
}