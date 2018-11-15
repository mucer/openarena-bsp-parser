import { Vector } from "./vector";
import { Rgba } from "./rgba";

export interface Vert {
    position: Vector;
    st: number[];
    color?: Rgba;
}