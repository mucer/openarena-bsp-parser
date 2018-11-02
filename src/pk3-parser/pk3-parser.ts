import * as path from 'path';
import * as fs from 'fs-extra';
import { MapStore } from './map-store';
import { stream2buffer } from '../utils/stream2buffer';
import { parseBspFile } from '../bsp-parser/bsp-file-parser.';
import { OaMap } from './oa-map';
import * as unzipper from 'unzipper';

const PATTERN_LEVELSHOT = /levelshots\/(.*)\.(png|tga|jpg)/
const PATTERN_MAP = /maps\/(.*)\.bsp/

export async function readMapDir(dir: string): Promise<OaMap[]> {
    const files: string[] = await fs.readdir(dir);

    const mapStore = new MapStore();

    files.sort();

    for (let file of files) {
        if (file.endsWith('.pk3')) {
            const absFile = path.join(dir, file);
            console.debug(`found file '${absFile}'`);
            try {
                await readMapsFromPk3(absFile, mapStore);
            } catch (e) {
                console.log(`Could not read package '${absFile}': ${e && e.message || e}`);
            }
        }
    }
    console.log((mapStore as any).maps.length);
    return mapStore.getMaps();
}


export function readMapsFromPk3(file: string, maps: MapStore): Promise<void> {
    return new Promise((resolve, reject) => {
        const pkgName: string = path.basename(file);
        fs.createReadStream(file)
            .pipe(unzipper.Parse())
            .on('entry', e => readEntry(e, pkgName, maps).then(undefined, reject))
            .promise().then(resolve, reject);
    });
}

async function readEntry(entry: unzipper.Entry, pkgName: string, maps: MapStore): Promise<void> {
    var fileName = entry.path;
    console.debug(`found entry '${fileName}'`);

    let matcher: RegExpMatchArray;
    if (matcher = PATTERN_MAP.exec(fileName)) {
        const map = maps.addMap(pkgName, matcher[1]);
        const buf = await stream2buffer(entry);
        map.bsp = parseBspFile(buf)
    } else if (matcher = PATTERN_LEVELSHOT.exec(fileName)) {
        const buf = await stream2buffer(entry);
        maps.addLevelshot(matcher[1], matcher[2], buf);
    } else {
        entry.autodrain();
    }
}
