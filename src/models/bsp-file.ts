import { Entities } from './entities';
import { Surface } from './surface';

export interface BspFile {
    entities: Entities;
    surfaces: Surface[];
}
