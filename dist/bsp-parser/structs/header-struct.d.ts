/// <reference types="node" />
import { Lump, LumpType } from "../../models";
export declare class HeaderStruct {
    private buffer;
    constructor(buffer: Buffer);
    getVersion(): number;
    getLump(type: LumpType): Lump;
}
