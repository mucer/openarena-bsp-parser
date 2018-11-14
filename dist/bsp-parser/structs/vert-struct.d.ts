/// <reference types="node" />
import { Vector } from "../../models";
export declare class VertStruct {
    private buffer;
    static LENGTH: number;
    offset: number;
    constructor(buffer: Buffer);
    getPosition(): Vector;
}
