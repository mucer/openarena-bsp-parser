import { readMapDir, readMapsFromPk3 } from './pk3-parser/pk3-parser';
import { tga2png } from './utils/tga2png';
import * as path from 'path';
import * as fs from 'fs-extra';
import { OaMap } from './pk3-parser/oa-map';

const baseDir = path.join(__dirname, '..', 'assets');
const levelshotDir = path.join(__dirname, 'levelshots');
readMapDir(baseDir).then(maps => {
    maps.forEach(m => console.log(m.toString()));
    // extractLevelshots(maps, levelshotDir);
});

async function extractLevelshots(maps: OaMap[], dir: string) {
    await fs.mkdirp(dir);
    for (let map of maps) {
        if (map.levelshot && map.levelshot.ext === 'tga') {
            map.levelshot.data = await tga2png(map.levelshot.data);
            map.levelshot.ext = 'png';
        }

        if (map.levelshot) {
            await fs.writeFile(path.join(dir, `${map.name}.${map.levelshot.ext}`), map.levelshot.data);
        }
    }
}
