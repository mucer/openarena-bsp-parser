/// <reference types="node" />
export declare class ShaderStruct {
    private buffer;
    static LENGTH: number;
    offset: number;
    constructor(buffer: Buffer);
    getPath(): string;
    getSurfaceFlags(): number;
}
