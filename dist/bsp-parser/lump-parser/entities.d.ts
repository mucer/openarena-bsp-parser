/// <reference types="node" />
import { Entities, Lump } from '../../models';
export declare function parseEntitiesLump(buffer: Buffer, { offset, length }: Lump): Entities;
