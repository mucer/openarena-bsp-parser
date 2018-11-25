import { Entities } from './entities';
import { BspShader } from './bsp-shader';
import { Surface } from './surface';

export interface BspFile {
    entities: Entities;
    shaders: BspShader[];
    surfaces: Surface[];
}
