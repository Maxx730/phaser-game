import { constants } from '../constants';
import ScifiTile from '../assets/scifi_tile.png';
import MouseHighlight from '../assets/highlight.png';
import Panel from '../assets/panel.png';
import Arrow from '../assets/arrow.png';
import { Tile } from '../objects/Tile';

export class GamePlay extends Phaser.Scene {
	constructor() {
		super({
			key: constants.SCENES.GAMEPLAY
		});
	}

	preload() {
		this.load.image('scifi_tile',ScifiTile);
		this.load.image('highlighter',MouseHighlight);
		this.load.image('arrow',Arrow);

		//Load UI assets
		this.load.image('panel',Panel);
	}

	init(data) {
		this.MAPSIZE = data.MAPSIZE;
		this.cursor = this.input.keyboard.createCursorKeys();
		this.camera = this.cameras.cameras[0];
		this.camera.setBackgroundColor(0xB1B1B1);

		this.dragstart = null;
		this.dragend = null;
	}

	create() {
		/*for(let i = 0;i < this.MAPSIZE.WIDTH;i++) {
			for(let k = 0;k < this.MAPSIZE.HEIGHT;k++) {
				let tile = this.add.sprite((i * constants.GAME.TILESIZE),(k * constants.GAME.TILESIZE),'scifi_tile').setOrigin(0);
				tile.setInteractive();
				tile.on('pointerdown',function() {
					console.log('X: ' + i + ' Y: ' + k)
				})
			}
		}*/

		this.tile = new Tile({scene:this,x:0,y:0,key:'scifi_tile'})



		this.fix = this.add.graphics();
		this.selectorFix = this.add.graphics();
		this.fix.setDefaultStyles({
			fillStyle: {
				color: 0x000000,
				alpha: 1
			}
		});

		this.renderUI();
	}

	update() {
		//CAMERA CONTROLS BEGIN
		if(this.cursor.right.isDown) {
			if(this.camera.scrollX < (this.MAPSIZE.WIDTH * constants.GAME.TILESIZE) - (constants.GAME.WIDTH / 2)) {
				this.camera.scrollX += constants.GAME.TILESIZE;
				this.arrow.setVisible(true);
				this.arrow.angle = 90;
			}
		}

		if(this.cursor.left.isDown) {
			if(this.camera.scrollX > -400) {
				this.camera.scrollX -= constants.GAME.TILESIZE;
				this.arrow.setVisible(true);
				this.arrow.angle = -90;
			}
		}

		if(this.cursor.up.isDown) {
			if(this.camera.scrollY > -300) {
				this.camera.scrollY -= constants.GAME.TILESIZE;
				this.arrow.setVisible(true);
				this.arrow.angle = 0;
			}
		}

		if(this.cursor.down.isDown) {
			if(this.camera.scrollY < (this.MAPSIZE.HEIGHT * constants.GAME.TILESIZE) - (constants.GAME.HEIGHT / 2)) {
				this.camera.scrollY += constants.GAME.TILESIZE;
				this.arrow.setVisible(true);
				this.arrow.angle = 180;
			}
		}
		//CAMERA CONTROLS END

		if(this.cursor.down.isUp && this.cursor.up.isUp && this.cursor.left.isUp && this.cursor.right.isUp) {
			this.arrow.setVisible(false)
		}

		//Controls for displaying the highlight square.
		if(this.highlighter) {
			if(constants.GAME.DEBUG) {
				this.input_x.text = 'Pointer X: ' + Math.floor(this.input.x / constants.GAME.TILESIZE);
				this.input_y.text = 'Pointer Y: ' + Math.floor(this.input.y / constants.GAME.TILESIZE);
			}

			this.highlighter.x = Math.floor(this.input.x / constants.GAME.TILESIZE) * constants.GAME.TILESIZE;
			this.highlighter.y = Math.floor(this.input.y / constants.GAME.TILESIZE) * constants.GAME.TILESIZE;
		}

		//Drag controls.
		if(this.input.activePointer.isDown) {

		}
	}

	renderUI() {
		this.panel = this.add.sprite(0,0,'panel').setOrigin(0);
		//Keep the ui fixed onto the camera
		this.panel.scrollFactorX = 0;
		this.panel.scrollFactorY = 0;

		//Add the highlight item to teh map for selection
		this.highlighter = this.add.sprite(0,0,'highlighter').setOrigin(0);
		this.highlighter.scrollFactorX = 0;
		this.highlighter.scrollFactorY = 0;

		//Add the arrow sprite to indicate where teh user is moving the screen to.
		this.arrow = this.add.sprite(constants.GAME.WIDTH - 50,constants.GAME.HEIGHT - 50,'arrow').setScale(0.2).setVisible(false);
		this.arrow.scrollFactorX = 0;
		this.arrow.scrollFactorY = 0;
		this.arrow.setOrigin(0.5,0.5)
		
		if(constants.GAME.DEBUG) {
			//Draw the debug window stuff.
			this.debug_display = this.fix.fillRect(10,40,200,250);
			this.debug_display.scrollFactorX = 0;
			this.debug_display.scrollFactorY = 0;

			this.input_x = this.add.text(15,45,'Pointer X: ');
			this.input_x.scrollFactorX = 0;
			this.input_x.scrollFactorY = 0;

			this.input_y = this.add.text(15,65,'Pointer Y: ');
			this.input_y.scrollFactorX = 0;
			this.input_y.scrollFactorY = 0;
		}

	}
}