/// <reference types="node" />
import { Stream } from 'stream';
import { Pk3Entry } from '../models';
import { Pk3Collection } from './pk3-collection';
export declare class Pk3Parser {
    readDir(dir: string): Promise<Pk3Collection>;
    loadEntry(entry: Pk3Entry): Promise<Buffer>;
    /**
     * The files will not be streamed in the same order than the input.
     */
    streamEntries(entries: Pk3Entry[]): Stream;
    private parsePk3;
    private parsePk3Entry;
}
export interface Pk3StreamEntry {
    path: string;
    buffer: Buffer;
    wait: boolean;
    next(): void;
}
