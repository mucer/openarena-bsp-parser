"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models");
const entities_1 = require("./lump-parser/entities");
const shaders_1 = require("./lump-parser/shaders");
const surface_1 = require("./lump-parser/surface");
const header_struct_1 = require("./structs/header-struct");
function parseBspFile(buffer) {
    const header = new header_struct_1.HeaderStruct(buffer);
    // qfiles.h
    const entitiesLump = header.getLump(models_1.LumpType.ENTITIES);
    const shadersLump = header.getLump(models_1.LumpType.SHADERS);
    const surfaceLump = header.getLump(models_1.LumpType.SURFACES);
    const drawVertsLump = header.getLump(models_1.LumpType.DRAW_VERTS);
    const drawIndexesLump = header.getLump(models_1.LumpType.DRAW_INDEXES);
    const entities = entities_1.parseEntitiesLump(buffer, entitiesLump);
    const shaders = shaders_1.parseShaders(buffer, shadersLump);
    const surfaces = surface_1.parseSurfaces(buffer, surfaceLump, drawVertsLump, drawIndexesLump);
    return {
        entities,
        shaders,
        surfaces
    };
}
exports.parseBspFile = parseBspFile;
//# sourceMappingURL=bsp-file-parser.js.map