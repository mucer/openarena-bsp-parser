"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// typedef struct {
// 	int			shaderNum;
// 	int			fogNum;
// 	int			surfaceType;
// 	int			firstVert;
// 	int			numVerts;
// 	int			firstIndex;
// 	int			numIndexes;
// 	int			lightmapNum;
// 	int			lightmapX, lightmapY;
// 	int			lightmapWidth, lightmapHeight;
// 	vec3_t		lightmapOrigin;
// 	vec3_t		lightmapVecs[3];	// for patches, [0] and [1] are lodbounds
// 	int			patchWidth;
// 	int			patchHeight;
// } dsurface_t;
var OFFSET_SHADER_NUM = 0;
var OFFSET_FOG_NUM = OFFSET_SHADER_NUM + 4;
var OFFSET_SURFACE_TYPE = OFFSET_FOG_NUM + 4;
var OFFSET_FIRST_VERT = OFFSET_SURFACE_TYPE + 4;
var OFFSET_NUM_VERTS = OFFSET_FIRST_VERT + 4;
var OFFSET_FIRST_INDEX = OFFSET_NUM_VERTS + 4;
var OFFSET_NUM_INDEXES = OFFSET_FIRST_INDEX + 4;
var OFFSET_LIGHTMAP_NUM = OFFSET_NUM_INDEXES + 4;
var OFFSET_LIGHTMAP_X = OFFSET_LIGHTMAP_NUM + 4;
var OFFSET_LIGHTMAP_Y = OFFSET_LIGHTMAP_X + 4;
var OFFSET_LIGHTMAP_WIDTH = OFFSET_LIGHTMAP_Y + 4;
var OFFSET_LIGHTMAP_HEIGHT = OFFSET_LIGHTMAP_WIDTH + 4;
var OFFSET_LIGHTMAP_ORIGIN = OFFSET_LIGHTMAP_HEIGHT + 4;
var OFFSET_LIGHTMAP_VECS = OFFSET_LIGHTMAP_ORIGIN + 12;
var OFFSET_PATCH_WIDTH = OFFSET_LIGHTMAP_VECS + 36;
var OFFSET_PATCH_HEIGHT = OFFSET_PATCH_WIDTH + 4;
var SURFACE_LENGTH = OFFSET_PATCH_HEIGHT + 4;
var SurfaceStruct = /** @class */ (function () {
    function SurfaceStruct(buffer) {
        this.buffer = buffer;
        this.offset = 0;
    }
    SurfaceStruct.prototype.getShaderNum = function () {
        return this.buffer.readInt32LE(this.offset + OFFSET_SHADER_NUM);
    };
    SurfaceStruct.prototype.getType = function () {
        return this.buffer.readInt32LE(this.offset + OFFSET_SURFACE_TYPE);
    };
    SurfaceStruct.prototype.getFirstVert = function () {
        return this.buffer.readInt32LE(this.offset + OFFSET_FIRST_VERT);
    };
    SurfaceStruct.prototype.getNumVerts = function () {
        return this.buffer.readInt32LE(this.offset + OFFSET_NUM_VERTS);
    };
    SurfaceStruct.prototype.getPatchWidth = function () {
        return this.buffer.readUInt32LE(this.offset + OFFSET_PATCH_WIDTH);
    };
    SurfaceStruct.prototype.getFirstIndex = function () {
        return this.buffer.readInt32LE(this.offset + OFFSET_FIRST_INDEX);
    };
    SurfaceStruct.prototype.getNumIndexes = function () {
        return this.buffer.readInt32LE(this.offset + OFFSET_NUM_INDEXES);
    };
    SurfaceStruct.prototype.getPatchHeight = function () {
        return this.buffer.readUInt32LE(this.offset + OFFSET_PATCH_HEIGHT);
    };
    SurfaceStruct.prototype.getLightmapVec = function (index) {
        var offset = this.offset + index * 12;
        return {
            x: this.buffer.readFloatLE(offset + OFFSET_LIGHTMAP_VECS),
            y: this.buffer.readFloatLE(offset + OFFSET_LIGHTMAP_VECS + 4),
            z: this.buffer.readFloatLE(offset + OFFSET_LIGHTMAP_VECS + 8)
        };
    };
    SurfaceStruct.LENGTH = SURFACE_LENGTH;
    return SurfaceStruct;
}());
exports.SurfaceStruct = SurfaceStruct;
//# sourceMappingURL=surface-struct.js.map