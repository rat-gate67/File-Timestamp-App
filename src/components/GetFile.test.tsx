import { render, screen } from '@testing-library/react';
import GetFile from './GetFile';
import '@testing-library/jest-dom';
import { useDropzone } from 'react-dropzone';
import '@testing-library/jest-dom';


// Mock react-dropzone
jest.mock('react-dropzone', () => ({
  useDropzone: jest.fn(),
}));

describe('GetFile Component', () => {
  const mockOnFileSelect = jest.fn();

  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();
    (useDropzone as jest.Mock).mockImplementation(() => ({
      getRootProps: () => ({}),
      getInputProps: () => ({}),
    }));
  });

  test('コンポーネントが正しくレンダリングされる', () => {
    render(<GetFile onFileSelect={mockOnFileSelect} />);

    expect(screen.getByText('Upload file here')).toBeInTheDocument();
    expect(screen.getByText('Or drag & drop file here')).toBeInTheDocument();
  });

  test('ファイルがドロップされたときにコールバックが呼ばれる', () => {
    const mockFile = new File(['test'], 'test.txt', { type: 'text/plain' });
    (useDropzone as jest.Mock).mockImplementation(({ onDrop }) => {
      onDrop([mockFile]);
      return {
        getRootProps: () => ({}),
        getInputProps: () => ({}),
      };
    });

    render(<GetFile onFileSelect={mockOnFileSelect} />);
    expect(mockOnFileSelect).toHaveBeenCalledWith(mockFile);
  });

  test('UIの要素が正しく表示される', () => {
    render(<GetFile onFileSelect={mockOnFileSelect} />);
    const dropzone = screen.getByTestId('dropzone');

    expect(dropzone).toHaveClass(
      'border-2',
      'border-dashed',
      'border-gray-300',
      'rounded-lg'
    );
  });
  test('アップロードアイコンが表示される', () => {
    render(<GetFile onFileSelect={mockOnFileSelect} />);
    const iconContainer = screen.getByTestId('upload-icon');
    expect(iconContainer).toBeInTheDocument();
  });
});