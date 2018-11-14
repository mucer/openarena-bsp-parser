/// <reference types="node" />
import { Lump, Shader } from '../../models';
export declare function parseSurfaces(buffer: Buffer, surfaceLump: Lump, drawVertsLump: Lump, drawIndexesLump: Lump, shaders: Shader[]): any[];
