import { readFileSync } from 'fs';
import * as path from 'path';
import { parseBspFile } from './bsp-parser/bsp-file-parser.';

const buf = readFileSync(path.join(__dirname, '..', 'assets', 'oa_ctf2.bsp'));
const bsp = parseBspFile(buf);

const ctf = !!bsp.entities.team_CTF_blueflag && !!bsp.entities.team_CTF_redflag;
const ofctf = ctf && !!bsp.entities.team_CTF_neutralflag;

console.log(Object.keys(bsp.entities).sort());
console.log('ctf', ctf, 'ofctf', ofctf);
// let classnames: { [name: string]: number } = {};
// objects.forEach(o => classnames[o.classname] = (classnames[o.classname] || 0) + 1);
// https://github.com/OpenArena/legacy/blob/3db79b091ce1d950d9cdcac0445a2134f49a6fc7/game_code/oa-0.8.8/code/game/g_items.c#L740
