<script lang="ts">
	import { Application, Assets, Container, Graphics, Loader, Sprite } from 'pixi.js';
	import { onDestroy, onMount } from 'svelte';
	import Hud from './Hud.svelte';
	import { Structure, World } from '$lib/game/World';

	let container: HTMLDivElement;
	let elementCanvas: HTMLCanvasElement;
	const loading = { amount: Number, complete: Boolean };

	let app: Application;
	let levelContainer: Container;
	let draggingStructure: Sprite;

	onMount(async () => {
		app = new Application();
		await app.init({
			view: elementCanvas,
			resizeTo: container,
			backgroundColor: '#b4a69d'
		});
		await preoad();

		// create the world
		let world = new World();
		await addMap(world);

		await addStructures(world);

		app.stage.hitArea = app.screen;
		app.stage.eventMode = 'static';
		app.stage.on('pointermove', (event) => {
			if (draggingStructure) draggingStructure.position.copyFrom(event.global);
		});

		// let mapContainer = new Container();

		// app.stage.addChild(mapContainer);
	});

	async function addStructures(world: World) {
		world.structures.forEach((struct) => {
			const sprite = Sprite.from(struct.getName());
			sprite.x = struct.coordinates.x;
			sprite.y = struct.coordinates.y;
			sprite.width = (app.screen.width / world.width) * struct.width;
			sprite.height = (app.screen.height / world.height) * struct.height;

			app.stage.addChild(sprite);
		});
	}

	async function addMap(world: World) {
		console.log();
	}

	async function preoad() {
		const assets = [{ alias: 'collector', src: 'collector.png' }];

		await Assets.load(assets);
	}

	function handleStructureClick(struct: Structure) {
		console.log('Hallo');
		switch (struct) {
			case Structure.Collector:
				draggingStructure = Sprite.from('collector');
				app.stage.addChild(draggingStructure);
				break;
			case Structure.Blaster:
				break;

			default:
				break;
		}
	}
</script>

<div class="flex flex-col w-full h-screen">
	<div class="" bind:this={container}>
		<canvas bind:this={elementCanvas}></canvas>
	</div>
	<Hud class="h-20" {handleStructureClick} />
</div>
