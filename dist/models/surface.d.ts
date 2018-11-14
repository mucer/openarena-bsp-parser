import { SurfaceType } from "./surface-type";
import { Vert } from "./vert";
import { Vector } from "./vector";
import { Shader } from "./shader";
export interface Surface {
    type: SurfaceType;
    verts: Vert[];
    indexes: number[];
    shader: Shader;
    normal?: Vector;
}
