import { constants } from '../constants';

//IMPORT UI ELEMENTS
import StartIMG from '../assets/ui/Start.png';

export class MenuScene extends Phaser.Scene {
	constructor() {
		super({
			key: constants.SCENES.MENU
		});
	}

	preload() {
		this.load.image('start-button',StartIMG);
	}

	create() {
		const _this = this;
		this.StartButton = this.add.image(150,100,'start-button');
		this.StartButton.setInteractive();
		this.StartButton.on('pointerdown',function(pointer) {
			_this.scene.start(constants.SCENES.GAMEPLAY)
		});
	}

	update() {
		
	}
}