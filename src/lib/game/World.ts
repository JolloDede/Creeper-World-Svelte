import { Point } from "pixi.js";
import { Collector } from "./Collector";
import type { Creeper } from "./Creeper";
import type { GameObject } from "./GameObject";
import { loadTerrain } from "./Map";

export enum Structure {
    Collector,
    Blaster
}

export class World {
    public width: number;
    public height: number;
    public creepers: Creeper[];
    public structures: GameObject[];
    public map: number[][];

    constructor() {
        this.creepers = [];
        this.map = loadTerrain();
        this.width = this.map[0].length;
        this.height = this.map.length;
        this.structures = this.initStructures();
    }

    private initStructures(): GameObject[] {
        let structures: GameObject[] = [];
        let struct = new Collector(new Point(0, 0));
        structures.push(struct);
        return structures;
    }
}