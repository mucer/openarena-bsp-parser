import { Entities, Lump } from '../../models';

const CHAR_OBJ_START = '{'.charCodeAt(0);
const CHAR_OBJ_END = '}'.charCodeAt(0);
const CHAR_STR = '"'.charCodeAt(0);

// TODO improve error messages (include index, ...)
export function parseEntitiesLump(buffer: Buffer, { offset, length }: Lump): Entities {
    let entity: { [key: string]: string } | undefined;
    let str: string | undefined;
    let key: string | undefined;
    const entities: Entities = {};
    const max = offset + length;
    for (let i = offset; i < max; i++) {
        const char = buffer.readUInt8(i);
        if (char === CHAR_OBJ_START) {
            if (entity !== undefined) {
                throw new Error('already in object');
            }
            entity = {};
        } else if (char === CHAR_OBJ_END) {
            if (entity === undefined) {
                throw new Error('not in object');
            }
            if (str !== undefined) {
                throw new Error(`string '${str}' not closed`);
            }
            if (key !== undefined) {
                throw new Error(`no value for key '${key}' found!`);
            }
            const c = entity.classname;
            if (!c) {
                throw new Error('no classname in object: ' + JSON.stringify(entity));
            }
            delete entity.classname;
            ((entities as any)[c] = (entities as any)[c] || []).push(entity);
            entity = undefined;
        } else if (char === CHAR_STR) {
            if (entity === undefined) {
                throw new Error('invalid string start: not in object');
            }
            if (str === undefined) {
                str = '';
            } else if (!key) {
                key = str;
                str = undefined;
            } else {
                entity[key] = str;
                key = undefined;
                str = undefined;
            }
        } else if (str !== undefined) {
            str += String.fromCharCode(char);
        }
    }
    return entities;
}
