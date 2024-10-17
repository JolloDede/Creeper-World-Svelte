import { GameObject } from "./GameObject";
import type { Position } from "./Pos";

export class Creeper extends GameObject {

    constructor(cord: Position) {
        super("creeper", cord, 1, 1);
    }
}