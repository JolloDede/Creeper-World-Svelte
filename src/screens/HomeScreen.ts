import { Button, FancyButton } from "@pixi/ui";
import { Container, Graphics } from "pixi.js";
import { LargeButton } from "../ui/LargeButton";

export class HomeScreen extends Container {
    private startButton: LargeButton;

    constructor() {
        super();

        this.startButton = new LargeButton({ text: "test"});
        this.addChild(this.startButton);
    }
}