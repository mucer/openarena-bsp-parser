
import { Lump } from '../models/lump';
import { Surface } from '../models/surface';
import { SurfaceType } from '../models/surface-type';
import { Vector } from '../models/vector';
import { DrawVertStruct } from '../structs/draw-vert-struct';
import { SurfaceStruct } from '../structs/surface-struct';
import { Vert } from '../models/vert';

export function parseSurfaces(buffer: Buffer, surfaceLump: Lump, drawVertsLump: Lump, drawIndices: Lump): any[] {
    if (surfaceLump.length % SurfaceStruct.LENGTH) {
        throw new Error(`The surface lumps length must be a multiple of ${SurfaceStruct.LENGTH}, was ${surfaceLump.length}`);
    }
    if (drawVertsLump.length % DrawVertStruct.LENGTH) {
        throw new Error(`The draw verts lumps length must be a multiple of ${DrawVertStruct.LENGTH}, was ${drawVertsLump.length}`);
    }
    const numSurface = surfaceLump.length / SurfaceStruct.LENGTH;
    const surface = new SurfaceStruct(buffer);

    const allVerts: Vert[] = getVerts(buffer, drawVertsLump);
    const surfaces: Surface[] = [];
    let numMeshes = 0;
    let numTriSurfs = 0;
    let numFaces = 0;
    let numFlares = 0;

    for (let i = 0; i < numSurface; i += 1) {
        surface.offset = surfaceLump.offset + i * SurfaceStruct.LENGTH;
        const type = surface.getType();
        const verts = allVerts.slice(surface.getFirstVert(), surface.getFirstVert() + surface.getNumVerts());

        switch (type) {
            case SurfaceType.MESH:
                numMeshes += 1;
                break;
            case SurfaceType.TRIANGLE_SOUP:
                numTriSurfs += 1;
                break;
            case SurfaceType.FACE:
                numFaces += 1;
                break;
            case SurfaceType.FLARE:
                numFlares += 1;
                break;
            default:
                throw new Error(`invalid surface type '${surface.getType()}' for surface at position ${i}`);
        }

        surfaces[i] = {
            type,
            verts
        }
    }

    console.log(`parsed surfaces: total=${surfaces.length}, meshes=${numMeshes}, triSrufs=${numTriSurfs}, faces=${numFaces}, flares=${numFlares}`);

    return surfaces;
}

function getVerts(buffer: Buffer, drawVertLump: Lump): Vert[] {
    const vert = new DrawVertStruct(buffer);
    const numVerts = drawVertLump.length / DrawVertStruct.LENGTH;
    const verts: Vert[] = [];
    for (let i = 0; i < numVerts; i++) {
        vert.offset = drawVertLump.offset + i * DrawVertStruct.LENGTH;
        verts[i] = {
            position: vert.getPosition(),
            color: vert.getColor()
        };
    }
    return verts;
}