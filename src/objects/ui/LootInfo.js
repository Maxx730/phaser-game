export default class LootInfo extends Phaser.GameObjects.Sprite {
    constructor(scene,x,y,config) {
        super(scene,x,y)
        this.LootAmount = scene.add.text(255,-1,'$ 000000',{align: 'left'}).setColor('#FFFFFF').setDepth(10).setScrollFactor(0).setFontFamily('AwkwardTall')

        let LootSpin = {
            key: 'loot-spin',
            frames: scene.anims.generateFrameNumbers('LootCoin',{start: 0, end: 5}),
            repeat: -1,
            frameRate: 6
        }

        scene.anims.create(LootSpin);
        config.coin.setScrollFactor(0)
        config.coin.anims.load('loot-spin');
        config.coin.anims.play('loot-spin');

        this.config = config;
        scene.add.existing(this)
        console.log(this.LootAmount)
    }

    preUpdate() {
        this.LootAmount.setText(this.config.STATE.LOOT.COINS);
        this.LootAmount.x = 300 - (this.LootAmount.width + 12)
    }
}