import { Dictionary } from "../models";
import { Pk3File } from "./pk3-file";
export declare class Pk3Collection {
    pk3s: Dictionary<Pk3File>;
    addPk3(pk3: Pk3File): void;
    getMapPath(name: string, pkgName?: string): string | undefined;
    getLevelshots(): string[];
    getLevelshotPath(name: string, pkgName?: string): string | undefined;
    collectPaths(cb: (pk3: Pk3File) => Dictionary<string>): {
        pk3: Pk3File;
        id: string;
        path: string;
    }[];
    find<T>(cb: (pk3: Pk3File) => T, pkgName?: string): {
        pk3: Pk3File;
        value: T;
    } | undefined;
}
