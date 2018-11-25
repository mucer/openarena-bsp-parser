import { Tokenizer } from "./tokenizer";
import expect = require("expect");

describe('Tokenizer', () => {
    it('should read single token', () => {
        const t = new Tokenizer('token');

        const first = t.nextToken(true);
        const second = t.nextToken(true);

        expect(first).toBe('token');
        expect(second).toBeUndefined();
    });

    it('should ignore line breaks', () => {
        const t = new Tokenizer('token1 token2 \n  \n  token3  ');
        expect(t.all()).toEqual(['token1', 'token2', 'token3']);
    });

    it('should stop on line breaks', () => {
        const t = new Tokenizer('  token1   \n  \n  token2  ');

        const tokens = [t.nextToken(false), t.nextToken(false), t.nextToken(false), t.nextToken(false)];

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
});