import { ProgressBar } from "@pixi/ui";
import { Assets, Container, Graphics } from "pixi.js";
import { app } from "..";
import { Label } from "../ui/Label";

export class LoadingScreen extends Container {
    public static assetBundles = ['preload'];
    
    private text: Label;

    constructor() {
        super();

        this.text = new Label('Waiting');
        this.addChild(this.text);
    }

    public resize(width: number, height: number) {
        this.text.x = width * 0.5;
        this.text.y = height * 0.5;
    }
}
