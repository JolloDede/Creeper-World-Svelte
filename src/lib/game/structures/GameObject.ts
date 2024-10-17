import type { Position } from "./Pos";

export class GameObject {
    private name: string;
    public coordinates: Position;
    public width: number;
    public height: number;

    constructor(name: string, cord: Position, width: number, height: number) {
        this.name = name;
        this.coordinates = cord;
        this.width = width;
        this.height = height;
    }

    public getName(): string {
        return this.name;
    }
}