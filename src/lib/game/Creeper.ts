import type { Point } from "pixi.js";
import { GameObject } from "./GameObject";

export class Creeper extends GameObject {

    constructor(cord: Point) {
        super(cord);
    }
}