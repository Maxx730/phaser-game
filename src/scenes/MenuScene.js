import { constants } from '../constants';

export class MenuScene extends Phaser.Scene {
	constructor() {
		super({
			key: constants.SCENES.MENU
		});
	}

	preload() {

	}

	create() {
		console.log('MENUSCENE INITIALIZED')
		this.scene.start(constants.SCENES.GAMEPLAY,{MAPSIZE:constants.GAME.MAPSIZE.LARGE})
	}

	update() {
		
	}
}