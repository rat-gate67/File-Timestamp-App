interface JsonData {
    id?: number;
    prefix?: string;
    content_hash?: string;
}

export class JsonTreat {
    private json: JsonData;
    private id: number;
    private prefix: string;
    private content: string;

    constructor(jsonData: JsonData) {
        this.json = jsonData;
        this.id = jsonData.id || 0;
        this.prefix = jsonData.prefix || '';
        this.content = jsonData.content_hash || '';
    }
    
    public getTimestampId(): number {
        return this.id;
    }

    public getPrefix(): string {
        return this.prefix;
    }

    public getContent(): string {
        return this.content;
    }
}