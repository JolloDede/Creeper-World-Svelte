import type { Creeper } from "./Creeper";
import { loadTerrain } from "./Map";

export class World {
    public width = 72;
    public height = 48;
    public creepers: Creeper[];
    public map: number[][];

    constructor() {
        this.creepers = [];
        this.map = loadTerrain();
    }
}