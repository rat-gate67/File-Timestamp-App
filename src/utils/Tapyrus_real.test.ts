import { Tapyrus } from "./Tapyrus";

describe("Tapyrus API Integration Test", () => {
  let tapyrus: Tapyrus;

  beforeEach(() => {
    tapyrus = new Tapyrus("POST", "/api/v2/timestamps");
  });

  it("should successfully register a timestamp with the real API", async () => {
    // 実際にAPIへ送信するデータ
    const fileContent = "7b226669656c6431223a202276616c756531227d";
    const filePrefix = "74657374617070";

    // API を実際に叩く
    const result = await tapyrus.registerTimestamp(fileContent, filePrefix);

    // レスポンスの検証
    console.log("API Response:", result);
    expect(result).toHaveProperty("id");
    expect(result).toHaveProperty("txid");
    expect(result).toHaveProperty("status");
    expect(result.status).toBe("unconfirmed");
  }, 30000); // タイムアウトを 30 秒に延長

	it("should handle API error correctly", async () => {
		const fileContent = "fileContent"; // 無効なデータ
		const filePrefix = "filePrefix";
		jest.spyOn(console, "error").mockImplementation(() => {}); // エラー出力を監視
		await tapyrus.registerTimestamp(fileContent, filePrefix);

		expect(console.error).toHaveBeenCalled(); // エラーがログに記録されたか
	});
});
