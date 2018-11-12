import { SurfaceType } from "./surface-type";
import { Vert } from "./vert";

export interface Surface {
    type: SurfaceType;
    verts: Vert[];
}