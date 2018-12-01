import { Lump, Surface, SurfaceType, Vert } from '../models';
import { DrawVertStruct } from '../structs/draw-vert-struct';
import { SurfaceStruct } from '../structs/surface-struct';

export function parseSurfaces(buffer: Buffer, surfaceLump: Lump, drawVertsLump: Lump, drawIndexesLump: Lump): any[] {
    if (surfaceLump.length % SurfaceStruct.LENGTH) {
        throw new Error(`The surface lumps length must be a multiple of ${SurfaceStruct.LENGTH}, was ${surfaceLump.length}`);
    }
    if (drawVertsLump.length % DrawVertStruct.LENGTH) {
        throw new Error(`The draw verts lumps length must be a multiple of ${DrawVertStruct.LENGTH}, was ${drawVertsLump.length}`);
    }
    if (drawIndexesLump.length % 4) {
        throw new Error(`The draw indexes lumps length must be a multiple of 4, was ${drawIndexesLump.length}`);
    }
    const numSurface = surfaceLump.length / SurfaceStruct.LENGTH;
    const surfaceStruct = new SurfaceStruct(buffer);

    const allVerts: Vert[] = parseVerts(buffer, drawVertsLump);
    const allIndexes: number[] = parseIndexes(buffer, drawIndexesLump);
    const surfaces: Surface[] = [];
    let numMeshes = 0;
    let numTriSurfs = 0;
    let numFaces = 0;
    let numFlares = 0;

    for (let i = 0; i < numSurface; i += 1) {
        surfaceStruct.offset = surfaceLump.offset + i * SurfaceStruct.LENGTH;

        const numIndexes = surfaceStruct.getNumIndexes();
        if (numIndexes % 3) {
            throw new Error(`The face indexes must be a multiple of 3, was ${drawIndexesLump.length}`);
        }
        const type = surfaceStruct.getType();
        const verts = allVerts.slice(surfaceStruct.getFirstVert(), surfaceStruct.getFirstVert() + surfaceStruct.getNumVerts());
        const indexes = allIndexes.slice(surfaceStruct.getFirstIndex(), surfaceStruct.getFirstIndex() + numIndexes);

        const surface: Surface = surfaces[i] = {
            type,
            verts,
            shader: surfaceStruct.getShaderNum()
        };

        switch (type) {
            case SurfaceType.MESH:
                numMeshes += 1;
                break;
            case SurfaceType.TRIANGLE_SOUP:
                numTriSurfs += 1;
                break;
            case SurfaceType.FACE:
                surface.indexes = indexes;
                surface.normal = surfaceStruct.getLightmapVec(2);
                numFaces += 1;
                break;
            case SurfaceType.FLARE:
                numFlares += 1;
                break;
            default:
                throw new Error(`invalid surface type '${surfaceStruct.getType()}' for surface at position ${i}`);
        }
    }

    console.debug(`parsed surfaces: total=${surfaces.length}, meshes=${numMeshes}, `
        + `triSrufs=${numTriSurfs}, faces=${numFaces}, flares=${numFlares}`);

    return surfaces;
}

function parseVerts(buffer: Buffer, drawVertLump: Lump): Vert[] {
    const vert = new DrawVertStruct(buffer);
    const numVerts = drawVertLump.length / DrawVertStruct.LENGTH;
    const verts: Vert[] = [];
    for (let i = 0; i < numVerts; i++) {
        vert.offset = drawVertLump.offset + i * DrawVertStruct.LENGTH;
        verts[i] = {
            position: vert.getPosition(),
            st: vert.getSt()
            // color: vert.getColor()
        };
    }
    return verts;
}

function parseIndexes(buffer: Buffer, lump: Lump): number[] {
    const num = lump.length / 4;
    const indexes: number[] = [];
    for (let i = 0; i < num; i++) {
        indexes[i] = buffer.readInt32LE(lump.offset + i * 4);
    }
    return indexes;
}