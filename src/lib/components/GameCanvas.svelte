<script lang="ts">
	import {
		Application,
		Assets,
		Container,
		FederatedPointerEvent,
		Graphics,
		Loader,
		Sprite,
		Text
	} from 'pixi.js';
	import { onDestroy, onMount } from 'svelte';
	import Hud from './Hud.svelte';
	import { Structure} from '$lib/game/World';
	import { text } from '@sveltejs/kit';
	import { Blaster } from '$lib/game/structures/Blaster';
	import { DrawMain } from '$lib/game/draw/DrawMain';
	import { Game } from '$lib/game/Game';
	import { draw } from 'svelte/transition';
	import { AppSingle } from '$lib/game/App';

	let container: HTMLDivElement;
	let elementCanvas: HTMLCanvasElement;
	const loading = { amount: Number, complete: Boolean };
	let pointerPosHeight: number = 0;

	let levelContainer: Container;
	let mapContainer: Container;
	let tileSize: number;
	let draggingStructure: Sprite;
	let game: Game;

	onMount(async () => {
		const app = AppSingle.instance;
		await app.initApp(elementCanvas, container);
		game = new Game();
		app.app.stage.addChild(game.view);
		// game = new Game();
		// let draw = new DrawMain(app, game);
		// await draw.setup();
		// draw.draw();
	});

	function handleStructureClick(struct: Structure) {
		console.log('Hallo');
		switch (struct) {
			case Structure.Collector:
				game.carriedStructure = struct;
				break;
			case Structure.Blaster:
				break;

			default:
				break;
		}
	}

	function handleCanvasClick() {}

	// $: console.log(pointerPosHeight)
</script>

<div class="flex flex-col w-full h-screen">
	<div class="" bind:this={container}>
		<canvas class="m-auto" bind:this={elementCanvas}></canvas>
	</div>
	<Hud class="h-20" {handleStructureClick} bind:posHeight={pointerPosHeight} />
</div>
