<script lang="ts">
	import { Application, Container, Graphics, Loader } from 'pixi.js';
	import { onDestroy, onMount } from 'svelte';
	import Hud from './Hud.svelte';

	let container: HTMLDivElement;
	let elementCanvas: HTMLCanvasElement;
	const loading = { amount: Number, complete: Boolean };

	let app: Application;
	let levelContainer: Container;

	onMount(async () => {
		app = new Application();
		await app.init({
			view: elementCanvas,
			resizeTo: container,
			backgroundColor: '#ccc'
		});

		if (app === null) return;
	});

	onDestroy(() => {
		if (app !== undefined) app.stop;
	});
</script>

<div class="flex flex-col w-full h-screen">
	<div class="" bind:this={container}>
		<canvas bind:this={elementCanvas}></canvas>
	</div>
	<Hud class="h-20" />
</div>
