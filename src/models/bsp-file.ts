import { Entities } from './entities';
import { Shader } from './shader';
import { Surface } from './surface';

export interface BspFile {
    entities: Entities;
    shaders: Shader[];
    surfaces: Surface[];
}
