"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var OFFSET_VERSION = 4;
var OFFSET_LUMPS = OFFSET_VERSION + 4;
var LUMP_LENGTH = 8;
var HeaderStruct = /** @class */ (function () {
    function HeaderStruct(buffer) {
        this.buffer = buffer;
    }
    HeaderStruct.prototype.getVersion = function () {
        return this.buffer.readUInt32LE(OFFSET_VERSION);
    };
    HeaderStruct.prototype.getLump = function (type) {
        var lumpOffset = OFFSET_LUMPS + type * LUMP_LENGTH;
        return {
            offset: this.buffer.readUInt32LE(lumpOffset),
            length: this.buffer.readUInt32LE(lumpOffset + 4)
        };
    };
    return HeaderStruct;
}());
exports.HeaderStruct = HeaderStruct;
//# sourceMappingURL=header-struct.js.map