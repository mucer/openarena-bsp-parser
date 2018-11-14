/// <reference types="node" />
import { Stream } from 'stream';
import { Pk3Collection } from './pk3-collection';
export declare class Pk3Parser {
    readDir(dir: string): Promise<Pk3Collection>;
    /**
     * The files will not be streamed in the same order than the input.
     *
     * @param files Files with should be stream in format "[abs path to pk3]::[path to file]"
     */
    stream(files: string[]): Stream;
    private parsePk3;
    private parsePk3Entry;
}
