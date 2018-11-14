"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Pk3Collection = /** @class */ (function () {
    function Pk3Collection() {
        this.pk3s = {};
    }
    Pk3Collection.prototype.addPk3 = function (pk3) {
        this.pk3s[pk3.getName()] = pk3;
    };
    Pk3Collection.prototype.getMapPath = function (name, pkgName) {
        var result = this.find(function (pk3) { return pk3.getMapPath(name); }, pkgName);
        return result && result.pk3.getPath() + "::" + result.value;
    };
    Pk3Collection.prototype.getLevelshots = function () {
        var paths = this.collectPaths(function (pk3) { return pk3.getLevelshots(); });
        return paths.map(function (p) { return p.pk3.getPath() + "::" + p.path; });
    };
    Pk3Collection.prototype.getLevelshotPath = function (name, pkgName) {
        var result = this.find(function (pk3) { return pk3.getLevelshotPath(name); }, pkgName);
        return result && result.pk3.getPath() + "::" + result.value;
    };
    Pk3Collection.prototype.collectPaths = function (cb) {
        var keys = Object.keys(this.pk3s).sort();
        var allPaths = {};
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var key = keys_1[_i];
            var pk3 = this.pk3s[key];
            var paths = cb(pk3);
            var ids = Object.keys(paths);
            for (var _a = 0, ids_1 = ids; _a < ids_1.length; _a++) {
                var id = ids_1[_a];
                allPaths[id] = {
                    pk3: pk3,
                    id: id,
                    path: paths[id]
                };
            }
        }
        return Object.values(allPaths);
    };
    Pk3Collection.prototype.find = function (cb, pkgName) {
        if (pkgName) {
            var pk3 = this.pk3s[pkgName];
            var value = pk3 && cb(pk3);
            if (value) {
                return { pk3: pk3, value: value };
            }
        }
        else {
            var keys = Object.keys(this.pk3s).sort().reverse();
            for (var _i = 0, keys_2 = keys; _i < keys_2.length; _i++) {
                var key = keys_2[_i];
                var pk3 = this.pk3s[key];
                var value = cb(pk3);
                if (value) {
                    return { pk3: pk3, value: value };
                }
            }
        }
    };
    return Pk3Collection;
}());
exports.Pk3Collection = Pk3Collection;
//# sourceMappingURL=pk3-collection.js.map