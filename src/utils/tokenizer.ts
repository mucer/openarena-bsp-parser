
export class Tokenizer {
    private index = 0;

    private lineNo = 1;

    constructor(private text: string) {
    }

    /**
     * @returns the line number where the cursor is currently standing
     */
    public getLineNo(): number {
        return this.lineNo;
    }

    public nextToken(stopOnLineBreak?: boolean): string | undefined {
        // skip comments and whitespace
        while (true) {
            if (this.skipWhitespace() && stopOnLineBreak) {
                return '';
            }
            if (this.nextIs('//')) {
                this.index += 2;
                this.skipLine();
            } else if (this.nextIs('/*')) {
                this.index += 2;
                this.readUntil('*/');
            } else {
                break;
            }
        }

        if (this.index >= this.text.length) {
            return undefined;
        }

        let char: string = this.text[this.index];
        if (char === '"') {
            this.index += 1;
            return this.readUntil('"');
        }
        let token = '';
        while ((char = this.text[this.index]) && char !== ' ' && char !== '\t' && char !== '\n' && char !== '\r') {
            token += char;
            this.index += 1;
        }

        return token;
    }

    public all(): string[] {
        const tokens: string[] = [];
        let token: string | undefined;
        while ((token = this.nextToken(false))) {
            tokens.push(token);
        }
        return tokens;
    }

    /**
     * Skips all chars until a new line was found
     */
    public skipLine(): string {
        let str = '';
        while (this.text.length > this.index) {
            const char = this.text[this.index++];
            if (char === '\r') {
                this.lineNo += 1;
                if (this.text[this.index] === '\n') {
                    this.index += 1;
                }
                break;
            } else if (char === '\n') {
                this.lineNo += 1;
                break;
            }
            str += char;
        }
        return str;
    }

    public skipWhitespace(): boolean {
        let hasNewLines = false;
        while (this.text.length > this.index) {
            const char = this.text[this.index];
            if (char === '\n' || char === '\r') {
                this.skipLine();
                hasNewLines = true;
            } else if (char === ' ' || char === '\t') {
                this.index += 1;
            } else {
                break;
            }
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
        let res: string = '';
        while (this.text.length > this.index) {
            const char = this.text[this.index];
            if (this.nextIs(search)) {
                res += search;
                this.index += search.length;
                break;
            }

            if (char === '\n' || char === '\r') {
                this.skipLine();
                res += '\n';
            } else {
                res += char;
                this.index += 1;
            }
        }
        return res;
    }
}
