"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = require("path");
var Pk3File = /** @class */ (function () {
    function Pk3File(path) {
        this.path = path;
        this.maps = {};
        this.textures = [];
        this.levelshots = {};
        this.name = path_1.basename(path);
    }
    Pk3File.prototype.getName = function () {
        return this.name;
    };
    Pk3File.prototype.getPath = function () {
        return this.path;
    };
    Pk3File.prototype.addMap = function (name, path) {
        this.maps[name] = path;
    };
    Pk3File.prototype.getMapPath = function (name) {
        return this.maps[name];
    };
    Pk3File.prototype.addLevelshot = function (name, path) {
        this.levelshots[name] = path;
    };
    Pk3File.prototype.getLevelshots = function () {
        return this.levelshots;
    };
    Pk3File.prototype.getLevelshotPath = function (name) {
        return this.levelshots[name];
    };
    Pk3File.prototype.addTexture = function (path) {
        if (!this.textures.includes(path)) {
            this.textures.push(path);
        }
    };
    return Pk3File;
}());
exports.Pk3File = Pk3File;
//# sourceMappingURL=pk3-file.js.map