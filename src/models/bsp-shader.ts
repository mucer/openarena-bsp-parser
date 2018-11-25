/**
 * Shader defined in a BSP file. Must be linked to a shader which was defined
 * in a shader file.
 */
export interface BspShader {
    path: string;
    isSky: boolean;
    doDraw: boolean;
    doSkip: boolean;
}