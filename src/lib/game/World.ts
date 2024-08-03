import { Point } from "pixi.js";
import { Collector } from "./Collector";
import { Creeper } from "./Creeper";
import type { GameObject } from "./GameObject";
import { loadTerrain } from "./Map";
import { Position } from "./Pos";
import { HeadQuarters } from "./HeadQuarters";

export enum Structure {
    Collector,
    Blaster
}

export class World {
    public width: number;
    public height: number;
    public creepers: Creeper[];
    public structures: GameObject[];
    public headQuarters: HeadQuarters;
    public map: number[][];

    constructor() {
        this.creepers = [];
        this.map = loadTerrain();
        this.width = this.map[0].length;
        this.height = this.map.length;
        this.structures = this.initStructures();
        this.initCreepers();
        this.headQuarters = new HeadQuarters(new Position(40, 37));
        this.structures.push(this.headQuarters);
    }

    private initStructures(): GameObject[] {
        let structures: GameObject[] = [];
        let struct = new Collector(new Position(38, 37));
        structures.push(struct);
        struct = new Collector(new Position(42, 35));
        structures.push(struct);
        return structures;
    }

    private initCreepers() {
        let creeper = new Creeper(new Position(0, 0));
        this.creepers.push(creeper);
        creeper = new Creeper(new Position(18, 0));
        this.creepers.push(creeper);
        creeper = new Creeper(new Position(35, 0));
        this.creepers.push(creeper);
        creeper = new Creeper(new Position(69, 0));
        this.creepers.push(creeper);
    }
}