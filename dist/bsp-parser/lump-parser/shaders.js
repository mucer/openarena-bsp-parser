"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var shader_struct_1 = require("../structs/shader-struct");
var SURF_NODAMAGE = 0x1; // never give falling damage
var SURF_SLICK = 0x2; // effects game physics
var SURF_SKY = 0x4; // lighting from environment map
var SURF_LADDER = 0x8;
var SURF_NOIMPACT = 0x10; // don't make missile explosions
var SURF_NOMARKS = 0x20; // don't leave missile marks
var SURF_FLESH = 0x40; // make flesh sounds and effects
var SURF_NODRAW = 0x80; // don't generate a drawsurface at all
var SURF_HINT = 0x100; // make a primary bsp splitter
var SURF_SKIP = 0x200; // completely ignore, allowing non-closed brushes
var SURF_NOLIGHTMAP = 0x400; // surface doesn't need a lightmap
var SURF_POINTLIGHT = 0x800; // generate lighting info at vertexes
var SURF_METALSTEPS = 0x1000; // clanking footsteps
var SURF_NOSTEPS = 0x2000; // no footstep sounds
var SURF_NONSOLID = 0x4000; // don't collide against curves with this set
var SURF_LIGHTFILTER = 0x8000; // act as a light filter during q3map -light
var SURF_ALPHASHADOW = 0x10000; // do per-pixel light shadow casting in q3map
var SURF_NODLIGHT = 0x20000; // don't dlight even if solid (solid lava, skies)
var SURF_DUST = 0x40000; // leave a dust trail when walking on this surface
function parseShaders(buffer, lump) {
    if (lump.length % shader_struct_1.ShaderStruct.LENGTH) {
        throw new Error("The shader lumps length must be a multiple of " + shader_struct_1.ShaderStruct.LENGTH + ", was " + lump.length);
    }
    var num = lump.length / shader_struct_1.ShaderStruct.LENGTH;
    var shaders = [];
    var struct = new shader_struct_1.ShaderStruct(buffer);
    for (var i = 0; i < num; i++) {
        struct.offset = lump.offset + i * shader_struct_1.ShaderStruct.LENGTH;
        var path = struct.getPath();
        var surfaceFlags = struct.getSurfaceFlags();
        shaders[i] = {
            path: path,
            isSky: (surfaceFlags & SURF_SKY) !== 0,
            doDraw: (surfaceFlags & SURF_NODRAW) === 0,
            doSkip: (surfaceFlags & SURF_SKIP) !== 0
        };
    }
    return shaders;
}
exports.parseShaders = parseShaders;
//# sourceMappingURL=shaders.js.map