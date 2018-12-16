import { readFileSync } from "fs";
import { join } from "path";
import { parseShaderFile } from "./shader-parser";
import expect = require("expect");

describe('parseShaderFile', () => {
    it ('should parse sample file', () => {
        const content = readFileSync(join(__dirname, '../../assets/test.shader'), { encoding: 'utf8' });
        const shaders = parseShaderFile(content);

        expect(shaders.length).toBe(5);
    });
});