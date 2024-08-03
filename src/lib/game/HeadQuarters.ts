import { GameObject } from "./GameObject";
import type { Position } from "./Pos";

export class HeadQuarters extends GameObject {

    constructor(cord: Position) {
        super('base', cord, 4, 4);
    }
}