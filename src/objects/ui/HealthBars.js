export default class HealthBars extends Phaser.GameObjects.Sprite {
    constructor(scene,x,y,config) {
        super(scene,x,y,config.key);

        scene.add.existing(this);

        let HealthFrameConfig = {
            key: 'health-frame',
            frames: [0]
        }
    }
}