export default class Torch extends Phaser.GameObjects.Sprite {
    constructor(scene,x,y,config) {
        super(scene,x,y,config.key);

        scene.add.existing(this);

        this._scene = scene;

        let IdleAnimation = {
            key: 'flame-idle',
            frames: scene.anims.generateFrameNumbers('Torch',{start: 0, end: 3}),
            frameRate: 6,
            repeat: -1,
            yoyo: true
        }

        this._scene.anims.create(IdleAnimation);
        this.anims.load('flame-idle');
        this.anims.play('flame-idle');
    }
}