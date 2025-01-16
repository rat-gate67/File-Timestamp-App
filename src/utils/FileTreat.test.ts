import { FileTreat } from './FileTreat';
import * as crypto from 'crypto-js';

describe('FileTreat', () => {
    let fileTreat: FileTreat;
    
    beforeEach(() => {
        fileTreat = new FileTreat('testpre', 'testfix', 'testcontent');
    });

    describe('constructor', () => {
        it('should initialize with provided values', () => {
            expect(fileTreat.getFilepre()).toBe('testpre');
            expect(fileTreat.getFilefix()).toBe('testfix');
            expect(fileTreat.getContent()).toBe('testcontent');
        });
    });

    describe('createPrefix', () => {
        it('should create a 10-byte hex string from filename', () => {
            fileTreat.createPrefix('test.txt');
            const expected = crypto.SHA256('test.txt')
                                 .toString(crypto.enc.Hex)
                                 .slice(0, 10);
            expect(fileTreat.getFilepre()).toBe(expected);
            expect(fileTreat.getFilepre().length).toBe(10);
        });
    });

    describe('createContent', () => {
        it('should create hash from file content', async () => {
            const mockFileContent = new Uint8Array([1, 2, 3, 4]);
            const blob = new Blob([mockFileContent]);
            const mockFile = {
                arrayBuffer: async () => mockFileContent.buffer,
                size: blob.size,
                type: blob.type,
                name: 'test.txt'
            } as File;
            
            await fileTreat.createContent(mockFile);
            
            const wordArray = crypto.lib.WordArray.create(mockFileContent);
            const expected = crypto.SHA256(wordArray).toString(crypto.enc.Hex);
            
            expect(fileTreat.getContent()).toBe(expected);
        });
    });

    describe('getters', () => {
        it('should return correct values', () => {
            expect(fileTreat.getFilefix()).toBe('testfix');
            expect(fileTreat.getContent()).toBe('testcontent');
            expect(fileTreat.getFilepre()).toBe('testpre');
        });
    });
});