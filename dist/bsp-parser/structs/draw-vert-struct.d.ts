/// <reference types="node" />
import { Rgba, Vector } from "../../models";
export declare class DrawVertStruct {
    private buffer;
    offset: number;
    static LENGTH: number;
    constructor(buffer: Buffer, offset?: number);
    getPosition(): Vector;
    getSt(): number[];
    getLightmap(): number[];
    getColor(): Rgba;
}
