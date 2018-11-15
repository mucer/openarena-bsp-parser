import { Dictionary, Pk3Entry } from "../models";
import { Pk3File } from "./pk3-file";

export class Pk3Collection {
    public pk3s: Dictionary<Pk3File> = {};

    public getFiles(): Pk3File[] {
        return Object.values(this.pk3s);
    }

    public addFile(pk3: Pk3File) {
        this.pk3s[pk3.getName()] = pk3;
    }

    public getMap(name: string, pkgName?: string): Pk3Entry | undefined {
        return this.findEntry(pk3 => pk3.getMapPath(name), pkgName);
    }

    public getLevelshots(): Pk3Entry[] {
        return this.collectPaths(pk3 => pk3.getLevelshots());
    }

    public getLevelshot(name: string, pkgName?: string): Pk3Entry | undefined {
        return this.findEntry(pk3 => pk3.getLevelshotPath(name), pkgName);
    }

    public getTexture(path: string): Pk3Entry | undefined {
        return this.findEntry(pk3 => pk3.getTexturePath(path));
    }

    private collectPaths(cb: (pk3: Pk3File) => Dictionary<string>): Pk3Entry[] {
        const keys = Object.keys(this.pk3s).sort();

        const allPaths: Dictionary<Pk3Entry> = {};

        for (const key of keys) {
            const pk3 = this.pk3s[key];
            const paths: Dictionary<string> = cb(pk3);
            const ids = Object.keys(paths);
            for (let id of ids) {
                allPaths[id] = {
                    pk3Name: pk3.getName(),
                    pk3Path: pk3.getPath(),
                    path: paths[id]
                };
            }
        }

        return Object.values(allPaths);
    }

    private findEntry(cb: (pk3: Pk3File) => string | undefined, pkgName?: string): Pk3Entry | undefined {
        const result = this.find(cb, pkgName);
        return result && {
            pk3Name: result.pk3.getName(),
            pk3Path: result.pk3.getPath(),
            path: result.value
        }
    }

    private find<T>(cb: (pk3: Pk3File) => T | undefined, pkgName?: string): { pk3: Pk3File, value: T } | undefined {
        if (pkgName) {
            const pk3 = this.pk3s[pkgName];
            const value = pk3 && cb(pk3);
            if (value) {
                return { pk3, value };
            }
        } else {
            const keys = Object.keys(this.pk3s).sort().reverse();
            for (const key of keys) {
                const pk3 = this.pk3s[key]
                const value = cb(pk3);
                if (value) {
                    return { pk3, value };
                }
            }
        }
    }
}