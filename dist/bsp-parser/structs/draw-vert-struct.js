"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// typedef struct {
// 	vec3_t		xyz;
// 	float		st[2];
// 	float		lightmap[2];
// 	vec3_t		normal;
// 	byte		color[4];
// } drawVert_t;
var OFFSET_POS = 0;
var OFFSET_ST = OFFSET_POS + 12;
var OFFSET_LIGHTMAP = OFFSET_ST + 8;
var OFFSET_NORMAL = OFFSET_LIGHTMAP + 8;
var OFFSET_COLOR = OFFSET_NORMAL + 12;
var VECT_LENGTH = OFFSET_COLOR + 4;
var DrawVertStruct = /** @class */ (function () {
    function DrawVertStruct(buffer, offset) {
        if (offset === void 0) { offset = 0; }
        this.buffer = buffer;
        this.offset = offset;
    }
    DrawVertStruct.prototype.getPosition = function () {
        return {
            x: this.buffer.readFloatLE(this.offset + OFFSET_POS),
            y: this.buffer.readFloatLE(this.offset + OFFSET_POS + 4),
            z: this.buffer.readFloatLE(this.offset + OFFSET_POS + 8)
        };
    };
    DrawVertStruct.prototype.getSt = function () {
        return [
            this.buffer.readFloatLE(this.offset + OFFSET_ST),
            this.buffer.readFloatLE(this.offset + OFFSET_ST + 4)
        ];
    };
    DrawVertStruct.prototype.getLightmap = function () {
        return [
            this.buffer.readFloatLE(this.offset + OFFSET_LIGHTMAP),
            this.buffer.readFloatLE(this.offset + OFFSET_LIGHTMAP + 4)
        ];
    };
    DrawVertStruct.prototype.getColor = function () {
        return {
            r: this.buffer.readUInt8(this.offset + OFFSET_COLOR),
            g: this.buffer.readUInt8(this.offset + OFFSET_COLOR + 1),
            b: this.buffer.readUInt8(this.offset + OFFSET_COLOR + 2),
            a: this.buffer.readUInt8(this.offset + OFFSET_COLOR + 3)
        };
    };
    DrawVertStruct.LENGTH = VECT_LENGTH;
    return DrawVertStruct;
}());
exports.DrawVertStruct = DrawVertStruct;
//# sourceMappingURL=draw-vert-struct.js.map