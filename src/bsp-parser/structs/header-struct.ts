import { Lump } from "../models/lump";
import { LumpType } from "../models/lump-type";

const OFFSET_VERSION = 4;
const OFFSET_LUMPS = OFFSET_VERSION + 4;
const LUMP_LENGTH = 8;

export class HeaderStruct {
    constructor(private buffer: Buffer) {
    }

    public getVersion(): number {
        return this.buffer.readUInt32LE(OFFSET_VERSION);
    }

    public getLump(type: LumpType): Lump {
        const lumpOffset = OFFSET_LUMPS + type * LUMP_LENGTH;
        return {
            offset: this.buffer.readUInt32LE(lumpOffset),
            length: this.buffer.readUInt32LE(lumpOffset + 4)
        };
    }
}