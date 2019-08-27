export default class Dialog extends Phaser.GameObjects.Sprite {
	constructor(scene,x,y,config) {
		super(scene,x,y,config.key);
		this.setScrollFactor(0);
		scene.add.existing(this);

		this.IS_OPEN = false;

		this.dialogText = scene.add.text(20,105,'Press `Spacebar` to blow you\'re fuckin\' legs off.',{}).setScrollFactor(0).setFontFamily('AwkwardTall').setFontSize(16).setColor('#95614d');

		this.setVisible(false);
		this.dialogText.setVisible(false);

		//Create the player control key bindings and add event listeners
		this.keys = scene.input.keyboard.addKeys({
			enter:Phaser.Input.Keyboard.KeyCodes.ENTER
		});

		this.keys.enter.on('down',function(){
			this.dialogText.setVisible(false);
			this.dialogText.text = '';
			this.setVisible(false);
			this.IS_OPEN = false;
		},this);
	}

	setMessage(message) {
		this.dialogText.text = message;
		this.dialogText.setVisible(true);
		this.IS_OPEN = true;
	}
}