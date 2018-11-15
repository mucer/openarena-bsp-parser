import * as fs from 'fs-extra';
import * as path from 'path';
import { Stream } from 'stream';
import * as unzipper from 'unzipper';
import { Dictionary, Pk3Entry } from '../models';
import { Pk3Collection } from './pk3-collection';
import { Pk3File } from './pk3-file';

const PATTERN_LEVELSHOT = /levelshots\/(.*)\.(png|tga|jpg)/
const PATTERN_TEXTURE = /textures\/.*\.(png|tga|jpg)/
const PATTERN_MAP = /maps\/(.*)\.bsp/

export class Pk3Parser {

    public async readDir(dir: string): Promise<Pk3Collection> {
        const files: string[] = await fs.readdir(dir);
        files.sort();

        const pk3s = new Pk3Collection();

        for (let file of files) {
            if (file.endsWith('.pk3')) {
                const absFile = path.join(dir, file);
                try {
                    const pk3 = await this.parsePk3(absFile);
                    pk3s.addFile(pk3);
                } catch (e) {
                    console.info(`Could not read package '${absFile}': ${e && e.message || e}`);
                }
            }
        }
        return pk3s;
    }

    public loadEntry(entry: Pk3Entry): Promise<Buffer> {
        return new Promise((resolve, reject) => {
            fs.createReadStream(entry.pk3Path)
                .pipe(unzipper.Parse())
                .on('entry', (e: unzipper.Entry) => {
                    if (e.path === entry.path) {
                        e.buffer().then(resolve, reject);
                    } else {
                        e.autodrain();
                    }
                })
                .on('error', reject);
        });
    }

    /**
     * The files will not be streamed in the same order than the input.
     */
    public streamEntries(entries: Pk3Entry[]): Stream {
        const stream: Stream = new Stream();

        if (!entries || !entries.length) {
            stream.emit('end');
        } else {
            const pathsForFile: Dictionary<string[]> = {};
            entries.forEach(e => {
                if (!pathsForFile[e.pk3Path]) {
                    pathsForFile[e.pk3Path] = [];
                }
                pathsForFile[e.pk3Path].push(e.path);
            });
            const pk3Files = Object.keys(pathsForFile);

            const streamNext = (index: number) => {
                const file = pk3Files[index];
                const paths = pathsForFile[file];
                console.info(`Reading PK3 file '${file}'`);

                let wait = false;
                const entries: unzipper.Entry[] = [];
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
                            } as Pk3StreamEntry;
                            stream.emit('entry', pk3Entry);

                            if (!pk3Entry.wait) {
                                wait = false;
                                readNextEntry();
                            }
                        });
                    }
                }

                fs.createReadStream(file)
                    .pipe(unzipper.Parse())
                    .on('entry', (e: unzipper.Entry) => {
                        if (paths.includes(e.path)) {
                            entries.push(e);
                            if (!wait) {
                                readNextEntry();
                            }
                        } else {
                            e.autodrain();
                        }
                    })
                    .on('error', e => stream.emit('error', e))
                    .on('end', () => {
                        // TODO wait until last entry was processed
                        if (index < pk3Files.length) {
                            streamNext(index + 1);
                        } else {
                            stream.emit('end');
                        }
                    });
            }
            streamNext(0);
        }

        return stream;
    }

    private parsePk3(file: string): Promise<Pk3File> {
        return new Promise((resolve, reject) => {
            const pk3 = new Pk3File(file);
            fs.createReadStream(file)
                .pipe(unzipper.Parse())
                .on('entry', e => this.parsePk3Entry(e, pk3).then(undefined, reject))
                .promise().then(() => resolve(pk3), reject);
        });
    }

    private parsePk3Entry(entry: unzipper.Entry, pk3: Pk3File): Promise<void> {
        var fileName = entry.path;

        let matcher: RegExpMatchArray | null;
        if (matcher = PATTERN_MAP.exec(fileName)) {
            pk3.addMap(matcher[1], fileName);
        } else if (matcher = PATTERN_LEVELSHOT.exec(fileName)) {
            pk3.addLevelshot(matcher[1], fileName);
        } else if (PATTERN_TEXTURE.test(fileName)) {
            pk3.addTexture(fileName);
        }

        return entry.autodrain().promise();
    }
}

export interface Pk3StreamEntry {
    path: string;
    buffer: Buffer;
    // if this flag is set to true, the stream will wait util next() is called
    wait: boolean;
    // unblock the stream
    next(): void;
}
