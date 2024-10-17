import { Application, Assets, Container, FederatedPointerEvent, Graphics } from "pixi.js";
import type { Game } from "../Game";

export class DrawMain {
	app: Application;
	tileSize: number;
	game: Game;
	// Container
	levelContainer!: Container;
	mapContainer!: Container;

	constructor(app: Application, game: Game) {
		this.game = game;
		this.app = app;
		this.tileSize = 0;
	}

	public draw() {
		this.initContainers();
		// this.paintWorld(),
		// this.paintCreepers();
		// this.paintStructures();
	}

	public async setup() {
		this.preload();
		this.calcTileSize(this.app.canvas.width, this.app.canvas.height);
	}

	public async init() {
		// await this.preload();

		// this.initContainers();
	}

	private async preload() {
		const assets = [
			{ alias: 'collector', src: 'collector.png' },
			{ alias: 'blaster', src: 'blaster.png' },
			{ alias: 'creeper', src: 'creeper.png' },
			{ alias: 'base', src: 'base.png' }
		];

		await Assets.load(assets);
	}

	// public resize(width: number, height: number) {
	// 	console.log("resize")
	// 	this.tileSize = this.calcTileSize(width, height);
	// }

	private calcTileSize(canvasWidth: number, canvasHeight: number): number {
		let rectWidth = canvasWidth / this.game.world.width;
		let rectHeight = canvasHeight / this.game.world.height;

		if (rectWidth > rectHeight) return this.tileSize = rectHeight;
		else return this.tileSize = rectWidth;
	}

	private initContainers() {
		console.log("initcontainer")
		console.log(this.tileSize)
		console.log(this.app.canvas.width);
		console.log((this.app.canvas.width - (this.tileSize * this.game.world.width)) / 2)

		this.levelContainer = new Container();
		this.mapContainer = new Container();
		let gameArea = new Graphics();

		this.levelContainer.x = (this.app.canvas.width - (this.tileSize * this.game.world.width)) / 2;
		this.levelContainer.y = (this.app.canvas.height - (this.tileSize * this.game.world.height)) / 2;
		gameArea.rect(0, 0, this.tileSize * this.game.world.width, this.tileSize * this.game.world.height);
		gameArea.fill(0xc1aba5);

		gameArea.eventMode = 'static';
		gameArea.on('pointermove', this.handlePointerMove);

		this.levelContainer.addChild(gameArea);
		this.levelContainer.addChild(this.mapContainer);

		this.app.stage.addChild(this.levelContainer);
	}

	// Maybe this doesnt work
	private handlePointerMove(e: FederatedPointerEvent) {
		console.log(this.game)
		if (this)
			this.game.pointerPosHeight =
				this.game.world.map[Math.floor(e.globalY / this.tileSize)][
				Math.floor((e.globalX - this.levelContainer.x) / this.tileSize)
				];
	}

	// private paintWorld() {
	// 	for (let i = 0; i < this.game.world.width * this.game.world.height; i++) {
	// 		let x = i % this.game.world.width;
	// 		let y = Math.floor(i / this.game.world.width);
	// 		let cordHeight = this.game.world.map[y][x];

	// 		let floor = new Graphics();
	// 		floor.rect(x * this.tileSize, y * this.tileSize, this.tileSize, this.tileSize);
	// 		switch (cordHeight) {
	// 			case 1:
	// 				floor.fill(0x756d69);
	// 				break;
	// 			case 2:
	// 				floor.fill(0x958282);
	// 				break;
	// 			case 3:
	// 				floor.fill(0xaba39b);
	// 				break;
	// 			case 4:
	// 				break;
	// 			case 5:
	// 				break;
	// 			case 6:
	// 				break;
	// 			default:
	// 				break;
	// 		}
	// 		this.mapContainer.addChild(floor);
	// 	}
	// }

	// private paintCreepers() {
	// 	this.game.world.creepers.forEach((creep) => {
	// 		const sprite = Sprite.from(creep.getName());

	// 		sprite.x = creep.coordinates.x * this.tileSize;
	// 		sprite.y = creep.coordinates.y * this.tileSize;
	// 		sprite.width = this.tileSize * creep.width;
	// 		sprite.height = this.tileSize * creep.height;

	// 		this.mapContainer.addChild(sprite);
	// 	});
	// }

	// private paintStructures() {
	// 	this.game.world.structures.forEach((struct) => {
	// 		const sprite = Sprite.from(struct.getName());
	// 		sprite.x = struct.coordinates.x * this.tileSize;
	// 		sprite.y = struct.coordinates.y * this.tileSize;
	// 		sprite.width = this.tileSize * struct.width;
	// 		sprite.height = this.tileSize * struct.height;

	// 		let grap = new Graphics();
	// 		grap.rect(
	// 			struct.coordinates.x * this.tileSize,
	// 			struct.coordinates.y * this.tileSize,
	// 			this.tileSize * struct.width,
	// 			this.tileSize * struct.height
	// 		);
	// 		grap.stroke(0xff0000);
	// 		this.levelContainer.addChild(grap);

	// 		this.levelContainer.addChild(sprite);
	// 		if (struct.getName() === 'blaster') {
	// 			let cannon = new Graphics();
	// 			cannon.moveTo(
	// 				struct.coordinates.x * this.tileSize + (struct.width * this.tileSize) / 2,
	// 				struct.coordinates.y * this.tileSize + (struct.height * this.tileSize) / 2
	// 			);
	// 			cannon.lineTo(
	// 				struct.coordinates.x * this.tileSize,
	// 				struct.coordinates.y * this.tileSize + (struct.height * this.tileSize) / 2
	// 			);
	// 			cannon.stroke({ width: 6, color: 0x000000 });

	// 			this.levelContainer.addChild(cannon);
	// 		}
	// 	});
	// }
}