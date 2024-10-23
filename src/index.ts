import * as PIXI from 'pixi.js';
import { navigation } from './utils/navigation';
import { HomeScreen } from './screens/HomeScreen';
import { initAssets } from './utils/assets';

export const app = new PIXI.Application();

function resize() {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const minWidth = 375;
    const minHeight = 700;

    // Calculate renderer and canvas sizes based on current dimensions
    const scaleX = windowWidth < minWidth ? minWidth / windowWidth : 1;
    const scaleY = windowHeight < minHeight ? minHeight / windowHeight : 1;
    const scale = scaleX > scaleY ? scaleX : scaleY;
    const width = windowWidth * scale;
    const height = windowHeight * scale;

    // Update canvas style dimensions and scroll window up to avoid issues on mobile resize
    app.renderer.canvas.style.width = `${windowWidth}px`;
    app.renderer.canvas.style.height = `${windowHeight}px`;
    window.scrollTo(0, 0);

    // Update renderer  and navigation screens dimensions
    app.renderer.resize(width, height);
    navigation.resize(width, height);
}

function visibilityChange() {
    if (document.hidden) {
        // sound.pauseAll();
        navigation.blur();
    } else {
        // sound.resumeAll();
        navigation.focus();
    }
}

async function init() {
    // Initialize app
    await app.init({
        resolution: Math.max(window.devicePixelRatio, 2),
        backgroundColor: 0xffffff,
        canvas: document.getElementById("canvas") as HTMLCanvasElement,
    });

    // Whenever the window resizes, call the 'resize' function
    window.addEventListener('resize', resize);

    // Trigger the first resize
    resize();

    // Add a visibility listener, so the app can pause sounds and screens
    document.addEventListener('visibilitychange', visibilityChange);

    // Setup assets bundles (see assets.ts) and start up loading everything in background
    await initAssets();

    // Add a persisting background shared by all screens
    // navigation.setBackground(TiledBackground);

    // Show initial loading screen
    // await navigation.showScreen(LoadScreen);

    // Todo remove testing only
    await navigation.showScreen(HomeScreen);

    // Go to one of the screens if a shortcut is present in url params, otherwise go to home screen
    // if (getUrlParam('game') !== null) {
    //     await navigation.showScreen(GameScreen);
    // } else if (getUrlParam('load') !== null) {
    //     await navigation.showScreen(LoadScreen);
    // } else if (getUrlParam('result') !== null) {
    //     await navigation.showScreen(ResultScreen);
    // } else {
    //     await navigation.showScreen(HomeScreen);
    // }
}

init();
