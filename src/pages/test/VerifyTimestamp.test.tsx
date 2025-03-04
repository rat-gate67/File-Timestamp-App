import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { VerifyTimestamp } from '../VerifyTimestamp';
import { Tapyrus } from '../../utils/Tapyrus';
import '@testing-library/jest-dom';

// Tapyrusクラスのモック
jest.mock('../../utils/Tapyrus');

describe('VerifyTimestamp', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // 初期レンダリングのテスト
  test('初期状態で正しくレンダリングされること', () => {
    render(<VerifyTimestamp />);
    
    expect(screen.getByText('Verify the file timestamp')).toBeInTheDocument();
    expect(screen.getByText('Enter ID:')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Verify ID/i })).toBeDisabled();
  });

  // ファイル選択とID入力のテスト
  test('ファイルとIDが入力された時にボタンが有効になること', async () => {
    render(<VerifyTimestamp />);
    
    // ファイル選択をシミュレート
    const file = new File(['dummy content'], 'test.txt', { type: 'text/plain' });
    const fileInput = screen.getByTestId('file-input');
    await act(async () => {
      fireEvent.change(fileInput, { target: { files: [file] } });
    });

    // ID入力をシミュレート
    const idInput = screen.getByPlaceholderText('your ID');
    await act(async () => {
      fireEvent.change(idInput, { target: { value: 'test-id' } });
    });

    expect(screen.getByRole('button', { name: /Verify ID/i })).toBeEnabled();
  });

  // // 検証成功のテスト
  // test('検証が成功した場合、成功メッセージが表示されること', async () => {
  //   const mockGetTimestamp = jest.fn().mockResolvedValue({
  //     status: 'confirmed',
  //     content_hash: 'test content',
  //     block_time: 1234567890,
  //     txid: 'test-txid'
  //   });
  //   (Tapyrus as jest.Mock).mockImplementation(() => ({
  //     getTimestamp: mockGetTimestamp
  //   }));

  //   render(<VerifyTimestamp />);

  //   // ファイルとID入力をシミュレート
  //   const file = new File(['test content'], 'test.txt', { type: 'text/plain' });
  //   const fileInput = screen.getByTestId('file-input');
  //   await act(async () => {
  //     fireEvent.change(fileInput, { target: { files: [file] } });
  //   });

  //   const idInput = screen.getByPlaceholderText('your ID');
  //   await act(async () => {
  //     fireEvent.change(idInput, { target: { value: 'test-id' } });
  //   });

  //   // 検証ボタンクリック
  //   await act(async () => {
  //     fireEvent.click(screen.getByRole('button', { name: /Verify ID/i }));
  //   });

  //   await waitFor(() => {
  //     expect(screen.getByText('Timestamp verification succeeded.')).toBeInTheDocument();
  //   });
  // });

  // エラーケースのテスト
  test('IDが存在しない場合、エラーメッセージが表示されること', async () => {
    const mockGetTimestamp = jest.fn().mockResolvedValue(null);
    (Tapyrus as jest.Mock).mockImplementation(() => ({
      getTimestamp: mockGetTimestamp
    }));

    render(<VerifyTimestamp />);

    // ファイルとID入力をシミュレート
    const file = new File(['test content'], 'test.txt', { type: 'text/plain' });
    const fileInput = screen.getByTestId('file-input');
    await act(async () => {
      fireEvent.change(fileInput, { target: { files: [file] } });
    });

    const idInput = screen.getByPlaceholderText('your ID');
    await act(async () => {
      fireEvent.change(idInput, { target: { value: 'invalid-id' } });
    });

    // 検証ボタンクリック
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /Verify ID/i }));
    });

    await waitFor(() => {
      expect(screen.getByText(/Invalid ID or verification failed/i)).toBeInTheDocument();
    });
  });

  // 未確認状態のテスト
  test('トランザクションが未確認の場合、警告メッセージが表示されること', async () => {
    const mockGetTimestamp = jest.fn().mockResolvedValue({
      status: 'unconfirmed',
      txid: 'test-txid'
    });
    (Tapyrus as jest.Mock).mockImplementation(() => ({
      getTimestamp: mockGetTimestamp
    }));

    render(<VerifyTimestamp />);

    // ファイルとID入力をシミュレート
    const file = new File(['test content'], 'test.txt', { type: 'text/plain' });
    const fileInput = screen.getByTestId('file-input');
    await act(async () => {
      fireEvent.change(fileInput, { target: { files: [file] } });
    });

    const idInput = screen.getByPlaceholderText('your ID');
    await act(async () => {
      fireEvent.change(idInput, { target: { value: 'unconfirmed-id' } });
    });

    // 検証ボタンクリック
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /Verify ID/i }));
    });

    await waitFor(() => {
      expect(screen.getByText(/The timestamp is unconfirmed./i)).toBeInTheDocument();
    });
  });
});