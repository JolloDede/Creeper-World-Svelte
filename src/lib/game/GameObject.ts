import type { Point } from "pixi.js";

export class GameObject {
    private name: string;
    public coordinates: Point;
    public width: number;
    public height: number;

    constructor(name: string, cord: Point, width: number, height: number) {
        this.name = name;
        this.coordinates = cord;
        this.width = width;
        this.height = height;
    }

    public getName(): string {
        return this.name;
    }
}