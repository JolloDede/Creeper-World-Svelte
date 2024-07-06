import type { Point } from "pixi.js";

export class GameObject {
    public coordinates: Point;

    constructor(cord: Point) {
        this.coordinates = cord;
    }
}