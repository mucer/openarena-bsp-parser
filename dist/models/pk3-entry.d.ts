/// <reference types="node" />
export interface Pk3Entry {
    path: string;
    buffer: Buffer;
    wait: boolean;
    next(): void;
}
