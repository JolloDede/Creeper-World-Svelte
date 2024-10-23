import { Assets, AssetsManifest } from 'pixi.js';

/** List of assets grouped in bundles, for dynamic loading */
let assetsManifest: AssetsManifest = {
    bundles: [
        {
            name: "preload",
            assets: [
                {
                    alias: "button-large",
                    src: "Buttons/button-large.png"
                },
                {
                    alias: "button-large-hover",
                    src: "Buttons/button-large-hover.png"
                },
                {
                    alias: "button-large-press",
                    src: "Buttons/button-large-press.png"
                }
            ]
        }
    ]
};

/** Store bundles already loaded */
const loadedBundles: string[] = [];

/** Check if a bundle exists in assetManifest  */
function checkBundleExists(bundle: string) {
    return !!assetsManifest.bundles.find((b) => b.name === bundle);
}

/** Load assets bundles that have nott been loaded yet */
export async function loadBundles(bundles: string | string[]) {
    if (typeof bundles === 'string') bundles = [bundles];

    // Check bundles requested if they exists
    for (const bundle of bundles) {
        if (!checkBundleExists(bundle)) {
            throw new Error(`[Assets] Invalid bundle: ${bundle}`);
        }
    }

    // Filter out bundles already loaded
    const loadList = bundles.filter((bundle) => !loadedBundles.includes(bundle));

    // Skip if there is no bundle left to be loaded
    if (!loadList.length) return;

    // Load bundles
    console.log('[Assets] Load:', loadList.join(', '));
    await Assets.loadBundle(loadList);

    // Append loaded bundles to the loaded list
    loadedBundles.push(...loadList);
}

/** Check if all bundles are loaded, return false if any of them is not loaded yet  */
export function areBundlesLoaded(bundles: string[]) {
    for (const name of bundles) {
        // Return false if a single bundle is not present in the loaded list
        if (!loadedBundles.includes(name)) {
            return false;
        }
    }

    // All provided bundles are loaded
    return true;
}

/** Initialise and start background loading of all assets */
export async function initAssets() {
    // Init PixiJS assets with this asset manifest
    await Assets.init({ manifest: assetsManifest, basePath: 'assets' });

    // Load assets for the load screen
    await loadBundles('preload');

    // List all existing bundles names
    const allBundles = assetsManifest.bundles.map((item) => item.name);

    // Start up background loading of all bundles
    Assets.backgroundLoadBundle(allBundles);
}
