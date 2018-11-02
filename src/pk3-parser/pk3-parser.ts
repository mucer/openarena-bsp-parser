import * as path from 'path';
import * as fs from 'fs-extra';
import * as yauzl from 'yauzl';
import { MapStore } from './map-store';
import { OAMap } from './models';
import { stream2buffer } from '../utils/stream2buffer';

const PATTERN_LEVELSHOT = /levelshots\/(.*)\.(png|tga|jpg)/
const PATTERN_MAP = /maps\/(.*)\.bsp/

export async function readMapDir(dir: string): Promise<OAMap[]> {
    const files: string[] = await fs.readdir(dir);

    const mapStore = new MapStore();

    files.sort();

    for (let file of files) {
        try {
            if (file.endsWith('.pk3')) {
                await readMapsFromZip(path.join(dir, file), mapStore);
            }
        } catch (e) {
            console.log('error', e);
        }
    }
    return mapStore.getMaps();
}


function readMapsFromZip(file: string, maps: MapStore): Promise<void> {
    return new Promise((resolve, reject) => {
        yauzl.open(file, { lazyEntries: true }, (err, zipfile) => {
            if (err) {
                reject(err);
            } else {
                zipfile.readEntry();
                const pkgName: string = path.basename(file);
                zipfile.on('entry', entry => {
                    const fileName: string = entry.fileName;
                    let matcher: RegExpMatchArray;
                    if (matcher = PATTERN_MAP.exec(fileName)) {
                        maps.addMap(pkgName, matcher[1]);

                        zipfile.readEntry();
                    } else if (matcher = PATTERN_LEVELSHOT.exec(fileName)) {
                        readEntry(zipfile, entry).then(
                            buf => {
                                maps.addLevelshot(matcher[1], matcher[2], buf);
                                zipfile.readEntry();
                            },
                            err => {
                                console.warn('Error reading levelshot image: ' + err);
                                zipfile.readEntry();
                            });
                    } else {
                        zipfile.readEntry();
                    }
                });
                zipfile.on('end', () => {
                    resolve();
                });
                zipfile.on('error', e => {
                    reject(e);
                });
            }
        });
    });
}

function readEntry(zipfile: yauzl.ZipFile, entry: yauzl.Entry): Promise<Buffer> {
    return new Promise((resolve, reject) => {
        zipfile.openReadStream(entry, function (err, readStream) {
            if (err) {
                reject(err);
            } else {
                stream2buffer(readStream).then(resolve, reject);
            }
        });
    });
}


