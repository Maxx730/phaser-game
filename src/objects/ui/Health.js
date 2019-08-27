export default class Health extends Phaser.GameObjects.Sprite {
	constructor(scene,x,y,config) {
		super(scene,x,y,config.key);

		scene.add.existing(this);
		this.setOrigin(0);
		this.setScrollFactor(0);
		this.setScale(1);
	}
}