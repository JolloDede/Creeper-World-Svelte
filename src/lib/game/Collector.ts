import type { Point } from "pixi.js";
import { GameObject } from "./GameObject";

export class Collector extends GameObject {

    constructor(cord: Point) {
        super("collector", cord, 2, 2);
    }
}