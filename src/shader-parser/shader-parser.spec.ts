import { readFileSync } from "fs";
import { join } from "path";
import { Shader } from "../models";
import { parseShaders } from "./shader-parser";
import expect = require("expect");

describe('parseShaders', () => {
    it ('should parse sample file', () => {
        const content: string = readFileSync(join(__dirname, '../../assets/test.shader'), { encoding: 'utf8' });
        const shaders: Shader[] = parseShaders(content);

        expect(shaders.length).toBe(5);
    });
});