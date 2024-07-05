<script lang="ts">
	import { Application, Container, Loader } from "pixi.js";
	import { onMount } from "svelte";

    let elementCanvas: HTMLCanvasElement;
    const loading = { amount: Number, complete: Boolean };

    let app: Application;
    const loader: Loader;
    let levelContainer: Container;
    // let width = 72;
    // let height = 48;

    onMount(async() => {
        app = new Application();
        await app.init({
            view: elementCanvas,
            resizeTo: document.body,
            backgroundColor: "#ccc"
        });
        loader = Loader.shared;

        if (app === null) return;

        
    })
</script>

<canvas bind:this={elementCanvas}></canvas>
