import { BspFile, Lump, LumpType } from '../models';
import { parseEntitiesLump } from './lump-parser/entities';
import { parseShaders } from './lump-parser/shaders';
import { parseSurfaces } from './lump-parser/surface';
import { HeaderStruct } from './structs/header-struct';

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
    const surfaces = parseSurfaces(buffer, surfaceLump, drawVertsLump, drawIndexesLump);

    return {
        entities,
        shaders,
        surfaces
    }
}
