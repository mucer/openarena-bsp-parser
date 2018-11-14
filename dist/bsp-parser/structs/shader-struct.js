"use strict";
// typedef struct {
// 	char		shader[64];
// 	int			surfaceFlags;
// 	int			contentFlags;
// } dshader_t;
Object.defineProperty(exports, "__esModule", { value: true });
var OFFSET_SHADER = 0;
var OFFSET_SURFACE_FLAGS = OFFSET_SHADER + 64;
var OFFSET_CONTENT_FLAGS = OFFSET_SURFACE_FLAGS + 4;
var ShaderStruct = /** @class */ (function () {
    function ShaderStruct(buffer) {
        this.buffer = buffer;
        this.offset = 0;
    }
    ShaderStruct.prototype.getPath = function () {
        var path = '';
        for (var i = 0; i < 64; i++) {
            var c = this.buffer.readUInt8(this.offset + OFFSET_SHADER + i);
            if (c === 0) {
                break;
            }
            path += String.fromCharCode(c);
        }
        return path;
    };
    ShaderStruct.prototype.getSurfaceFlags = function () {
        return this.buffer.readInt32LE(this.offset + OFFSET_SURFACE_FLAGS);
    };
    ShaderStruct.LENGTH = OFFSET_CONTENT_FLAGS + 4;
    return ShaderStruct;
}());
exports.ShaderStruct = ShaderStruct;
//# sourceMappingURL=shader-struct.js.map