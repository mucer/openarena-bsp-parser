import { readMapDir } from "./pk3-parser/pk3-parser";
import { OAMap } from "./pk3-parser/models";
import { tga2png } from "./utils/tga2png";
import * as path from 'path';
import * as fs from 'fs-extra';

const baseDir = 'D:/Spiele/openarena-0.8.8/baseoa';
const levelshotDir = path.join(__dirname, 'levelshots');
readMapDir(baseDir).then(maps => {
    console.log(maps);
    extractLevelshots(maps, levelshotDir);
});

async function extractLevelshots(maps: OAMap[], dir: string) {
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