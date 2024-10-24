import { Container } from "pixi.js";
import { LargeButton } from "../ui/LargeButton";
import { navigation } from "../utils/navigation";
import { GameScreen } from "./GameScreen";
import { Label } from "../ui/Label";

export class ResultsScreen extends Container {
    private gameEndState: Label;
    private playAgainButton: LargeButton;

    constructor() {
        super();

        this.gameEndState = new Label('');
        this.addChild(this.gameEndState);

        this.playAgainButton = new LargeButton({ text: "Play Again" });
        this.playAgainButton.onPress.connect(() => navigation.showScreen(GameScreen));
        this.addChild(this.playAgainButton);
    }

    public resize(width: number, height: number) {
        this.gameEndState.x = width * 0.5;
        this.gameEndState.y = height * 0.5;
        this.playAgainButton.x = width * 0.5;
        this.playAgainButton.y = height * 0.5 - height * 0.1;
    }

    public async show() {
        this.gameEndState.text = "Game Over / Well Played"
        // this.gameEndState.hide(false);
        this.playAgainButton.hide(false);

        // await this.gameEndState.show();
        await this.playAgainButton.show();
        this.interactiveChildren = true;
    }

    public async hide() {
        this.gameEndState.text = "" ;
        await this.playAgainButton.hide();
    }
}