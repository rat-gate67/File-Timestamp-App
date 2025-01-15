import crypto from 'crypto-js';

export class FileTreat {
    private filepre : string; // ファイル名
    private filefix : string; // 最大10バイトのHex文字列
    private content : string; // 最大127バイトのHex文字列

    constructor(filepre : string, filefix : string, content : string) {
        this.filepre = filepre;
        this.filefix = filefix;
        this.content = content;
    }

    // ファイル名から最大10バイトのHex文字列を生成
    public createPrefix(filename : string) : void {
        const hash = crypto.SHA256(filename);
        this.filepre = hash.toString(crypto.enc.Hex).slice(0, 10);
    }

    // ファイルを受け取りSHA256でハッシュ化し、最大127バイトのHex文字列を生成
    public async createContent(file: File): Promise<void> {
        const arrayBuffer = await file.arrayBuffer();
        const bytes = new Uint8Array(arrayBuffer);
    
        const wordArray = crypto.lib.WordArray.create(bytes);
        const hash = crypto.SHA256(wordArray);
        this.content = hash.toString(crypto.enc.Hex);
    }

    public getFilefix(): string {
        return this.filefix;
    }

    public getContent(): string {
        return this.content;
    }

    public getFilepre(): string {
        return this.filepre;
    }
}