
export class Tile extends Phaser.GameObjects.Sprite {
	constructor(config) {
		super(config.scene,config.x,config.y,config.key);
		this.setOrigin(0);
		config.scene.add.existing(this);
	}
}