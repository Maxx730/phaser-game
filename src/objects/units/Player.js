import { Scenes } from "phaser";

export default class Player extends Phaser.GameObjects.Sprite {
    constructor(scene,x,y,config) {
        super(scene,x,y,config.key);

        scene.physics.add.existing(this);

        this.scene = scene;
        this.SPEED = 1;

        //INITIALIZE THE PLAYER ANIMATIONS HERE.
        let IdleAnimation = {
            key: 'idle',
            frames: scene.anims.generateFrameNumbers('Player',{start: 0, end: 2}),
            frameRate: 3,
            yoyo: true,
            repeat: -1
        }

        let WalkDownAnimation = {
            key: 'walk-down',
            frames: scene.anims.generateFrameNumbers('Player',{start: 8,end: 11}),
            frameRate: 6,
            yoyo: true,
            repeat: -1
        }

        let WalkRightAnimation = {
            key: 'walk-right',
            frames: scene.anims.generateFrameNumbers('Player',{start: 16,end: 19}),
            frameRate: 6,
            yoyo: true,
            repeat: -1
        }

        let WalkUpAnimation = {
            key: 'walk-up',
            frames: scene.anims.generateFrameNumbers('Player',{start: 24,end: 27}),
            frameRate: 6,
            yoyo: true,
            repeat: -1
        }

        let WalkLeftAnimation = {
            key: 'walk-left',
            frames: scene.anims.generateFrameNumbers('Player',{start: 32,end: 35}),
            frameRate: 6,
            yoyo: true,
            repeat: -1
        }

        scene.anims.create(IdleAnimation);
        scene.anims.create(WalkDownAnimation);
        scene.anims.create(WalkRightAnimation);
        scene.anims.create(WalkUpAnimation);
        scene.anims.create(WalkLeftAnimation);
        this.anims.load('idle');
        this.anims.load('walk-down');
        this.anims.load('walk-right');
        this.anims.load('walk-up');
        this.anims.load('walk-left');
        this.anims.play('idle');

        scene.cameras.main.startFollow(this,true,0.5,0.5);
    }

    preUpdate(time,delta) {
        super.preUpdate(time,delta);
    }
}