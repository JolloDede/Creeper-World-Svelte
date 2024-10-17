import { GameObject } from "./GameObject";
import type { Position } from "./Pos";

export class Collector extends GameObject {

    constructor(cord: Position) {
        super("collector", cord, 2, 2);
    }
}