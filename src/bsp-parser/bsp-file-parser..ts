import { BspFile } from './models/bsp-file';
import { newHeader } from './models/header';
import { parseEntitiesLump } from './entities-lump-parser';


export function parseBspFile(buffer: Buffer): BspFile {
    const header = newHeader(buffer)
    
    // lump 0 = entities string
    const length = header.fields.lump[0].length;
    const offset = header.fields.lump[0].offset;
    const entities = parseEntitiesLump(buffer, offset, length);

    return {
        entities
    }
}
