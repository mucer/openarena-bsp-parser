import { Lump, ShaderRef } from "../../models";
import { ShaderStruct } from "../structs/shader-struct";


const CONTENTS_SOLID = 1; // an eye is never valid in a solid
const CONTENTS_LAVA = 8;
const CONTENTS_SLIME = 16;
const CONTENTS_WATER = 32;
const CONTENTS_FOG = 64;
const CONTENTS_NOTTEAM1 = 0x0080;
const CONTENTS_NOTTEAM2 = 0x0100;
const CONTENTS_NOBOTCLIP = 0x0200;
const CONTENTS_AREAPORTAL = 0x8000;
const CONTENTS_PLAYERCLIP = 0x10000;
const CONTENTS_MONSTERCLIP = 0x20000;
const CONTENTS_TELEPORTER = 0x40000;
const CONTENTS_JUMPPAD = 0x80000;
const CONTENTS_CLUSTERPORTAL = 0x100000;
const CONTENTS_DONOTENTER = 0x200000;
const CONTENTS_BOTCLIP = 0x400000;
const CONTENTS_MOVER = 0x800000;
const CONTENTS_ORIGIN = 0x1000000; // removed before bsping an entity
const CONTENTS_BODY = 0x2000000; // should never be on a brush, only in game
const CONTENTS_CORPSE = 0x4000000;
const CONTENTS_DETAIL = 0x8000000; // brushes not used for the bsp
const CONTENTS_STRUCTURAL = 0x10000000; // brushes used for the bsp
const CONTENTS_TRANSLUCENT = 0x20000000; // don't consume surface fragments inside
const CONTENTS_TRIGGER = 0x40000000;
const CONTENTS_NODROP = 0x80000000; // don't leave bodies or items (death fog, lava)

const SURF_NODAMAGE = 0x1; // never give falling damage
const SURF_SLICK = 0x2; // effects game physics
const SURF_SKY = 0x4; // lighting from environment map
const SURF_LADDER = 0x8;
const SURF_NOIMPACT = 0x10; // don't make missile explosions
const SURF_NOMARKS = 0x20; // don't leave missile marks
const SURF_FLESH = 0x40; // make flesh sounds and effects
const SURF_NODRAW = 0x80; // don't generate a drawsurface at all
const SURF_HINT = 0x100; // make a primary bsp splitter
const SURF_SKIP = 0x200; // completely ignore, allowing non-closed brushes
const SURF_NOLIGHTMAP = 0x400; // surface doesn't need a lightmap
const SURF_POINTLIGHT = 0x800; // generate lighting info at vertexes
const SURF_METALSTEPS = 0x1000; // clanking footsteps
const SURF_NOSTEPS = 0x2000; // no footstep sounds
const SURF_NONSOLID = 0x4000; // don't collide against curves with this set
const SURF_LIGHTFILTER = 0x8000; // act as a light filter during q3map -light
const SURF_ALPHASHADOW = 0x10000; // do per-pixel light shadow casting in q3map
const SURF_NODLIGHT = 0x20000; // don't dlight even if solid (solid lava, skies)
const SURF_DUST = 0x40000; // leave a dust trail when walking on this surface

export function parseShaders(buffer: Buffer, lump: Lump): ShaderRef[] {
    if (lump.length % ShaderStruct.LENGTH) {
        throw new Error(`The shader lumps length must be a multiple of ${ShaderStruct.LENGTH}, was ${lump.length}`);
    }
    const num = lump.length / ShaderStruct.LENGTH;
    const shaders: ShaderRef[] = [];
    const struct = new ShaderStruct(buffer);

    for (let i = 0; i < num; i++) {
        struct.offset = lump.offset + i * ShaderStruct.LENGTH;
        const path = struct.getPath();
        const surfaceFlags = struct.getSurfaceFlags();

        shaders[i] = {
            path,
            isSky: (surfaceFlags & SURF_SKY) !== 0,
            doDraw: (surfaceFlags & SURF_NODRAW) === 0,
            doSkip: (surfaceFlags & SURF_SKIP) !== 0
        };
    }

    return shaders;
}