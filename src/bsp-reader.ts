import * as fs from 'fs';
import * as path from 'path';
const Struct = require('struct');

interface Entities {
    target_position?: [{
        targetname: string;
        origin: string;
    }];
    // The info_player_deathmatch entity is used to define the respawn points used in deathmatch mode
    info_player_deathmatch?: [{
        origin: string;
        angle?: string;
        notteam?: string;
    }];
    team_CTF_blueflag?: [{
        origin: string;
        gametype?: string;
    }]
    // The info_player_intermission entity comes into effect when you go into the spectator mode. The first image you will see is the one you define via the intermission. Also the podium in single player matches or the final scores in multiplayer matches are shown in front of the defined view.
    info_player_intermission?: [{}];
    // The nearest target location to the player is the player location
    target_location?: [{}];
}

interface Header {
    setBuffer: (buffer: Buffer) => void;
    length: () => number;
    fields: {
        magic: number;
        version: number;
        lump: {
            offset: number;
            length: number;
        }[]
    };
}

const header: Header = Struct()
    .chars('magic', 4)
    .word32Ule('version')
    .array('lump', 19, Struct()
        .word32Ule('offset')
        .word32Ule('length'));

const buf = fs.readFileSync(path.join(__dirname, '..', 'assets', 'oa_ctf2.bsp'));
header.setBuffer(buf);
// lump 0 = entities json string
const length = header.fields.lump[0].length;
const offset = header.fields.lump[0].offset;
const buf2 = Buffer.allocUnsafe(length);
buf.copy(buf2, 0, offset);

let object: { [key: string]: string } | undefined;
let str: string | undefined;
let key: string | undefined;
const entities: Entities = {};

for (let i = 0; i < buf2.length; i++) {
    const char = String.fromCharCode(buf2.readUInt8(i));
    if (char === '{') {
        if (object) {
            throw new Error('already in object');
        }
        object = {};
    } else if (char === '}') {
        if (!object) {
            throw new Error('not in object');
        }
        const c = object.classname;
        if (!c) {
            throw new Error('no classname in object: '+JSON.stringify(object));
        }
        delete object.classname;
        (entities[c] = entities[c] || []).push(object);
        object = undefined;
    } else if (char === '"') {
        if (!object) {
            throw new Error('invalid string start: not in object');
        }
        if (str === undefined) {
            str = '';
        } else if (!key) {
            key = str;
            str = undefined;
        } else {
            object[key] = str;
            key = undefined;
            str = undefined;
        }
    } else if (str !== undefined) {
        str += char;
    }
}

console.log(entities);
// let classnames: { [name: string]: number } = {};
// objects.forEach(o => classnames[o.classname] = (classnames[o.classname] || 0) + 1);