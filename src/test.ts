import * as path from 'path';
import * as fs from 'fs';
import * as yauzl from 'yauzl';
import * as pngjs from 'pngjs';
const TGA = require('tga');

const levelshotPattern = /levelshots\/(.*)\.(png|tga|jpg)/
const mapPattern = /maps\/(.*)\.bsp/
const baseDir = 'D:/Spiele/openarena-0.8.8/baseoa';
// const file = path.join(baseDir, 'z_oacmp-volume1-v3.pk3');

async function readMapDir(dir: string) {
    const files: string[] = await listFiles(dir);

    const mapStore = new MapStore();

    files.sort();

    for (let file of files) {
        try {
            if (file.endsWith('.pk3')) {
                await readMapsFromZip(mapStore, path.join(dir, file));
            }
        } catch (e) {
            console.log('error', e);
        }
    }

    const levelshotDir = path.join(__dirname, 'levelshots');
    if (!fs.existsSync(levelshotDir)) {
        fs.mkdirSync(levelshotDir);
    }
    const maps = mapStore.getMaps();
    for (let map of maps) {
        if (map.levelshot && map.levelshot.ext === 'tga') {
            map.levelshot.data = await tga2png(map.levelshot.data);
            map.levelshot.ext = 'png';
        }

        if (map.levelshot) {
            await writeFile(path.join(levelshotDir, `${map.name}.${map.levelshot.ext}`), map.levelshot.data);
        }
    }
}
readMapDir(baseDir);

function listFiles(dir: string): Promise<string[]> {
    return new Promise((resolve, reject) => {
        fs.readdir(baseDir, (err, files) => {
            if (err) {
                reject(err);
            } else {
                resolve(files);
            }
        });
    })
}

function writeFile(file: string, data: Buffer): Promise<void> {
    return new Promise((resolve, reject) => {
        fs.writeFile(file, data, err => err ? reject(err) : resolve());
    });
}

interface Levelshot {
    ext: string;
    data: Buffer;
}

interface Map {
    pkg: string;
    name: string;
    levelshot?: Levelshot;
}

class MapStore {
    private maps: Map[] = [];

    private levelshots: { [name: string]: Levelshot } = {};

    public addMap(pkg: string, name: string) {
        this.maps.push({
            pkg,
            name
        });
    }

    public addLevelshot(name: string, ext: string, data: Buffer) {
        this.levelshots[name] = {
            ext,
            data
        };
    }

    public getMaps(): Map[] {
        Object.keys(this.levelshots)
            .filter(name => this.maps.every(m => m.name !== name))
            .forEach(name => console.warn(`No map for levelshot '${name}' found!`));

        this.maps.forEach(m => m.levelshot = this.levelshots[m.name]);
        return this.maps;
    }
}

function readMapsFromZip(maps: MapStore, file: string): Promise<void> {
    return new Promise((resolve, reject) => {
        yauzl.open(file, { lazyEntries: true }, function (err, zipfile) {
            if (err) {
                reject(err);
            } else {
                zipfile.readEntry();
                const pkg: string = path.basename(file);
                zipfile.on('entry', entry => {
                    const fileName: string = entry.fileName;
                    let matcher: RegExpMatchArray;
                    if (matcher = mapPattern.exec(fileName)) {
                        maps.addMap(pkg, matcher[1]);
                        
                        zipfile.readEntry();
                    } else if (matcher = levelshotPattern.exec(fileName)) {
                        readBuffer(zipfile, entry).then(
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

function readBuffer(zipfile: yauzl.ZipFile, entry: yauzl.Entry): Promise<Buffer> {
    return new Promise((resolve, reject) => {
        const fileName: string = entry.fileName;
        zipfile.openReadStream(entry, function (err, readStream) {
            if (err) {
                reject(err);
            } else {
                const bufs = [];
                readStream.on('data', function (d) { bufs.push(d); });
                readStream.on('end', function () {
                    resolve(Buffer.concat(bufs));
                });
            }
        });
    });
}

function tga2png(buffer: Buffer): Promise<Buffer> {
    return new Promise((resolve, reject) => {
        const tga = new TGA(buffer);
        var png = new pngjs.PNG({
            width: tga.width,
            height: tga.height
        });
        png.data = tga.pixels;
        const stream = png.pack();
        const bufs = [];
        stream.on('data', function (d) { bufs.push(d); });
        stream.on('end', function () {
            resolve(Buffer.concat(bufs));
        });
    });
}

