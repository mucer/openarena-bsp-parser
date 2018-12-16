import { ShaderStage } from "./shader-stage";

export interface Shader {
    name: string;
    stages: ShaderStage[];
    cullType: 'front' | 'back' | 'both';
    noMipMaps: boolean;
    noPicMip: boolean;
    polygonOffset: boolean;
    /** entityMergable, allowing sprite surfaces from multiple entities to be merged into one batch.
      This is a savings for smoke puffs and blood, but can't be used for anything where the shader calcs 
      (not the surface function) reference the entity color or scroll */
    entityMergable: boolean;
}
