import { OAMap, Levelshot } from "./models";

export class MapStore {
    private maps: OAMap[] = [];

    private levelshots: { [name: string]: Levelshot } = {};

    public addMap(pkg: string, name: string) {
        this.maps.push({
            pkg,
            name
        });
    }

    public addLevelshot(name: string, ext: string, data: Buffer) {
        this.levelshots[name] = {
            ext,
            data
        };
    }

    public getMaps(): OAMap[] {
        Object.keys(this.levelshots)
            .filter(name => this.maps.every(m => m.name !== name))
            .forEach(name => console.warn(`No map for levelshot '${name}' found!`));

        this.maps.forEach(m => m.levelshot = this.levelshots[m.name]);
        return this.maps;
    }
}