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
	import { Structure, World } from '$lib/game/World';
	import { text } from '@sveltejs/kit';

	let container: HTMLDivElement;
	let elementCanvas: HTMLCanvasElement;
	const loading = { amount: Number, complete: Boolean };
	let pointerPosHeight: number = 0;

	let app: Application;
	let levelContainer: Container;
	let mapContainer: Container;
	let tileSize: number;
	let draggingStructure: Sprite;
	let world: World;

	onMount(async () => {
		app = new Application();
		await app.init({
			canvas: elementCanvas,
			resizeTo: container,
			// backgroundColor: '#b4a69d'
			backgroundColor: 'black'
		});
		await preoad();

		// create the world
		world = new World();
		tileSize = CalcTileSize();
		await initLevelContainer();
		await paintWorld();
		await paintCreepers();
		// await addStructures(world);

		// app.stage.hitArea = app.screen;
		// app.stage.eventMode = 'static';
		// app.stage.on('pointermove', (event) => {
		// 	if (draggingStructure) draggingStructure.position.copyFrom(event.global);
		// });

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

			levelContainer.addChild(sprite);
		});
	}

	async function paintWorld() {
		for (let i = 0; i < world.width * world.height; i++) {
			let x = i % world.width;
			let y = Math.floor(i / world.width);
			let cordHeight = world.map[y][x];

			let floor = new Graphics();
			floor.rect(x * tileSize, y * tileSize, tileSize, tileSize);
			switch (cordHeight) {
				case 1:
					floor.fill(0x756d69);
					break;
				case 2:
					floor.fill(0x958282);
					break;
				case 3:
					floor.fill(0xaba39b);
					break;
				case 4:
					break;
				case 5:
					break;
				case 6:
					break;
				default:
					break;
			}
			mapContainer.addChild(floor);

			let borders = {
				top: false,
				bot: false,
				left: false,
				right: false,
				lTC: false,
				rTC: false,
				lBC: false,
				rBC: false
			};
			if (x - 1 >= 0 && cordHeight != world.map[y][x - 1]) {
				borders.left = true;
			}
			if (x + 1 < world.width && cordHeight != world.map[y][x + 1]) {
				borders.right = true;
			}
			if (y - 1 >= 0 && cordHeight != world.map[y - 1][x]) {
				borders.top = true;
			}
			if (y + 1 < world.height && cordHeight != world.map[y + 1][x]) {
				borders.bot = true;
			}
			if (
				x - 1 >= 0 &&
				y - 1 >= 0 &&
				cordHeight != world.map[y - 1][x - 1] &&
				world.map[y - 1][x - 1] != world.map[y - 1][x] &&
				world.map[y - 1][x - 1] != world.map[y][x - 1]
			) {
				borders.lTC = true;
			}
			if (
				x + 1 < world.width &&
				y - 1 >= 0 &&
				cordHeight != world.map[y - 1][x + 1] &&
				world.map[y - 1][x + 1] != world.map[y - 1][x] &&
				world.map[y - 1][x + 1] != world.map[y][x + 1]
			) {
				borders.rTC = true;
			}
			if (
				x - 1 >= 0 &&
				y + 1 < world.height &&
				cordHeight != world.map[y + 1][x - 1] &&
				world.map[y + 1][x - 1] != world.map[y + 1][x] &&
				world.map[y + 1][x - 1] != world.map[y][x - 1]
			) {
				borders.lBC = true;
			}
			if (
				x + 1 < world.width &&
				y + 1 < world.height &&
				cordHeight != world.map[y + 1][x + 1] &&
				world.map[y + 1][x + 1] != world.map[y + 1][x] &&
				world.map[y + 1][x + 1] != world.map[y][x + 1]
			) {
				borders.rBC = true;
			}

			let borderWidth = tileSize / 4;
			if (borders.left && borders.right && borders.top && borders.bot) {
				// todo not yet implemented
				let slope = new Graphics();
				slope.rect(x * tileSize, y * tileSize, tileSize, tileSize);
				slope.stroke(0xff0000);

				mapContainer.addChild(slope);
			} else if ((borders.left || borders.right) && !(borders.top || borders.bot)) {
				// Left or Right
				let slope = new Graphics();
				slope.rect(
					x * tileSize + tileSize / 2 - borderWidth / 2,
					y * tileSize,
					borderWidth,
					tileSize
				);
				slope.fill(0x000000);

				mapContainer.addChild(slope);
			} else if (!(borders.left || borders.right) && (borders.top || borders.bot)) {
				// Top or Bottom
				let slope = new Graphics();
				slope.rect(
					x * tileSize,
					y * tileSize + tileSize / 2 - borderWidth / 2,
					tileSize,
					borderWidth
				);
				slope.fill(0x000000);

				mapContainer.addChild(slope);
			} else if (borders.left && !borders.right && borders.top && !borders.bot) {
				// Top Left
				let slopeL = new Graphics();
				slopeL.rect(
					x * tileSize + tileSize / 2 - borderWidth / 2,
					y * tileSize + tileSize / 2 - borderWidth / 2,
					borderWidth,
					tileSize / 2 + borderWidth / 2
				);
				slopeL.fill(0x000000);

				let slopeT = new Graphics();
				slopeT.rect(
					x * tileSize + tileSize / 2 - borderWidth / 2,
					y * tileSize + tileSize / 2 - borderWidth / 2,
					tileSize / 2 + borderWidth / 2,
					borderWidth
				);
				slopeT.fill(0x000000);

				mapContainer.addChild(slopeT);
				mapContainer.addChild(slopeL);
			} else if (!borders.left && borders.right && borders.top && !borders.bot) {
				// Top Right
				let slopeR = new Graphics();
				slopeR.rect(
					x * tileSize + tileSize / 2 - borderWidth / 2,
					y * tileSize + tileSize / 2 - borderWidth / 2,
					borderWidth,
					tileSize / 2 + borderWidth / 2
				);
				slopeR.fill(0x000000);

				let slopeT = new Graphics();
				slopeT.rect(
					x * tileSize,
					y * tileSize + tileSize / 2 - borderWidth / 2,
					tileSize / 2 + borderWidth / 2,
					borderWidth
				);
				slopeT.fill(0x000000);

				mapContainer.addChild(slopeT);
				mapContainer.addChild(slopeR);
			} else if (borders.left && !borders.right && !borders.top && borders.bot) {
				// Bot Left
				let slopeL = new Graphics();
				slopeL.rect(
					x * tileSize + tileSize / 2 - borderWidth / 2,
					y * tileSize,
					borderWidth,
					tileSize / 2 + borderWidth / 2
				);
				slopeL.fill(0x000000);

				let slopeB = new Graphics();
				slopeB.rect(
					x * tileSize + tileSize / 2 - borderWidth / 2,
					y * tileSize + tileSize / 2 - borderWidth / 2,
					tileSize / 2 + borderWidth / 2,
					borderWidth
				);
				slopeB.fill(0x000000);

				mapContainer.addChild(slopeB);
				mapContainer.addChild(slopeL);
			} else if (!borders.left && borders.right && !borders.top && borders.bot) {
				// Bot Right
				let slopeR = new Graphics();
				slopeR.rect(
					x * tileSize + tileSize / 2 - borderWidth / 2,
					y * tileSize,
					borderWidth,
					tileSize / 2 + borderWidth / 2
				);
				slopeR.fill(0x000000);

				let slopeB = new Graphics();
				slopeB.rect(
					x * tileSize,
					y * tileSize + tileSize / 2 - borderWidth / 2,
					tileSize / 2 + borderWidth / 2,
					borderWidth
				);
				slopeB.fill(0x000000);

				mapContainer.addChild(slopeB);
				mapContainer.addChild(slopeR);
			}

			if (borders.lTC) {
				// Top Left Corner
				let slopeL = new Graphics();
				slopeL.rect(
					x * tileSize + tileSize / 2 - borderWidth / 2,
					y * tileSize,
					borderWidth,
					tileSize / 2 + borderWidth / 2
				);
				slopeL.fill(0x000000);

				let slopeT = new Graphics();
				slopeT.rect(
					x * tileSize,
					y * tileSize + tileSize / 2 - borderWidth / 2,
					tileSize / 2 + borderWidth / 2,
					borderWidth
				);
				slopeT.fill(0x000000);

				mapContainer.addChild(slopeT);
				mapContainer.addChild(slopeL);
			}
			if (borders.rTC) {
				// Top Right Corner
				let slopeR = new Graphics();
				slopeR.rect(
					x * tileSize + tileSize / 2 - borderWidth / 2,
					y * tileSize,
					borderWidth,
					tileSize / 2 + borderWidth / 2
				);
				slopeR.fill(0x000000);

				let slopeT = new Graphics();
				slopeT.rect(
					x * tileSize + tileSize / 2 - borderWidth / 2,
					y * tileSize + tileSize / 2 - borderWidth / 2,
					tileSize / 2 + borderWidth / 2,
					borderWidth
				);
				slopeT.fill(0x000000);

				mapContainer.addChild(slopeT);
				mapContainer.addChild(slopeR);
			}
			if (borders.lBC) {
				// Bot Left Corner
				let slopeL = new Graphics();
				slopeL.rect(
					x * tileSize + tileSize / 2 - borderWidth / 2,
					y * tileSize + tileSize / 2 - borderWidth / 2,
					borderWidth,
					tileSize / 2 + borderWidth / 2
				);
				slopeL.fill(0x000000);

				let slopeB = new Graphics();
				slopeB.rect(
					x * tileSize,
					y * tileSize + tileSize / 2 - borderWidth / 2,
					tileSize / 2 + borderWidth / 2,
					borderWidth
				);
				slopeB.fill(0x000000);

				mapContainer.addChild(slopeB);
				mapContainer.addChild(slopeL);
			}
			if (borders.rBC) {
				// Bot Right Corner
				let slopeR = new Graphics();
				slopeR.rect(
					x * tileSize + tileSize / 2 - borderWidth / 2,
					y * tileSize + tileSize / 2 - borderWidth / 2,
					borderWidth,
					tileSize / 2 + borderWidth / 2
				);
				slopeR.fill(0x000000);

				let slopeB = new Graphics();
				slopeB.rect(
					x * tileSize + tileSize / 2 - borderWidth / 2,
					y * tileSize + tileSize / 2 - borderWidth / 2,
					tileSize / 2 + borderWidth / 2,
					borderWidth
				);
				slopeB.fill(0x000000);

				mapContainer.addChild(slopeB);
				mapContainer.addChild(slopeR);
			}
		}
	}

	async function paintCreepers() {
		world.creepers.forEach((creep) => {
			const sprite = Sprite.from(creep.getName());

			sprite.x = creep.coordinates.x * tileSize;
			sprite.y = creep.coordinates.y * tileSize;
			sprite.width = tileSize * creep.width;
			sprite.height = tileSize * creep.height;

			// testing
			const rect = new Graphics();
			rect.rect(
				creep.coordinates.x * tileSize,
				creep.coordinates.y * tileSize,
				tileSize * creep.width,
				tileSize * creep.height
			);
			rect.stroke(0xff0000);
			mapContainer.addChild(rect);

			mapContainer.addChild(sprite);
		});
	}

	function handlePointerMove(e: FederatedPointerEvent) {
		pointerPosHeight =
			world.map[Math.floor(e.globalY / tileSize)][
				Math.floor((e.globalX - levelContainer.x) / tileSize)
			];
	}

	async function initLevelContainer() {
		levelContainer = new Container();
		mapContainer = new Container();
		let gameArea = new Graphics();

		levelContainer.x = (elementCanvas.width - tileSize * world.width) / 2;
		levelContainer.y = 0;
		gameArea.rect(0, 0, tileSize * world.width, tileSize * world.height);
		gameArea.fill(0xc1aba5);

		gameArea.eventMode = 'static';
		gameArea.on('pointermove', handlePointerMove);

		levelContainer.addChild(gameArea);
		levelContainer.addChild(mapContainer);

		app.stage.addChild(levelContainer);
	}

	function CalcTileSize(): number {
		let rectWidth = elementCanvas.width / world.width;
		let rectHeight = elementCanvas.height / world.height;

		if (rectWidth > rectHeight) return rectHeight;
		else return rectWidth;
	}

	async function preoad() {
		const assets = [
			{ alias: 'collector', src: 'collector.png' },
			{ alias: 'creeper', src: 'creeper.png' }
		];

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

	function handleCanvasClick() {}

	// $: console.log(pointerPosHeight)
</script>

<div class="flex flex-col w-full h-screen">
	<div class="" bind:this={container}>
		<canvas bind:this={elementCanvas} on:click={handleCanvasClick}></canvas>
	</div>
	<Hud class="h-20" {handleStructureClick} bind:posHeight={pointerPosHeight} />
</div>
