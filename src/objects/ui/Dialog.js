export default class Dialog extends Phaser.GameObjects.Sprite {
	constructor(scene,x,y,config) {
		super(scene,x,y,config.key);
		this.setScrollFactor(0);
		scene.add.existing(this);

		this.xButton = scene.add.image(230,150,'XButton').setScrollFactor(0).setOrigin(0).setVisible(false)
		this.IS_OPEN = false;;
		this.dialogText = scene.add.text(20,105,'Press `Spacebar` to blow you\'re fuckin\' legs off.',{}).setScrollFactor(0).setFontFamily('AwkwardTall').setFontSize(16).setColor('#95614d').setDepth(11);
		this.setVisible(false);
		this.dialogText.setVisible(false);
		this.setDepth(10)
	}

	setMessage(message) {
		this.dialogText.text = message;
		this.dialogText.setVisible(true);
		this.IS_OPEN = true;
	}
}