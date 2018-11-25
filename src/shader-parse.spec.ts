import { readFileSync, fstat, writeFile, writeFileSync } from "fs";
import { join } from "path";
import { parseShaderFile } from "./shader-parser";
import expect = require("expect");

describe('parseShaderFile', () => {
    it ('should parse sample file', () => {
        const content = readFileSync(join(__dirname, '../assets/all-shaders.txt'), { encoding: 'utf8' });
        const shaders = parseShaderFile(content);

        writeFileSync(`D:\\Work\\openarena-pk3-parser\\dist\\shaders.json`, JSON.stringify(shaders, undefined, 2));
        expect(shaders.length).toBe(4);


    });
});