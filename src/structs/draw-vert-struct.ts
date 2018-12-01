import { Rgba, Vector } from "../models";

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

export class DrawVertStruct {
    public static LENGTH = VECT_LENGTH;

    constructor(private buffer: Buffer, public offset = 0) {
    }

    public getPosition(): Vector {
        return {
            x: this.buffer.readFloatLE(this.offset + OFFSET_POS),
            y: this.buffer.readFloatLE(this.offset + OFFSET_POS + 4),
            z: this.buffer.readFloatLE(this.offset + OFFSET_POS + 8)
        };
    }

    public getSt(): number[] {
        return [
            this.buffer.readFloatLE(this.offset + OFFSET_ST),
            this.buffer.readFloatLE(this.offset + OFFSET_ST + 4)
        ];
    }

    public getLightmap(): number[] {
        return [
            this.buffer.readFloatLE(this.offset + OFFSET_LIGHTMAP),
            this.buffer.readFloatLE(this.offset + OFFSET_LIGHTMAP + 4)
        ];
    }

    public getColor(): Rgba {
        return {
            r: this.buffer.readUInt8(this.offset + OFFSET_COLOR),
            g: this.buffer.readUInt8(this.offset + OFFSET_COLOR + 1),
            b: this.buffer.readUInt8(this.offset + OFFSET_COLOR + 2),
            a: this.buffer.readUInt8(this.offset + OFFSET_COLOR + 3)
        };
    }
}