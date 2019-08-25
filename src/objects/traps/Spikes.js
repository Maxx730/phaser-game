export default class Spikes extends Phaser.GameObjects.Sprite {
    constructor(scene,x,y,config) {
        super(scene,x,y,config.key);

        scene.add.existing(this);

        let SpikeUp = {
            key: 'spike-up',
            frames: scene.anims.generateFrameNumbers('Spike',{start: 0, end: 3}),
            yoyo: true,
            frameRate: 3,
            repeat: -1 
        }

        scene.anims.create(SpikeUp);
        this.anims.load('spike-up');
        this.anims.play('spike-up');
    }
}