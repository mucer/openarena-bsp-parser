import { Vector } from "../models/vector";

// typedef struct {
// 	vec3_t		xyz;
// 	float		st[2];
// 	byte		modulate[4];
// } polyVert_t;

const OFFSET_POS = 0;
const OFFSET_ST = OFFSET_POS + 12;
const OFFSET_MODULATE = OFFSET_ST + 8;
const LENGTH = OFFSET_MODULATE + 4;

export class VertStruct {
    public static LENGTH = LENGTH;

    public offset = 0;

    constructor(private buffer: Buffer) {
    }

    public getPosition(): Vector {
        return {
            x: this.buffer.readFloatLE(this.offset + OFFSET_POS),
            y: this.buffer.readFloatLE(this.offset + OFFSET_POS + 4),
            z: this.buffer.readFloatLE(this.offset + OFFSET_POS + 8)
        }
    }
}