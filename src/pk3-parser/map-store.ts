import { Levelshot } from './models';
import { OaMap } from './oa-map';

export class MapStore {
    private maps: OaMap[] = [];

    private levelshots: { [name: string]: Levelshot } = {};

    public addMap(pkg: string, name: string) {
        const map = new OaMap(pkg, name);
        this.maps.push(map);
        return map;
    }

    public addLevelshot(name: string, ext: string, data: Buffer) {
        this.levelshots[name] = {
            ext,
            data
        };
    }

    public getMaps(): OaMap[] {
        Object.keys(this.levelshots)
            .filter(name => this.maps.every(m => m.name !== name))
            .forEach(name => console.warn(`No map for levelshot '${name}' found!`));

        this.maps.forEach(m => m.levelshot = this.levelshots[m.name]);
        return this.maps;
    }
}
