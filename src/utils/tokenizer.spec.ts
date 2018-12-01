import { Tokenizer } from "./tokenizer";
import expect = require("expect");

describe('Tokenizer', () => {
    it('should read until', () => {
        const t = new Tokenizer('abcdefg');

        const result1 = t.readUntil('cd');
        const result2 = t.readUntil('f');

        expect(result1).toBe('abcd');
        expect(result2).toBe('ef');
    });

    it('should read single token', () => {
        const t = new Tokenizer('token');

        const first = t.nextToken();
        const second = t.nextToken();

        expect(first).toBe('token');
        expect(second).toBeUndefined();
    });

    it('should ignore line breaks', () => {
        const t = new Tokenizer('token1 token2 \n  \n  token3  ');
        expect(t.all()).toEqual(['token1', 'token2', 'token3']);
    });

    it('should stop on line breaks', () => {
        const t = new Tokenizer('  token1   \n  \n  token2  ');

        const tokens = [t.nextToken(true), t.nextToken(true), t.nextToken(true), t.nextToken(true)];

        expect(tokens).toEqual(['token1', '', 'token2', undefined]);
    });

    it('should ignore whitespaces', () => {
        const t = new Tokenizer('   token');
        expect(t.all()).toEqual(['token']);
    });

    it('should skip single line comments', () => {
        const t = new Tokenizer(`token1
            // comment
            token2`);

        expect(t.all()).toEqual(['token1', 'token2']);
    });

    it('should skip multi line comments', () => {
        const t = new Tokenizer(`token1
            /*
             * comment
             */
            token2`);

        expect(t.all()).toEqual(['token1', 'token2']);
    });

    it('should skip lines', () => {
        const t = new Tokenizer('token1\ntoken2 token3\ntoken4');

        const a = t.nextToken();
        t.skipLine();
        const b = t.nextToken();
        t.skipLine();
        const c = t.nextToken();

        expect(a).toBe('token1');
        expect(b).toBe('token2');
        expect(c).toBe('token4');
    });

    it('should have correct line numbers', () => {
        const t = new Tokenizer(`
            token1
            token2 token3
            token4
        `);

        expect(t.getLineNo()).toBe(1);

        expect(t.nextToken()).toBe('token1');
        expect(t.getLineNo()).toBe(2);

        expect(t.nextToken()).toBe('token2');
        expect(t.getLineNo()).toBe(3);

        expect(t.nextToken()).toBe('token3');
        expect(t.getLineNo()).toBe(3);

        expect(t.nextToken()).toBe('token4');
        expect(t.getLineNo()).toBe(4);
        
        expect(t.nextToken()).toBeUndefined();
        expect(t.getLineNo()).toBe(5);
    });

    it('should handle different line endings', () => {
        const t = new Tokenizer('token1\ntoken2\r\ntoken3\rtoken4');

        expect(t.nextToken()).toBe('token1');
        expect(t.getLineNo()).toBe(1);

        expect(t.nextToken()).toBe('token2');
        expect(t.getLineNo()).toBe(2);

        expect(t.nextToken()).toBe('token3');
        expect(t.getLineNo()).toBe(3);

        expect(t.nextToken()).toBe('token4');
        expect(t.getLineNo()).toBe(4);
        
        expect(t.nextToken()).toBeUndefined();
        expect(t.getLineNo()).toBe(4);
    });
});