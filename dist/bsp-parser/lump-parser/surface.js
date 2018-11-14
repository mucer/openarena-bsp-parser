"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var models_1 = require("../../models");
var draw_vert_struct_1 = require("../structs/draw-vert-struct");
var surface_struct_1 = require("../structs/surface-struct");
function parseSurfaces(buffer, surfaceLump, drawVertsLump, drawIndexesLump, shaders) {
    if (surfaceLump.length % surface_struct_1.SurfaceStruct.LENGTH) {
        throw new Error("The surface lumps length must be a multiple of " + surface_struct_1.SurfaceStruct.LENGTH + ", was " + surfaceLump.length);
    }
    if (drawVertsLump.length % draw_vert_struct_1.DrawVertStruct.LENGTH) {
        throw new Error("The draw verts lumps length must be a multiple of " + draw_vert_struct_1.DrawVertStruct.LENGTH + ", was " + drawVertsLump.length);
    }
    if (drawIndexesLump.length % 4) {
        throw new Error("The draw indexes lumps length must be a multiple of 4, was " + drawIndexesLump.length);
    }
    var numSurface = surfaceLump.length / surface_struct_1.SurfaceStruct.LENGTH;
    var surfaceStruct = new surface_struct_1.SurfaceStruct(buffer);
    var allVerts = parseVerts(buffer, drawVertsLump);
    var allIndexes = parseIndexes(buffer, drawIndexesLump);
    var surfaces = [];
    var numMeshes = 0;
    var numTriSurfs = 0;
    var numFaces = 0;
    var numFlares = 0;
    for (var i = 0; i < numSurface; i += 1) {
        surfaceStruct.offset = surfaceLump.offset + i * surface_struct_1.SurfaceStruct.LENGTH;
        var numIndexes = surfaceStruct.getNumIndexes();
        if (numIndexes % 3) {
            throw new Error("The face indexes must be a multiple of 3, was " + drawIndexesLump.length);
        }
        var type = surfaceStruct.getType();
        var verts = allVerts.slice(surfaceStruct.getFirstVert(), surfaceStruct.getFirstVert() + surfaceStruct.getNumVerts());
        var indexes = allIndexes.slice(surfaceStruct.getFirstIndex(), surfaceStruct.getFirstIndex() + numIndexes);
        var shader = shaders[surfaceStruct.getShaderNum()];
        var surface = surfaces[i] = {
            type: type,
            verts: verts,
            indexes: indexes,
            shader: shader
        };
        switch (type) {
            case models_1.SurfaceType.MESH:
                numMeshes += 1;
                break;
            case models_1.SurfaceType.TRIANGLE_SOUP:
                numTriSurfs += 1;
                break;
            case models_1.SurfaceType.FACE:
                parseFace(surfaceStruct, surface);
                numFaces += 1;
                break;
            case models_1.SurfaceType.FLARE:
                numFlares += 1;
                break;
            default:
                throw new Error("invalid surface type '" + surfaceStruct.getType() + "' for surface at position " + i);
        }
    }
    console.log("parsed surfaces: total=" + surfaces.length + ", meshes=" + numMeshes + ", triSrufs=" + numTriSurfs + ", faces=" + numFaces + ", flares=" + numFlares);
    return surfaces;
}
exports.parseSurfaces = parseSurfaces;
function parseFace(surfaceStruct, surface) {
    // take the plane information from the lightmap vector
    surface.normal = surfaceStruct.getLightmapVec(2);
}
function parseVerts(buffer, drawVertLump) {
    var vert = new draw_vert_struct_1.DrawVertStruct(buffer);
    var numVerts = drawVertLump.length / draw_vert_struct_1.DrawVertStruct.LENGTH;
    var verts = [];
    for (var i = 0; i < numVerts; i++) {
        vert.offset = drawVertLump.offset + i * draw_vert_struct_1.DrawVertStruct.LENGTH;
        verts[i] = {
            position: vert.getPosition(),
        };
    }
    return verts;
}
function parseIndexes(buffer, lump) {
    var num = lump.length / 4;
    var indexes = [];
    for (var i = 0; i < num; i++) {
        indexes[i] = buffer.readInt32LE(lump.offset + i * 4);
    }
    return indexes;
}
//# sourceMappingURL=surface.js.map