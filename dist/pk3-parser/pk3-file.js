"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
class Pk3File {
    constructor(path) {
        this.path = path;
        this.maps = {};
        this.textures = [];
        this.levelshots = {};
        this.name = path_1.basename(path);
    }
    getName() {
        return this.name;
    }
    getPath() {
        return this.path;
    }
    addMap(name, path) {
        this.maps[name] = path;
    }
    getMapPath(name) {
        return this.maps[name];
    }
    addLevelshot(name, path) {
        this.levelshots[name] = path;
    }
    getLevelshots() {
        return this.levelshots;
    }
    getLevelshotPath(name) {
        return this.levelshots[name];
    }
    addTexture(path) {
        if (!this.textures.includes(path)) {
            this.textures.push(path);
        }
    }
    getTexturePath(path) {
        const fn = path.includes('.')
            ? (t) => t === path
            : (t) => t.slice(0, -4) === path;
        return this.textures.find(fn);
    }
}
exports.Pk3File = Pk3File;
//# sourceMappingURL=pk3-file.js.map