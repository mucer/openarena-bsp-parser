export interface Levelshot {
    ext: string;
    data: Buffer;
}

export interface OAMap {
    pkg: string;
    name: string;
    levelshot?: Levelshot;
}