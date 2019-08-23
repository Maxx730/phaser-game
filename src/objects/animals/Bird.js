export default class Bird extends Phaser.GameObjects.Sprite {
	constructor(scene,x,y,config) {
		super(scene,x,y,config.key);
		console.log('BIRD INITIALIZED');

		scene.add.existing(this);
		scene.anims.create({
			key: 'flap',
			frames: scene.anims.generateFrameNumbers(config.key),
			yoyo: true,
			repeat: -1,
			frameRate: 6
		});
		this.anims.load('flap')
		this.anims.play('flap')
		const _this = this;

		scene.tweens.add({
			targets: this,
			y: {
				value: 900,
				duration: config.speed ? config.speed * 1500 : 5000
			},
			onComplete: function() {
				_this.destroy()
			},
			onCompleteParams: [ this ] 
		})
	}
}