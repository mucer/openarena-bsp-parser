import { parseEntitiesLump } from './lump-parser/entities';
import { parseSurfaces } from './lump-parser/surface';
import { BspFile } from './models/bsp-file';
import { Lump } from './models/lump';
import { LumpType } from './models/lump-type';
import { HeaderStruct } from './structs/header-struct';
import { parseShaders } from './lump-parser/shaders';

export function parseBspFile(buffer: Buffer): BspFile {
    const header = new HeaderStruct(buffer);

    // qfiles.h
    const entitiesLump: Lump = header.getLump(LumpType.ENTITIES);
    const shadersLump: Lump = header.getLump(LumpType.SHADERS);
    const surfaceLump: Lump = header.getLump(LumpType.SURFACES);
    const drawVertsLump: Lump = header.getLump(LumpType.DRAW_VERTS);
    const drawIndexesLump: Lump = header.getLump(LumpType.DRAW_INDEXES);

    const entities = parseEntitiesLump(buffer, entitiesLump);
    const shaders = parseShaders(buffer, shadersLump);
    const surfaces = parseSurfaces(buffer, surfaceLump, drawVertsLump, drawIndexesLump, shaders);

    return {
        entities,
        surfaces
    }
}
