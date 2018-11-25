export class Tokenizer {
    private index = 0;

    private line = 1;

    constructor(private text: string) {
    }

    public getLine(): number {
        return this.line
    }

    public nextToken(allowLineBreaks: boolean): string | undefined {
        // skip comments and whitespace
        while (true) {
            if (this.skipWhitespace() && !allowLineBreaks) {
                return '';
            }
            if (this.nextIs('//')) {
                this.index += 2;
                this.skipLine();
            } else if (this.nextIs('/*')) {
                this.index += 2;
                let str: string;
                while ((str = this.readUntil('/')) && !str.endsWith('*')) {
                }
            } else {
                break;
            }
        }
        if (this.index >= this.text.length) {
            return undefined;
        }

        let c: string = this.text[this.index];
        if (c === '"') {
            this.index += 1;
            return this.readUntil('"');
        }
        let token = '';
        while ((c = this.text[this.index++]) && c !== ' ' && c !== '\t' &&  c !== '\n' && c !== '\r') {
            token += c;
        }
        return token;
    }

    public all(): string[] {
        const tokens: string[] = [];
        let token: string | undefined; 
        while((token = this.nextToken(true))) {
            tokens.push(token);
        }
        return tokens;
    }

    public skipLine() {
        this.readUntil('\n');
    }

    public skipWhitespace(): boolean {
        let c: string;
        let hasNewLines = false;
        while ((c = this.text[this.index]) && (c === ' ' || c === '\t' || c === '\n' || c === '\r')) {
            hasNewLines = hasNewLines || c === '\n';
            if (c === '\n') {
                this.line += 1;
            }
            this.index += 1;
        }
        return hasNewLines;
    }

    public nextIs(str: string): boolean {
        for (let i = 0; i < str.length; i++) {
            if (this.text[this.index + i] !== str[i]) {
                return false;
            }
        }
        return true;
    }

    /**
     * The search string will not be included. The cursor will be behind the search string.
     */
    public readUntil(search: string): string {
        if (search.length !== 1) {
            throw new Error(`Search string must be single char, was '${search}'`);
        }
        let c: string | undefined;
        let res = '';
        while (c = this.text[this.index]) {
            if (c === '\n') {
                this.line += 1;
            }
            this.index += 1;
            if (c === search) {
                break;
            }
            res += c;
        }
        return res;
    }
}
