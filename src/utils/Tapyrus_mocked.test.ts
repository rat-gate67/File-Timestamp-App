import {Tapyrus} from "./Tapyrus";
import axios, {AxiosInstance} from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;


describe('Tapyrus', () => {
  let tapyrus: Tapyrus;
	
  beforeEach(() => {
		mockedAxios.create.mockReturnValue(mockedAxios as unknown as AxiosInstance);
		mockedAxios.request = jest.fn();
    tapyrus = new Tapyrus('POST', '/api/v2/timestamps');
		jest.clearAllMocks();
  });

  it('should set and get method correctly', () => {
    expect(tapyrus.method).toBe('POST');
  });

  it('should set and get url correctly', () => {
    expect(tapyrus.url).toBe('/api/v2/timestamps');
  });

  it('should register timestamp successfully', async () => {
		const mockResponse = {
			data: {
				"id": 1,
				"version": "2",
				"txid": "6fce02d39279f6d645ecc710ebcf1dbb7b8104106553d8da13f5db79c5a628fc",
				"status": "confirmed",
				"content_hash": "7b226669656c6431223a202276616c756531227d",
				"prefix": "74657374617070",
				"wallet_id": "b831e51927edc7b3a21869909d526e51",
				"timestamp_type": "simple",
				"block_height": 101,
				"block_time": 1626169080
			},
		};
		
		(mockedAxios.request as jest.Mock).mockResolvedValueOnce( mockResponse );

    const fileContent = '7b226669656c6431223a202276616c756531227d';
    const filePrefix = '74657374617070';

    const result = await tapyrus.registerTimestamp(fileContent, filePrefix);

    expect(result).toEqual(mockResponse.data);
		expect(mockedAxios.create).toHaveBeenCalledWith(
			expect.objectContaining({
				baseURL: 'https://wrf5wojx.api.tapyrus.chaintope.com',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': 'Bearer mG553ghd3mA5x3surJHTnDcIBi0nsx7SRT4QWxST94rHhtfit0ZKYAO2QhczJC56',
				},
			})
		);
    expect(mockedAxios.request).toHaveBeenCalledWith(
			expect.objectContaining({
        method: 'POST',
        url: '/api/v2/timestamps',
        data: {
          content: '7b226669656c6431223a202276616c756531227d',
          digest: 'none',
          prefix: '74657374617070',
          type: 'simple',
        },
      })
		);

  });

  it('should handle error during timestamp registration', async () => {
    const errorMessage = "Test error"; 
		(mockedAxios.request as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));
		const fileContent = 'file content';
    const filePrefix = 'prefix';

		await expect(tapyrus.registerTimestamp(fileContent, filePrefix)).rejects.toThrow(errorMessage);
  });
});

