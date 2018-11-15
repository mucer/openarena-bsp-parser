"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../../models");
const draw_vert_struct_1 = require("../structs/draw-vert-struct");
const surface_struct_1 = require("../structs/surface-struct");
function parseSurfaces(buffer, surfaceLump, drawVertsLump, drawIndexesLump) {
    if (surfaceLump.length % surface_struct_1.SurfaceStruct.LENGTH) {
        throw new Error(`The surface lumps length must be a multiple of ${surface_struct_1.SurfaceStruct.LENGTH}, was ${surfaceLump.length}`);
    }
    if (drawVertsLump.length % draw_vert_struct_1.DrawVertStruct.LENGTH) {
        throw new Error(`The draw verts lumps length must be a multiple of ${draw_vert_struct_1.DrawVertStruct.LENGTH}, was ${drawVertsLump.length}`);
    }
    if (drawIndexesLump.length % 4) {
        throw new Error(`The draw indexes lumps length must be a multiple of 4, was ${drawIndexesLump.length}`);
    }
    const numSurface = surfaceLump.length / surface_struct_1.SurfaceStruct.LENGTH;
    const surfaceStruct = new surface_struct_1.SurfaceStruct(buffer);
    const allVerts = parseVerts(buffer, drawVertsLump);
    const allIndexes = parseIndexes(buffer, drawIndexesLump);
    const surfaces = [];
    let numMeshes = 0;
    let numTriSurfs = 0;
    let numFaces = 0;
    let numFlares = 0;
    for (let i = 0; i < numSurface; i += 1) {
        surfaceStruct.offset = surfaceLump.offset + i * surface_struct_1.SurfaceStruct.LENGTH;
        const numIndexes = surfaceStruct.getNumIndexes();
        if (numIndexes % 3) {
            throw new Error(`The face indexes must be a multiple of 3, was ${drawIndexesLump.length}`);
        }
        const type = surfaceStruct.getType();
        const verts = allVerts.slice(surfaceStruct.getFirstVert(), surfaceStruct.getFirstVert() + surfaceStruct.getNumVerts());
        const indexes = allIndexes.slice(surfaceStruct.getFirstIndex(), surfaceStruct.getFirstIndex() + numIndexes);
        const surface = surfaces[i] = {
            type,
            verts,
            shader: surfaceStruct.getShaderNum()
        };
        switch (type) {
            case models_1.SurfaceType.MESH:
                numMeshes += 1;
                break;
            case models_1.SurfaceType.TRIANGLE_SOUP:
                numTriSurfs += 1;
                break;
            case models_1.SurfaceType.FACE:
                surface.indexes = indexes;
                surface.normal = surfaceStruct.getLightmapVec(2);
                numFaces += 1;
                break;
            case models_1.SurfaceType.FLARE:
                numFlares += 1;
                break;
            default:
                throw new Error(`invalid surface type '${surfaceStruct.getType()}' for surface at position ${i}`);
        }
    }
    console.log(`parsed surfaces: total=${surfaces.length}, meshes=${numMeshes}, triSrufs=${numTriSurfs}, faces=${numFaces}, flares=${numFlares}`);
    return surfaces;
}
exports.parseSurfaces = parseSurfaces;
function parseVerts(buffer, drawVertLump) {
    const vert = new draw_vert_struct_1.DrawVertStruct(buffer);
    const numVerts = drawVertLump.length / draw_vert_struct_1.DrawVertStruct.LENGTH;
    const verts = [];
    for (let i = 0; i < numVerts; i++) {
        vert.offset = drawVertLump.offset + i * draw_vert_struct_1.DrawVertStruct.LENGTH;
        verts[i] = {
            position: vert.getPosition(),
            st: vert.getSt()
            // color: vert.getColor()
        };
    }
    return verts;
}
function parseIndexes(buffer, lump) {
    const num = lump.length / 4;
    const indexes = [];
    for (let i = 0; i < num; i++) {
        indexes[i] = buffer.readInt32LE(lump.offset + i * 4);
    }
    return indexes;
}
//# sourceMappingURL=surface.js.map