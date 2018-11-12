import { parseEntitiesLump } from './lump-parser/entities-lump-parser';
import { parseSurfaces } from './lump-parser/surface-parser';
import { BspFile } from './models/bsp-file';
import { Lump } from './models/lump';
import { LumpType } from './models/lump-type';
import { HeaderStruct } from './structs/header-struct';

export function parseBspFile(buffer: Buffer): BspFile {
    const header = new HeaderStruct(buffer)

    // qfiles.h
    const entitiesLump: Lump = header.getLump(LumpType.ENTITIES);
    const surfaceLump: Lump = header.getLump(LumpType.SURFACES);
    const drawVertsLump: Lump = header.getLump(LumpType.DRAW_VERTS);
    const drawIndexesLump: Lump = header.getLump(LumpType.DRAW_INDEXES);

    const entities = parseEntitiesLump(buffer, entitiesLump);
    const surfaces = parseSurfaces(buffer, surfaceLump, drawVertsLump, drawIndexesLump);

    return {
        entities,
        surfaces
    }
}
