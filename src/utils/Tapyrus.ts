import axios, { AxiosRequestConfig } from "axios";
import fs from "fs";
import https from "https";

// HTTP メソッドの型
type HttpMethod = 'GET' | 'POST';

// Axios インスタンスを作成
const instance = axios.create({
	baseURL: 'https://wrf5wojx.api.tapyrus.chaintope.com',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer mG553ghd3mA5x3surJHTnDcIBi0nsx7SRT4QWxST94rHhtfit0ZKYAO2QhczJC56',
  },
});

const httpsAgent = new https.Agent({
	cert: fs.readFileSync("/path/to/certificate.pem"), // クライアント証明書のパス
	key: fs.readFileSync("/path/to/privatekey.pem"),   // 秘密鍵のパス
});

class Tapyrus {
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
  public async registerTimestamp(fileContent: string, filePrefix: string): Promise<string>{
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
      httpsAgent: httpsAgent,
    };

    try {
      const response = await instance(config);
      return response.data; // サーバーからのレスポンスを返す
    } catch (error: any) {
      console.error("Error occurred while registering timestamp:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
      }
      throw error; // エラーハンドリングを呼び出し側に委ねる
    }
  }
}

export default Tapyrus;
