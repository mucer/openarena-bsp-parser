/// <reference types="node" />
import { SurfaceType, Vector } from "../../models";
export declare class SurfaceStruct {
    private buffer;
    static LENGTH: number;
    offset: number;
    constructor(buffer: Buffer);
    getShaderNum(): number;
    getType(): SurfaceType;
    getFirstVert(): number;
    getNumVerts(): number;
    getPatchWidth(): number;
    getFirstIndex(): number;
    getNumIndexes(): number;
    getPatchHeight(): number;
    getLightmapVec(index: number): Vector;
}
