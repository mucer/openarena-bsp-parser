import { basename }from 'path';
import { Dictionary } from "../models";

export class Pk3File {
    private name: string;

    private maps: Dictionary<string> = {};

    private textures: string[] = [];

    private levelshots: Dictionary<string> = {};

    constructor(private path: string) {
       this.name = basename(path);
    }

    public getName(): string {
        return this.name;
    }

    public getPath(): string {
        return this.path;
    }

    public addMap(name: string, path: string) {
        this.maps[name] = path;
    }

    public getMapPath(name: string): string | undefined {
        return this.maps[name];
    }

    public addLevelshot(name: string, path: string) {
        this.levelshots[name] = path;
    }

    public getLevelshots(): Dictionary<string> {
        return this.levelshots;
    }

    public getLevelshotPath(name: string): string | undefined {
        return this.levelshots[name];
    }

    public addTexture(path: string) {
        if (!this.textures.includes(path)) {
            this.textures.push(path);
        }
    }
}