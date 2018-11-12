import { readFileSync, createWriteStream } from 'fs';
import * as path from 'path';
import { parseBspFile } from './bsp-parser/bsp-file-parser.';
import { createCanvas, loadImage } from 'canvas';
import { Vector } from './bsp-parser/models/vector';
import { SurfaceType } from './bsp-parser/models/surface-type';

const buf = readFileSync(path.join(__dirname, '..', 'assets', 'oa_ctf2.bsp'));
const bsp = parseBspFile(buf);

const ctf = !!bsp.entities.team_CTF_blueflag && !!bsp.entities.team_CTF_redflag;
const ofctf = ctf && !!bsp.entities.team_CTF_neutralflag;

// console.log(Object.keys(bsp.entities).sort());

// const min: Vector = bsp.vertices.reduce(
//     (prev, v) => ({ x: Math.min(prev.x, v.x), y: Math.min(prev.y, v.y), z: Math.min(prev.z, v.z) }),
//     { x: Number.MAX_VALUE, y: Number.MAX_VALUE, z: Number.MAX_VALUE });
// const max: Vector = bsp.vertices.reduce(
//     (prev, v) => ({ x: Math.max(prev.x, v.x), y: Math.max(prev.y, v.y), z: Math.max(prev.z, v.z) }),
//     { x: 0, y: 0, z: 0 })
// console.log('min', min);
// console.log('max', max);

const canvas = createCanvas(5000, 3000)
const ctx = canvas.getContext('2d');


bsp.surfaces.forEach(s => {
    if (s.verts.length > 1) {
        switch (s.type) {
            case SurfaceType.BAD:
                ctx.strokeStyle = 'red';
                break;
            case SurfaceType.FLARE:
                ctx.strokeStyle = 'yellow';
                break;
            case SurfaceType.FACE:
                ctx.strokeStyle = 'black';
                break;
            case SurfaceType.MESH:
                ctx.strokeStyle = 'blue';
                break;
            default:
                ctx.strokeStyle = 'green';
        }

        const v = s.verts[0];
        // ctx.strokeStyle = `rgba(${v.color.r},${v.color.g},${v.color.b},1)`;
        ctx.beginPath();
        ctx.moveTo(s.verts[0].position.x, s.verts[0].position.y);
        for (let i = s.verts.length - 1; i >= 0; i -= 1) {
            ctx.lineTo(s.verts[i].position.x, s.verts[i].position.y);
        }
        ctx.stroke();
    }
});

// ctx.strokeStyle = 'rgba(0,0,0,0.5)';
// bsp.edges.forEach(e => {
//     ctx.beginPath();
//     ctx.moveTo((e.from.x - min.x) * scale, (e.from.y - min.y) * scale);
//     ctx.lineTo((e.to.x - min.x) * scale, (e.to.y - min.y) * scale);
//     ctx.stroke();
// });

canvas.createPNGStream().pipe(createWriteStream('test.png'));

// let classnames: { [name: string]: number } = {};
// objects.forEach(o => classnames[o.classname] = (classnames[o.classname] || 0) + 1);
// https://github.com/OpenArena/legacy/blob/3db79b091ce1d950d9cdcac0445a2134f49a6fc7/game_code/oa-0.8.8/code/game/g_items.c#L740
