
import { Dictionary } from "../models";
import { Pk3File } from "./pk3-file";

export class Pk3Collection {
    public pk3s: Dictionary<Pk3File> = {};

    public addPk3(pk3: Pk3File) {
        this.pk3s[pk3.getName()] = pk3;
    }

    public getMapPath(name: string, pkgName?: string): string | undefined {
        const result = this.find(pk3 => pk3.getMapPath(name), pkgName);
        return result && `${result.pk3.getPath()}::${result.value}`;
    }

    public getLevelshots(): string[] {
        const paths = this.collectPaths(pk3 => pk3.getLevelshots());
        return paths.map(p => `${p.pk3.getPath()}::${p.path}`);
    }

    public getLevelshotPath(name: string, pkgName?: string): string | undefined {
        const result = this.find(pk3 => pk3.getLevelshotPath(name), pkgName);
        return result && `${result.pk3.getPath()}::${result.value}`;
    }

    public collectPaths(cb: (pk3: Pk3File) => Dictionary<string>): { pk3: Pk3File, id: string, path: string}[] {
       const keys = Object.keys(this.pk3s).sort();

       const allPaths: Dictionary<{pk3: Pk3File, id:string, path: string}> = {};

       for (const key of keys) {
            const pk3 = this.pk3s[key];
            const paths: Dictionary<string> = cb(pk3);
            const ids = Object.keys(paths);
            for (let id of ids) {
                allPaths[id] = {
                    pk3,
                    id,
                    path: paths[id]
                };
            }
       }

      return Object.values(allPaths);
    }

    public find<T>(cb: (pk3: Pk3File) => T, pkgName?: string): { pk3: Pk3File, value: T } | undefined {
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