"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs-extra");
var path = require("path");
var stream_1 = require("stream");
var unzipper = require("unzipper");
var pk3_collection_1 = require("./pk3-collection");
var pk3_file_1 = require("./pk3-file");
var PATTERN_LEVELSHOT = /levelshots\/(.*)\.(png|tga|jpg)/;
var PATTERN_TEXTURE = /textures\/.*\.(png|tga|jpg)/;
var PATTERN_MAP = /maps\/(.*)\.bsp/;
var Pk3Parser = /** @class */ (function () {
    function Pk3Parser() {
    }
    Pk3Parser.prototype.readDir = function (dir) {
        return __awaiter(this, void 0, void 0, function () {
            var files, pk3s, _i, files_1, file, absFile, pk3, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fs.readdir(dir)];
                    case 1:
                        files = _a.sent();
                        files.sort();
                        pk3s = new pk3_collection_1.Pk3Collection();
                        _i = 0, files_1 = files;
                        _a.label = 2;
                    case 2:
                        if (!(_i < files_1.length)) return [3 /*break*/, 7];
                        file = files_1[_i];
                        if (!file.endsWith('.pk3')) return [3 /*break*/, 6];
                        absFile = path.join(dir, file);
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, this.parsePk3(absFile)];
                    case 4:
                        pk3 = _a.sent();
                        pk3s.addPk3(pk3);
                        return [3 /*break*/, 6];
                    case 5:
                        e_1 = _a.sent();
                        console.log("Could not read package '" + absFile + "': " + (e_1 && e_1.message || e_1));
                        return [3 /*break*/, 6];
                    case 6:
                        _i++;
                        return [3 /*break*/, 2];
                    case 7: return [2 /*return*/, pk3s];
                }
            });
        });
    };
    /**
     * The files will not be streamed in the same order than the input.
     *
     * @param files Files with should be stream in format "[abs path to pk3]::[path to file]"
     */
    Pk3Parser.prototype.stream = function (files) {
        var stream = new stream_1.Stream();
        if (!files || !files.length) {
            stream.emit('end');
        }
        else {
            var pathsForFile_1 = {};
            files.forEach(function (f) {
                var _a = f.split('::'), file = _a[0], path = _a[1];
                if (!pathsForFile_1[file]) {
                    pathsForFile_1[file] = [];
                }
                pathsForFile_1[file].push(path);
            });
            var pk3Files_1 = Object.keys(pathsForFile_1);
            var streamNext_1 = function (index) {
                var file = pk3Files_1[index];
                var paths = pathsForFile_1[file];
                console.log("Reading PK3 file '" + file + "'");
                var wait = false;
                var entries = [];
                var readNextEntry = function () {
                    var entry = entries.shift();
                    if (entry) {
                        wait = true;
                        entry.buffer().then(function (buffer) {
                            var pk3Entry = {
                                path: entry.path,
                                buffer: buffer,
                                wait: false,
                                next: readNextEntry
                            };
                            stream.emit('entry', pk3Entry);
                            if (!pk3Entry.wait) {
                                wait = false;
                                readNextEntry();
                            }
                        });
                    }
                };
                fs.createReadStream(file)
                    .pipe(unzipper.Parse())
                    .on('entry', function (e) {
                    if (paths.includes(e.path)) {
                        entries.push(e);
                        if (!wait) {
                            readNextEntry();
                        }
                    }
                    else {
                        e.autodrain();
                    }
                })
                    .on('error', function (e) { return stream.emit('error', e); })
                    .on('end', function () {
                    // TODO wait until last entry was processed
                    if (index < pk3Files_1.length) {
                        streamNext_1(index + 1);
                    }
                    else {
                        stream.emit('end');
                    }
                });
            };
            streamNext_1(0);
        }
        return stream;
    };
    Pk3Parser.prototype.parsePk3 = function (file) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var pk3 = new pk3_file_1.Pk3File(file);
            fs.createReadStream(file)
                .pipe(unzipper.Parse())
                .on('entry', function (e) { return _this.parsePk3Entry(e, pk3).then(undefined, reject); })
                .promise().then(function () { return resolve(pk3); }, reject);
        });
    };
    Pk3Parser.prototype.parsePk3Entry = function (entry, pk3) {
        var fileName = entry.path;
        var matcher;
        if (matcher = PATTERN_MAP.exec(fileName)) {
            pk3.addMap(matcher[1], fileName);
        }
        else if (matcher = PATTERN_LEVELSHOT.exec(fileName)) {
            pk3.addLevelshot(matcher[1], fileName);
        }
        else if (PATTERN_TEXTURE.test(fileName)) {
            pk3.addTexture(fileName);
        }
        return entry.autodrain().promise();
    };
    return Pk3Parser;
}());
exports.Pk3Parser = Pk3Parser;
//# sourceMappingURL=pk3-parser.js.map