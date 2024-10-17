import { Container, Point } from "pixi.js";
import { Collector } from "./structures/Collector";
import { Creeper } from "./structures/Creeper";
import type { GameObject } from "./structures/GameObject";
import { loadTerrain } from "./Map";
import { Position } from "./Pos";
import { HeadQuarters } from "./structures/HeadQuarters";
import { Blaster } from "./structures/Blaster";

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

    view: Container;

    constructor() {
        this.creepers = [];
        this.map = loadTerrain();
        this.width = this.map[0].length;
        this.height = this.map.length;
        this.structures = this.initStructures();
        this.initCreepers();
        this.headQuarters = new HeadQuarters(new Position(40, 37));
        this.structures.push(this.headQuarters);

        this.view = new Container();
    }

    private initStructures(): GameObject[] {
        let structures: GameObject[] = [];
        let collector = new Collector(new Position(38, 37));
        structures.push(collector);
        collector = new Collector(new Position(42, 35));
        structures.push(collector);

        let blaster = new Blaster(new Position(38, 33));
        structures.push(blaster);
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