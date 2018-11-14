"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// typedef struct {
// 	vec3_t		xyz;
// 	float		st[2];
// 	byte		modulate[4];
// } polyVert_t;
var OFFSET_POS = 0;
var OFFSET_ST = OFFSET_POS + 12;
var OFFSET_MODULATE = OFFSET_ST + 8;
var LENGTH = OFFSET_MODULATE + 4;
var VertStruct = /** @class */ (function () {
    function VertStruct(buffer) {
        this.buffer = buffer;
        this.offset = 0;
    }
    VertStruct.prototype.getPosition = function () {
        return {
            x: this.buffer.readFloatLE(this.offset + OFFSET_POS),
            y: this.buffer.readFloatLE(this.offset + OFFSET_POS + 4),
            z: this.buffer.readFloatLE(this.offset + OFFSET_POS + 8)
        };
    };
    VertStruct.LENGTH = LENGTH;
    return VertStruct;
}());
exports.VertStruct = VertStruct;
//# sourceMappingURL=vert-struct.js.map