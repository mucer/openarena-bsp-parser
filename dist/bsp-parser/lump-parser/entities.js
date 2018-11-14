"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CHAR_OBJ_START = '{'.charCodeAt(0);
var CHAR_OBJ_END = '}'.charCodeAt(0);
var CHAR_STR = '"'.charCodeAt(0);
// TODO improve error messages (include index, ...)
function parseEntitiesLump(buffer, _a) {
    var offset = _a.offset, length = _a.length;
    var entity;
    var str;
    var key;
    var entities = {};
    var max = offset + length;
    for (var i = offset; i < max; i++) {
        var char = buffer.readUInt8(i);
        if (char === CHAR_OBJ_START) {
            if (entity !== undefined) {
                throw new Error('already in object');
            }
            entity = {};
        }
        else if (char === CHAR_OBJ_END) {
            if (entity === undefined) {
                throw new Error('not in object');
            }
            if (str !== undefined) {
                throw new Error("string '" + str + "' not closed");
            }
            if (key !== undefined) {
                throw new Error("no value for key '" + key + "' found!");
            }
            var c = entity.classname;
            if (!c) {
                throw new Error('no classname in object: ' + JSON.stringify(entity));
            }
            delete entity.classname;
            (entities[c] = entities[c] || []).push(entity);
            entity = undefined;
        }
        else if (char === CHAR_STR) {
            if (entity === undefined) {
                throw new Error('invalid string start: not in object');
            }
            if (str === undefined) {
                str = '';
            }
            else if (!key) {
                key = str;
                str = undefined;
            }
            else {
                entity[key] = str;
                key = undefined;
                str = undefined;
            }
        }
        else if (str !== undefined) {
            str += String.fromCharCode(char);
        }
    }
    return entities;
}
exports.parseEntitiesLump = parseEntitiesLump;
//# sourceMappingURL=entities.js.map