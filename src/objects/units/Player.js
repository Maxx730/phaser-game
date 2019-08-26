import { Scenes } from "phaser";

export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene,x,y,config) {
        super(scene,x,y,config.key);

        scene.physics.world.enable(this);
        scene.add.existing(this);

        this.setImmovable(true);
        this.setCollideWorldBounds(true);
        this.setDrag(100);
        this.setSize(10,10);

        this.scene = scene;
        this.SPEED = 1;

        //INITIALIZE THE PLAYER ANIMATIONS HERE.
        let IdleAnimation = {
            key: 'idle',
            frames: [
                {
                    key: 'Player',
                    frame: 0,
                    duration: 640
                },                {
                    key: 'Player',
                    frame: 1,
                    duration: 80
                },                {
                    key: 'Player',
                    frame: 2,
                    duration: 640
                }
            ],//scene.anims.generateFrameNumbers('Player',{start: 0, end: 2}),
            frameRate: 60,
            yoyo: true,
            repeat: -1
        }

        let WalkDownAnimation = {
            key: 'walk-down',
            frames: [
                {
                    key: 'Player',
                    frame: 8,
                    duration: 100
                },
                {
                    key: 'Player',
                    frame: 9,
                    duration: 100
                },
                {
                    key: 'Player',
                    frame: 10,
                    duration: 100
                },
                {
                    key: 'Player',
                    frame: 11,
                    duration: 100
                }
            ],
            frameRate: 60,
            repeat: -1
        }

        let WalkRightAnimation = {
            key: 'walk-right',
            frames: [
                {
                    key: 'Player',
                    frame: 12,
                    duration: 100
                },
                {
                    key: 'Player',
                    frame: 13,
                    duration: 100
                },
                {
                    key: 'Player',
                    frame: 14,
                    duration: 100
                },
                {
                    key: 'Player',
                    frame: 15,
                    duration: 100
                }
            ],
            repeat: -1
        }

        let WalkUpAnimation = {
            key: 'walk-up',
            frames: [
                {
                    key: 'Player',
                    frame: 16,
                    duration: 100
                },
                {
                    key: 'Player',
                    frame: 17,
                    duration: 100
                },
                {
                    key: 'Player',
                    frame: 18,
                    duration: 100
                },
                {
                    key: 'Player',
                    frame: 19,
                    duration: 100
                }
            ],
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