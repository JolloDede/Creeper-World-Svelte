import { GameObject } from "./GameObject";
import type { Position } from "./Pos";

export class Blaster extends GameObject {

    constructor(cord: Position) {
        super('blaster', cord, 2, 2);
    }
}