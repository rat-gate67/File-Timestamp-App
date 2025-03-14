import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload } from 'lucide-react';

interface GetFileProps {
  onFileSelect: (file: File) => void;
}

const GetFile: React.FC<GetFileProps> = ({ onFileSelect }) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onFileSelect(acceptedFiles[0]);
    }
  }, [onFileSelect]);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      data-testid="dropzone"
      className="border-2 border-dashed border-gray-300 rounded-lg p-16 text-center cursor-pointer hover:border-blue-500 transition-colors"
    >
      <input 
      {...getInputProps()} 
      data-testid="file-input"
      />
      <div className="flex flex-col items-center gap-6">
        <div 
            data-testid="upload-icon"
            className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
          <Upload className="w-10 h-10 text-blue-500" />
        </div>
        <div>
          <p className="text-xl font-medium">Upload file here</p>
          <p className="text-lg text-gray-500">Or drag & drop file here</p>
        </div>
      </div>
    </div>
  );
}

export default GetFile;