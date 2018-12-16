import { Entities } from './entities';
import { ShaderRef } from './shader-ref';
import { Surface } from './surface';

export interface BspFile {
    entities: Entities;
    shaders: ShaderRef[];
    surfaces: Surface[];
}
