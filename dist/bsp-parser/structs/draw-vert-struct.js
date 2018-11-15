"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// typedef struct {
// 	vec3_t		xyz;
// 	float		st[2];
// 	float		lightmap[2];
// 	vec3_t		normal;
// 	byte		color[4];
// } drawVert_t;
const OFFSET_POS = 0;
const OFFSET_ST = OFFSET_POS + 12;
const OFFSET_LIGHTMAP = OFFSET_ST + 8;
const OFFSET_NORMAL = OFFSET_LIGHTMAP + 8;
const OFFSET_COLOR = OFFSET_NORMAL + 12;
const VECT_LENGTH = OFFSET_COLOR + 4;
class DrawVertStruct {
    constructor(buffer, offset = 0) {
        this.buffer = buffer;
        this.offset = offset;
    }
    getPosition() {
        return {
            x: this.buffer.readFloatLE(this.offset + OFFSET_POS),
            y: this.buffer.readFloatLE(this.offset + OFFSET_POS + 4),
            z: this.buffer.readFloatLE(this.offset + OFFSET_POS + 8)
        };
    }
    getSt() {
        return [
            this.buffer.readFloatLE(this.offset + OFFSET_ST),
            this.buffer.readFloatLE(this.offset + OFFSET_ST + 4)
        ];
    }
    getLightmap() {
        return [
            this.buffer.readFloatLE(this.offset + OFFSET_LIGHTMAP),
            this.buffer.readFloatLE(this.offset + OFFSET_LIGHTMAP + 4)
        ];
    }
    getColor() {
        return {
            r: this.buffer.readUInt8(this.offset + OFFSET_COLOR),
            g: this.buffer.readUInt8(this.offset + OFFSET_COLOR + 1),
            b: this.buffer.readUInt8(this.offset + OFFSET_COLOR + 2),
            a: this.buffer.readUInt8(this.offset + OFFSET_COLOR + 3)
        };
    }
}
DrawVertStruct.LENGTH = VECT_LENGTH;
exports.DrawVertStruct = DrawVertStruct;
//# sourceMappingURL=draw-vert-struct.js.map