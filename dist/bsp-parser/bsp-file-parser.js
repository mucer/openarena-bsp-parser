"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var models_1 = require("../models");
var entities_1 = require("./lump-parser/entities");
var shaders_1 = require("./lump-parser/shaders");
var surface_1 = require("./lump-parser/surface");
var header_struct_1 = require("./structs/header-struct");
function parseBspFile(buffer) {
    var header = new header_struct_1.HeaderStruct(buffer);
    // qfiles.h
    var entitiesLump = header.getLump(models_1.LumpType.ENTITIES);
    var shadersLump = header.getLump(models_1.LumpType.SHADERS);
    var surfaceLump = header.getLump(models_1.LumpType.SURFACES);
    var drawVertsLump = header.getLump(models_1.LumpType.DRAW_VERTS);
    var drawIndexesLump = header.getLump(models_1.LumpType.DRAW_INDEXES);
    var entities = entities_1.parseEntitiesLump(buffer, entitiesLump);
    var shaders = shaders_1.parseShaders(buffer, shadersLump);
    var surfaces = surface_1.parseSurfaces(buffer, surfaceLump, drawVertsLump, drawIndexesLump, shaders);
    return {
        entities: entities,
        surfaces: surfaces
    };
}
exports.parseBspFile = parseBspFile;
//# sourceMappingURL=bsp-file-parser.js.map