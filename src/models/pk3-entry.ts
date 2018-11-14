import { Stream } from "stream";

export interface Pk3Entry {
    path: string;
    buffer: Buffer;
    // if this flag is set to true, the stream will wait util next() is called
    wait: boolean;
    // unblock the stream
    next(): void;
}
