"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs-extra");
const path = require("path");
const stream_1 = require("stream");
const unzipper = require("unzipper");
const pk3_collection_1 = require("./pk3-collection");
const pk3_file_1 = require("./pk3-file");
const PATTERN_LEVELSHOT = /levelshots\/(.*)\.(png|tga|jpg)/;
const PATTERN_TEXTURE = /textures\/.*\.(png|tga|jpg)/;
const PATTERN_MAP = /maps\/(.*)\.bsp/;
class Pk3Parser {
    readDir(dir) {
        return __awaiter(this, void 0, void 0, function* () {
            const files = yield fs.readdir(dir);
            files.sort();
            const pk3s = new pk3_collection_1.Pk3Collection();
            for (let file of files) {
                if (file.endsWith('.pk3')) {
                    const absFile = path.join(dir, file);
                    try {
                        const pk3 = yield this.parsePk3(absFile);
                        pk3s.addFile(pk3);
                    }
                    catch (e) {
                        console.log(`Could not read package '${absFile}': ${e && e.message || e}`);
                    }
                }
            }
            return pk3s;
        });
    }
    loadEntry(entry) {
        return new Promise((resolve, reject) => {
            fs.createReadStream(entry.pk3Path)
                .pipe(unzipper.Parse())
                .on('entry', (e) => {
                if (e.path === entry.path) {
                    e.buffer().then(resolve, reject);
                }
                else {
                    e.autodrain();
                }
            })
                .on('error', reject);
        });
    }
    /**
     * The files will not be streamed in the same order than the input.
     */
    streamEntries(entries) {
        const stream = new stream_1.Stream();
        if (!entries || !entries.length) {
            stream.emit('end');
        }
        else {
            const pathsForFile = {};
            entries.forEach(e => {
                if (!pathsForFile[e.pk3Path]) {
                    pathsForFile[e.pk3Path] = [];
                }
                pathsForFile[e.pk3Path].push(e.path);
            });
            const pk3Files = Object.keys(pathsForFile);
            const streamNext = (index) => {
                const file = pk3Files[index];
                const paths = pathsForFile[file];
                console.log(`Reading PK3 file '${file}'`);
                let wait = false;
                const entries = [];
                const readNextEntry = () => {
                    const entry = entries.shift();
                    if (entry) {
                        wait = true;
                        entry.buffer().then(buffer => {
                            const pk3Entry = {
                                path: entry.path,
                                buffer,
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
                    .on('entry', (e) => {
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
                    .on('error', e => stream.emit('error', e))
                    .on('end', () => {
                    // TODO wait until last entry was processed
                    if (index < pk3Files.length) {
                        streamNext(index + 1);
                    }
                    else {
                        stream.emit('end');
                    }
                });
            };
            streamNext(0);
        }
        return stream;
    }
    parsePk3(file) {
        return new Promise((resolve, reject) => {
            const pk3 = new pk3_file_1.Pk3File(file);
            fs.createReadStream(file)
                .pipe(unzipper.Parse())
                .on('entry', e => this.parsePk3Entry(e, pk3).then(undefined, reject))
                .promise().then(() => resolve(pk3), reject);
        });
    }
    parsePk3Entry(entry, pk3) {
        var fileName = entry.path;
        let matcher;
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
    }
}
exports.Pk3Parser = Pk3Parser;
//# sourceMappingURL=pk3-parser.js.map