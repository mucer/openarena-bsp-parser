import { Dictionary } from "../models";
export declare class Pk3File {
    private path;
    private name;
    private maps;
    private textures;
    private levelshots;
    constructor(path: string);
    getName(): string;
    getPath(): string;
    addMap(name: string, path: string): void;
    getMapPath(name: string): string | undefined;
    addLevelshot(name: string, path: string): void;
    getLevelshots(): Dictionary<string>;
    getLevelshotPath(name: string): string | undefined;
    addTexture(path: string): void;
    getTexturePath(path: string): string | undefined;
}
