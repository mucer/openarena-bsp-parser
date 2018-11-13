// typedef struct {
// 	char		shader[64];
// 	int			surfaceFlags;
// 	int			contentFlags;
// } dshader_t;

const OFFSET_SHADER = 0;
const OFFSET_SURFACE_FLAGS = OFFSET_SHADER + 64;
const OFFSET_CONTENT_FLAGS = OFFSET_SURFACE_FLAGS + 4;

export class ShaderStruct {
    public static LENGTH = OFFSET_CONTENT_FLAGS + 4;

    public offset = 0;

    constructor(private buffer: Buffer) {
    }

    public getPath(): string {
        let path = '';
        for (let i = 0; i < 64; i++) {
            const c = this.buffer.readUInt8(this.offset + OFFSET_SHADER + i);
            if (c === 0) {
                break;
            }
            path += String.fromCharCode(c);
        }
        return path;
    }

    public getSurfaceFlags(): number {
        return this.buffer.readInt32LE(this.offset + OFFSET_SURFACE_FLAGS);
    }
}