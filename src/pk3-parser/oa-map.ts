import { Levelshot } from './models';
import { BspFile } from '../bsp-parser/models/bsp-file';

export class OaMap {
    public levelshot: Levelshot | undefined;
    public bsp: BspFile | undefined;

    constructor(public pkg: string, public name: string) {
    }

    public toString() {
        return `OaMap: pkg=${this.pkg}, name=${this.name}`;
    }
}
