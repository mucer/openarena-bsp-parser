const Struct = require('struct');

export interface Header {
    setBuffer: (buffer: Buffer) => void;
    length: () => number;
    fields: {
        magic: number;
        version: number;
        lump: {
            offset: number;
            length: number;
        }[]
    };
}

export function newHeader(buffer?: Buffer): Header {
    const header: Header = Struct()
        .chars('magic', 4)
        .word32Ule('version')
        .array('lump', 19, Struct()
            .word32Ule('offset')
            .word32Ule('length'));
    if (buffer) {
        header.setBuffer(buffer);
    }
    return header;
} 