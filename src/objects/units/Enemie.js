export default class Enemie extends Phaser.Physics.Arcade.Sprite {
    constructor(scene,x,y,config) {
        super(scene,x,y,config.key);

        scene.physics.world.enable(this);
        scene.add.existing(this);
    }
}