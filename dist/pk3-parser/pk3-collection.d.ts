import { Dictionary, Pk3Entry } from "../models";
import { Pk3File } from "./pk3-file";
export declare class Pk3Collection {
    pk3s: Dictionary<Pk3File>;
    getFiles(): Pk3File[];
    addFile(pk3: Pk3File): void;
    getMap(name: string, pkgName?: string): Pk3Entry | undefined;
    getLevelshots(): Pk3Entry[];
    getLevelshot(name: string, pkgName?: string): Pk3Entry | undefined;
    getTexture(path: string): Pk3Entry | undefined;
    private collectPaths;
    private findEntry;
    private find;
}
