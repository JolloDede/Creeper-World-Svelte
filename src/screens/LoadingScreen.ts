import { ProgressBar } from "@pixi/ui";
import { Assets, Container, Graphics } from "pixi.js";
import { app } from "..";
import { Label } from "../ui/Label";
import { resourceProgress } from "../utils/assets";

export class LoadingScreen extends Container {
    public static assetBundles = ['preload'];
    
    private text: Label;
    private loadingBar: ProgressBar;

    constructor() {
        super();

        this.text = new Label('Waiting');
        this.addChild(this.text);

        // TODO create a new loadingbar class and add a rect with rounded borders as background and foreground
        this.loadingBar = new ProgressBar();
        this.loadingBar.onRender = () => this.loadingBarOnRender();
        this.addChild(this.loadingBar);
    }

    public resize(width: number, height: number) {
        this.text.x = width * 0.5;
        this.text.y = height * 0.5;
    }

    private loadingBarOnRender() {
        const delta = app.ticker.deltaTime;
        this.loadingBar.progress = resourceProgress;
    }
}
