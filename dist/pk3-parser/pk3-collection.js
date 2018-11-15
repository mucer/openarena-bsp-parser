"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Pk3Collection {
    constructor() {
        this.pk3s = {};
    }
    getFiles() {
        return Object.values(this.pk3s);
    }
    addFile(pk3) {
        this.pk3s[pk3.getName()] = pk3;
    }
    getMap(name, pkgName) {
        return this.findEntry(pk3 => pk3.getMapPath(name), pkgName);
    }
    getLevelshots() {
        return this.collectPaths(pk3 => pk3.getLevelshots());
    }
    getLevelshot(name, pkgName) {
        return this.findEntry(pk3 => pk3.getLevelshotPath(name), pkgName);
    }
    getTexture(path) {
        return this.findEntry(pk3 => pk3.getTexturePath(path));
    }
    collectPaths(cb) {
        const keys = Object.keys(this.pk3s).sort();
        const allPaths = {};
        for (const key of keys) {
            const pk3 = this.pk3s[key];
            const paths = cb(pk3);
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
    findEntry(cb, pkgName) {
        const result = this.find(cb, pkgName);
        return result && {
            pk3Name: result.pk3.getName(),
            pk3Path: result.pk3.getPath(),
            path: result.value
        };
    }
    find(cb, pkgName) {
        if (pkgName) {
            const pk3 = this.pk3s[pkgName];
            const value = pk3 && cb(pk3);
            if (value) {
                return { pk3, value };
            }
        }
        else {
            const keys = Object.keys(this.pk3s).sort().reverse();
            for (const key of keys) {
                const pk3 = this.pk3s[key];
                const value = cb(pk3);
                if (value) {
                    return { pk3, value };
                }
            }
        }
    }
}
exports.Pk3Collection = Pk3Collection;
//# sourceMappingURL=pk3-collection.js.map