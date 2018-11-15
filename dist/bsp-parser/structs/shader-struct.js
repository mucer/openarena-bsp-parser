"use strict";
// typedef struct {
// 	char		shader[64];
// 	int			surfaceFlags;
// 	int			contentFlags;
// } dshader_t;
Object.defineProperty(exports, "__esModule", { value: true });
const OFFSET_SHADER = 0;
const OFFSET_SURFACE_FLAGS = OFFSET_SHADER + 64;
const OFFSET_CONTENT_FLAGS = OFFSET_SURFACE_FLAGS + 4;
class ShaderStruct {
    constructor(buffer) {
        this.buffer = buffer;
        this.offset = 0;
    }
    getPath() {
        let path = '';
        for (let i = 0; i < 64; i++) {
            const c = this.buffer.readUInt8(this.offset + OFFSET_SHADER + i);
            if (c === 0) {
                break;
            }
            path += String.fromCharCode(c);
        }
        return path;
    }
    getSurfaceFlags() {
        return this.buffer.readInt32LE(this.offset + OFFSET_SURFACE_FLAGS);
    }
}
ShaderStruct.LENGTH = OFFSET_CONTENT_FLAGS + 4;
exports.ShaderStruct = ShaderStruct;
//# sourceMappingURL=shader-struct.js.map