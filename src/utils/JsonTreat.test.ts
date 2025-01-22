import { JsonTreat } from './JsonTreat';

describe('JsonTreat', () => {
    describe('constructor', () => {
        it('should initialize with complete data', () => {
            const jsonData = {
                id: 123,
                prefix: 'test-prefix',
                content_hash: 'test-content'
            };
            const jsonTreat = new JsonTreat(jsonData);

            expect(jsonTreat.getTimestampId()).toBe(123);
            expect(jsonTreat.getPrefix()).toBe('test-prefix');
            expect(jsonTreat.getContent()).toBe('test-content');
        });

        it('should initialize with partial data', () => {
            const jsonTreat = new JsonTreat({ id: 456 });

            expect(jsonTreat.getTimestampId()).toBe(456);
            expect(jsonTreat.getPrefix()).toBe('');
            expect(jsonTreat.getContent()).toBe('');
        });

        it('should initialize with empty data', () => {
            const jsonTreat = new JsonTreat({});

            expect(jsonTreat.getTimestampId()).toBe(0);
            expect(jsonTreat.getPrefix()).toBe('');
            expect(jsonTreat.getContent()).toBe('');
        });
    });

    describe('getters', () => {
        let jsonTreat: JsonTreat;

        beforeEach(() => {
            jsonTreat = new JsonTreat({
                id: 789,
                prefix: 'test-prefix',
                content_hash: 'test-content'
            });
        });

        it('should return correct timestamp ID', () => {
            expect(jsonTreat.getTimestampId()).toBe(789);
        });

        it('should return correct prefix', () => {
            expect(jsonTreat.getPrefix()).toBe('test-prefix');
        });

        it('should return correct content', () => {
            expect(jsonTreat.getContent()).toBe('test-content');
        });
    });

    describe('edge cases', () => {
        it('should handle undefined values', () => {
            const jsonTreat = new JsonTreat({
                id: undefined,
                prefix: undefined,
                content_hash: undefined
            });

            expect(jsonTreat.getTimestampId()).toBe(0);
            expect(jsonTreat.getPrefix()).toBe('');
            expect(jsonTreat.getContent()).toBe('');
        });

        it('should handle null values', () => {
            const jsonTreat = new JsonTreat({
                id: null as unknown as number,
                prefix: null as unknown as string,
                content_hash: null as unknown as string
            });

            expect(jsonTreat.getTimestampId()).toBe(0);
            expect(jsonTreat.getPrefix()).toBe('');
            expect(jsonTreat.getContent()).toBe('');
        });
    });
});