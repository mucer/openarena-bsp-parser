"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const OFFSET_VERSION = 4;
const OFFSET_LUMPS = OFFSET_VERSION + 4;
const LUMP_LENGTH = 8;
class HeaderStruct {
    constructor(buffer) {
        this.buffer = buffer;
    }
    getVersion() {
        return this.buffer.readUInt32LE(OFFSET_VERSION);
    }
    getLump(type) {
        const lumpOffset = OFFSET_LUMPS + type * LUMP_LENGTH;
        return {
            offset: this.buffer.readUInt32LE(lumpOffset),
            length: this.buffer.readUInt32LE(lumpOffset + 4)
        };
    }
}
exports.HeaderStruct = HeaderStruct;
//# sourceMappingURL=header-struct.js.map