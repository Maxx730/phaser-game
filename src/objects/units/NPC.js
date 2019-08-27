import { STATE } from '../../state'

export default class NPC extends Phaser.Physics.Arcade.Sprite {
	constructor(scene,x,y,config) {
		super(scene,x,y,config.key);

		scene.physics.world.enable(this);
		scene.add.existing(this);

		this.id = config.id ? config.id : null;
		this.bubble = scene.add.sprite(x - 2 ,y - 17,'Bubbles');
		this.config = config;
		this.data = {
			MESSAGE: config.message ? config.message : 'This is an example NPC message...',
			HEALTH: 100,
			INVENTORY:[]
		}

		this.bubble.setVisible(false);
	}

	showMessage() {
		if(this.config.dialog) {
			this.config.dialog.setVisible(true);
			this.config.dialog.setMessage(this.data.MESSAGE);
		}
	}

	preUpdate() {

	}
}