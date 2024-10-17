import { Application } from "pixi.js";

export class AppSingle {
    static #instance: AppSingle;
    app: Application;

    private constructor() {
        this.app = new Application;
    }

    public static get instance(): AppSingle {
        if (!AppSingle.#instance) {
            AppSingle.#instance = new AppSingle();
        }
        return AppSingle.#instance;
    }

    public async initApp(canvasEle: HTMLCanvasElement, container: HTMLDivElement) {
        await this.app.init({
            canvas: canvasEle,
			// resizeTo: container,
            backgroundColor: 'black'
        })
    }
}