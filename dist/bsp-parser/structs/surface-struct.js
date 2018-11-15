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
const OFFSET_SHADER_NUM = 0;
const OFFSET_FOG_NUM = OFFSET_SHADER_NUM + 4;
const OFFSET_SURFACE_TYPE = OFFSET_FOG_NUM + 4;
const OFFSET_FIRST_VERT = OFFSET_SURFACE_TYPE + 4;
const OFFSET_NUM_VERTS = OFFSET_FIRST_VERT + 4;
const OFFSET_FIRST_INDEX = OFFSET_NUM_VERTS + 4;
const OFFSET_NUM_INDEXES = OFFSET_FIRST_INDEX + 4;
const OFFSET_LIGHTMAP_NUM = OFFSET_NUM_INDEXES + 4;
const OFFSET_LIGHTMAP_X = OFFSET_LIGHTMAP_NUM + 4;
const OFFSET_LIGHTMAP_Y = OFFSET_LIGHTMAP_X + 4;
const OFFSET_LIGHTMAP_WIDTH = OFFSET_LIGHTMAP_Y + 4;
const OFFSET_LIGHTMAP_HEIGHT = OFFSET_LIGHTMAP_WIDTH + 4;
const OFFSET_LIGHTMAP_ORIGIN = OFFSET_LIGHTMAP_HEIGHT + 4;
const OFFSET_LIGHTMAP_VECS = OFFSET_LIGHTMAP_ORIGIN + 12;
const OFFSET_PATCH_WIDTH = OFFSET_LIGHTMAP_VECS + 36;
const OFFSET_PATCH_HEIGHT = OFFSET_PATCH_WIDTH + 4;
const SURFACE_LENGTH = OFFSET_PATCH_HEIGHT + 4;
class SurfaceStruct {
    constructor(buffer) {
        this.buffer = buffer;
        this.offset = 0;
    }
    getShaderNum() {
        return this.buffer.readInt32LE(this.offset + OFFSET_SHADER_NUM);
    }
    getType() {
        return this.buffer.readInt32LE(this.offset + OFFSET_SURFACE_TYPE);
    }
    getFirstVert() {
        return this.buffer.readInt32LE(this.offset + OFFSET_FIRST_VERT);
    }
    getNumVerts() {
        return this.buffer.readInt32LE(this.offset + OFFSET_NUM_VERTS);
    }
    getPatchWidth() {
        return this.buffer.readUInt32LE(this.offset + OFFSET_PATCH_WIDTH);
    }
    getFirstIndex() {
        return this.buffer.readInt32LE(this.offset + OFFSET_FIRST_INDEX);
    }
    getNumIndexes() {
        return this.buffer.readInt32LE(this.offset + OFFSET_NUM_INDEXES);
    }
    getPatchHeight() {
        return this.buffer.readUInt32LE(this.offset + OFFSET_PATCH_HEIGHT);
    }
    getLightmapVec(index) {
        const offset = this.offset + index * 12;
        return {
            x: this.buffer.readFloatLE(offset + OFFSET_LIGHTMAP_VECS),
            y: this.buffer.readFloatLE(offset + OFFSET_LIGHTMAP_VECS + 4),
            z: this.buffer.readFloatLE(offset + OFFSET_LIGHTMAP_VECS + 8)
        };
    }
}
SurfaceStruct.LENGTH = SURFACE_LENGTH;
exports.SurfaceStruct = SurfaceStruct;
//# sourceMappingURL=surface-struct.js.map