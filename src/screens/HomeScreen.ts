import { Button, FancyButton } from "@pixi/ui";
import { Container, Graphics } from "pixi.js";
import { LargeButton } from "../ui/LargeButton";
import { navigation } from "../utils/navigation";
import { GameScreen } from "./GameScreen";

export class HomeScreen extends Container {
    public static assetBundles = ['preload', 'default'];

    private startButton: LargeButton;
    private howToButton: LargeButton;
    private creditsButton: LargeButton;

    constructor() {
        super();

        this.startButton = new LargeButton({ text: "Play" });
        this.startButton.onPress.connect(() => navigation.showScreen(GameScreen))
        this.addChild(this.startButton);

        this.howToButton = new LargeButton({ text: "How to Play" });
        this.addChild(this.howToButton);

        this.creditsButton = new LargeButton({ text: "Credits" });
        this.addChild(this.creditsButton);
    }

    public resize(width: number, height: number) {
        this.startButton.x = width * 0.5;
        this.startButton.y = height * 0.5 - height * 0.1;
        this.howToButton.x = width * 0.5;
        this.howToButton.y = height * 0.5;
        this.creditsButton.x = width * 0.5;
        this.creditsButton.y = height * 0.5 + height * 0.1;
    }

    public async show() {
        // Reset visual state, hide things that will show up later
        this.startButton.hide(false);
        this.howToButton.hide(false);
        this.creditsButton.hide(false);
        // this.settingsButton.hide(false);
        // this.githubButton.hide(false);
        // this.dragon.show(false);
        // this.logo.show(false);

        // Play reveal animation
        // this.playRevealAnimation();

        // Show remaining components in sequence
        // await waitFor(0.5);
        await this.startButton.show();
        await this.howToButton.show();
        await this.creditsButton.show();
        this.interactiveChildren = true;
        // this.infoButton.show();
        // await this.settingsButton.show();
        // this.pixiButton.show();
        // await this.githubButton.show();
    }

    /** Hide screen with animations */
    public async hide() {
        this.startButton.hide();
        this.howToButton.hide();
        this.creditsButton.hide();
        // this.pixiButton.hide();
        // this.githubButton.hide();
        // this.infoButton.hide();
        // await waitFor(0.1);
        // gsap.to(this.base.pivot, { y: -200, duration: 0.3, ease: 'back.in' });
        // await waitFor(0.1);
        // this.logo.hide();
        // await waitFor(0.1);
        // await this.dragon.hide();
    }
}