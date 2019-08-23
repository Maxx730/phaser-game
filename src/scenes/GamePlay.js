import { constants } from '../constants';
//GAME OBJECTS
	//UNITS


	//ENVIROMENTS
	import Dungeon from '../objects/enviroments/Dungeon';

	//TILEMAPS
	import DungeonTiles from '../assets/tilemaps/dungeon/sheet.png';
	import DungeonJSON from '../assets/tilemaps/dungeon/dungeon.json';


export class GamePlay extends Phaser.Scene {
	constructor() {
		super({
			key: constants.SCENES.GAMEPLAY
		});
	}

	preload() {
		this.load.image('DungeonTiles',DungeonTiles);
		this.load.tilemapTiledJSON('DungeonJSON',DungeonJSON);
	}

	create() {
		new Dungeon(this);
	}

	update() {

	}
}