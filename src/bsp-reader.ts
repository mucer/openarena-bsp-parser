import * as fs from 'fs';
import * as path from 'path';
const Struct = require('struct');

interface SpawnPoint {
    origin: string;
    angle?: string;
    gametype?: string;
    // if set to 1, don't spawn in free for all games
    notfree?: string;
    // if set to 1, don't spawn in team games
    notteam?: string;
    // if set to 1, don't spawn in single player games
    notsingle?: string;
    // override the default wait before respawning.  -1 = never respawn automatically, which can be used with targeted spawning.
    wait?: string;
    // random number of plus or minus seconds varied from the respawn time
    random?: string;
    // override quantity or duration on most items.
    count?: string;
}

const ItemNames = {
    ammo_belt: 'Chaingun Belt',
    ammo_bfg: 'Bfg Ammo',
    ammo_bullets: 'Bullets',
    ammo_cells: 'Cells',
    ammo_grenades: 'Grenades',
    ammo_lightning: 'Lightning',
    ammo_mines: 'Proximity Mines',
    ammo_nails: 'Nails',
    ammo_rockets: 'Rockets',
    ammo_shells: 'Shells',
    ammo_slugs: 'Slugs',
    holdable_invulnerability: 'Invulnerability',
    holdable_kamikaze: 'Kamikaze',
    holdable_medkit: 'Medkit',
    holdable_portal: 'Portal',
    holdable_teleporter: 'Personal Teleporter',
    item_ammoregen: 'Ammo Regen',
    item_armor_body: 'Heavy Armor',
    item_armor_combat: 'Armor',
    item_armor_shard: 'Armor Shard',
    item_bluecube: 'Blue Cube',
    item_doubler: 'Doubler',
    item_enviro: 'Battle Suit',
    item_flight: 'Flight',
    item_guard: 'Guard',
    item_haste: 'Speed',
    item_health: '25 Health',
    item_health_large: '50 Health',
    item_health_mega: 'Mega Health',
    item_health_small: '5 Health',
    item_invis: 'Invisibility',
    item_quad: 'Quad Damage',
    item_redcube: 'Red Cube',
    item_regen: 'Regeneration',
    item_scout: 'Scout',
    team_CTF_blueflag: 'Blue Flag',
    team_CTF_neutralflag: 'Neutral Flag',
    team_CTF_redflag: 'Red Flag',
    team_DD_pointAblue: 'Point A (Blue)',
    team_DD_pointAred: 'Point A (Red)',
    team_DD_pointAwhite: 'Point A (White)',
    team_DD_pointBblue: 'Point B (Blue)',
    team_DD_pointBred: 'Point B (Red)',
    team_DD_pointBwhite: 'Point B (White)',
    team_dom_pointBlue: 'Blue domination point',
    team_dom_pointRed: 'Red domination point',
    team_dom_pointWhite: 'Neutral domination point',
    weapon_bfg: 'BFG10K',
    weapon_chaingun: 'Chaingun',
    weapon_gauntlet: 'Gauntlet',
    weapon_grapplinghook: 'Grappling Hook',
    weapon_grenadelauncher: 'Grenade Launcher',
    weapon_lightning: 'Lightning Gun',
    weapon_machinegun: 'Machinegun',
    weapon_nailgun: 'Nailgun',
    weapon_plasmagun: 'Plasma Gun',
    weapon_prox_launcher: 'Prox Launcher',
    weapon_railgun: 'Railgun',
    weapon_rocketlauncher: 'Rocket Launcher',
    weapon_shotgun: 'Shotgun'
};

interface Entities {
    target_position?: {
        targetname: string;
        origin: string;
    }[];
    // The info_player_deathmatch entity is used to define the respawn points used in deathmatch mode
    info_player_deathmatch?: {
        origin: string;
        angle?: string;
        notteam?: string;
    }[];
    // The info_player_intermission entity comes into effect when you go into the spectator mode. The first image you will see is the one you define via the intermission. Also the podium in single player matches or the final scores in multiplayer matches are shown in front of the defined view.
    info_player_intermission?: {}[];
    // The nearest target location to the player is the player location
    target_location?: {}[];

    // items
    ammo_belt?: SpawnPoint[];
    ammo_bfg?: SpawnPoint[];
    ammo_bullets?: SpawnPoint[];
    ammo_cells?: SpawnPoint[];
    ammo_grenades?: SpawnPoint[];
    ammo_lightning?: SpawnPoint[];
    ammo_mines?: SpawnPoint[];
    ammo_nails?: SpawnPoint[];
    ammo_rockets?: SpawnPoint[];
    ammo_shells?: SpawnPoint[];
    ammo_slugs?: SpawnPoint[];
    holdable_invulnerability?: SpawnPoint[];
    holdable_kamikaze?: SpawnPoint[];
    holdable_medkit?: SpawnPoint[];
    holdable_portal?: SpawnPoint[];
    holdable_teleporter?: SpawnPoint[];
    item_ammoregen?: SpawnPoint[];
    item_armor_body?: SpawnPoint[];
    item_armor_combat?: SpawnPoint[];
    item_armor_shard?: SpawnPoint[];
    item_bluecube?: SpawnPoint[];
    item_doubler?: SpawnPoint[];
    item_enviro?: SpawnPoint[];
    item_flight?: SpawnPoint[];
    item_guard?: SpawnPoint[];
    item_haste?: SpawnPoint[];
    item_health?: SpawnPoint[];
    item_health_large?: SpawnPoint[];
    item_health_mega?: SpawnPoint[];
    item_health_small?: SpawnPoint[];
    item_invis?: SpawnPoint[];
    item_quad?: SpawnPoint[];
    item_redcube?: SpawnPoint[];
    item_regen?: SpawnPoint[];
    item_scout?: SpawnPoint[];
    team_CTF_blueflag?: SpawnPoint[];
    team_CTF_neutralflag?: SpawnPoint[];
    team_CTF_redflag?: SpawnPoint[];
    team_DD_pointAblue?: SpawnPoint[];
    team_DD_pointAred?: SpawnPoint[];
    team_DD_pointAwhite?: SpawnPoint[];
    team_DD_pointBblue?: SpawnPoint[];
    team_DD_pointBred?: SpawnPoint[];
    team_DD_pointBwhite?: SpawnPoint[];
    team_dom_pointBlue?: SpawnPoint[];
    team_dom_pointRed?: SpawnPoint[];
    team_dom_pointWhite?: SpawnPoint[];
    weapon_bfg?: SpawnPoint[];
    weapon_chaingun?: SpawnPoint[];
    weapon_gauntlet?: SpawnPoint[];
    weapon_grapplinghook?: SpawnPoint[];
    weapon_grenadelauncher?: SpawnPoint[];
    weapon_lightning?: SpawnPoint[];
    weapon_machinegun?: SpawnPoint[];
    weapon_nailgun?: SpawnPoint[];
    weapon_plasmagun?: SpawnPoint[];
    weapon_prox_launcher?: SpawnPoint[];
    weapon_railgun?: SpawnPoint[];
    weapon_rocketlauncher?: SpawnPoint[];
    weapon_shotgun?: SpawnPoint[];
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
            throw new Error('no classname in object: ' + JSON.stringify(object));
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

const ctf = !!entities.team_CTF_blueflag && !!entities.team_CTF_redflag;
const ofctf = ctf && !!entities.team_CTF_neutralflag;

console.log(Object.keys(entities).sort());
console.log('ctf', ctf, 'ofctf', ofctf);
// let classnames: { [name: string]: number } = {};
// objects.forEach(o => classnames[o.classname] = (classnames[o.classname] || 0) + 1);
// https://github.com/OpenArena/legacy/blob/3db79b091ce1d950d9cdcac0445a2134f49a6fc7/game_code/oa-0.8.8/code/game/g_items.c#L740
