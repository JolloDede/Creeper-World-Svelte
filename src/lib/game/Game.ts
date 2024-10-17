import { Container } from "pixi.js";
import { Structure, World } from "./World";

export enum GameState {
    Start,
    InGame,
    Pause
}

export class Game {
    state: GameState;
    world: World;
    // This needs to get assinged right after the game is started by the class that creates this
    pointerPosHeight!: number;
    carriedStructure: Structure | null;
    view: Container;

    constructor() {
        this.state = GameState.Start
        this.world = new World();
        this.carriedStructure = null;

        this.view = new Container();
        this.view.addChild(this.world.view);
    }
}