import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from "axios";
import fs from "fs";
import https from "https";
import dotenv from "dotenv";

dotenv.config();
// HTTP メソッドの型
type HttpMethod = 'GET' | 'POST';

interface TapyrusResponse {
	id: number;
	version: string; 
	txid: string | null;
	status: string;
	content_hash: string;	
	prefix: string;
	wallet_id: string;
	timestamp_type: string;
	block_height: number | null;
	block_time: number | null;
};

const httpsAgent = new https.Agent({
	cert: fs.readFileSync(process.env.CLIENT_CERT_PATH as string), // クライアント証明書のパス
	rejectUnauthorized: true,
});

// Axios インスタンスを作成
let instance: AxiosInstance | null = null;

function getAxiosInstance(): AxiosInstance{
	if(!instance){
		instance = axios.create({
			baseURL: 'https://wrf5wojx.api.tapyrus.chaintope.com',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer mG553ghd3mA5x3surJHTnDcIBi0nsx7SRT4QWxST94rHhtfit0ZKYAO2QhczJC56',
			},
			httpsAgent,
		});
	}
	return instance;
}
export class Tapyrus {
  private _method: HttpMethod;
  private _url: string = '/api/v2/timestamps'; // デフォルト値あり

  constructor(method: HttpMethod, url: string) {
    this._method = method;
    this._url = url;
  }

  public get method(): HttpMethod {
    return this._method;
  }

  public get url(): string {
    return this._url;
  }

  public set method(value: HttpMethod) {
    this._method = value;
  }

  public set url(value: string) {
    this._url = value;
  }

	// Timestamp登録用関数
  public async registerTimestamp(fileContent: string, filePrefix: string): Promise<TapyrusResponse>{
		// リクエストボディ
    const body = {
      content: fileContent,
      digest: "none",
      prefix: filePrefix,
      type: "simple",
    };

    // Axios リクエスト設定
    const config: AxiosRequestConfig = {
      method: this._method,
      url: this._url,
      data: body,
    };
		console.log(instance);

    try {
      const response = await getAxiosInstance().request(config);
      return response.data; // サーバーからのレスポンスを返す
    } catch (error: unknown) {
			if (axios.isAxiosError(error)) {
				const axiosError = error as AxiosError;
	      console.error("Axios error while registering timestamp:", AxiosError);
				if (axiosError.response) {
					console.error("Response data:", axiosError.response.data)
				}
			} else {
					console.error("Unexpected error:", error);
     	 		throw error; // エラーハンドリングを呼び出し側に委ねる
			}
    }
  }
}
